import React from 'react';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import ProgressBar from '../components/ProgressBar';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import routes from '../request/routes';
import services from '../request/services';
import {
 Link,
 Redirect
} from  'react-router-dom';
import {
  addCourses,
  addNewCourse,
  UpdateCourse,
  DeleteCourse
} from '../actions'

class Courses extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:'',
      	password:'',
      	isLoaded:false,
      	code:'',
      	name:'',
      	codeCourse:'',
      	description:'',
      	showOtherFields:false,
      	color: [
      	  	{style:'bg-purple',color:'#4b3a77'}, 
      		{style:'bg-yellow-dark',color:'#ffb715'},
      		{style:'bg-green-light',color:'#00f256'},
      		{style:'bg-pink',color:'#F78282'},
      		{style:'bg-purple-light',color:'#9357F0'},
      		{style:'bg-gray-',color:'#737592'},
      	],
      	showAlert:false,
      	msgAlert:'',
      	bgAlert:'',
      	currentColor:'bg-purple',
      	readyToSend:false,
      	typeSend:'ADD',
      	indexCourse:'0',
      	idCourse:'0',
      	c_name:''
	  };

	  this.isMounted_ = false;
	}

	componentDidMount(){
		this.LoadCourses();
	}
	componentWillUnmount(){
		this.isMounted_ = false;
	}

   	showingModal(idElement){
		document.getElementById(idElement).style = "display: block; padding-right: 15px;";
		document.getElementById(idElement).classList.add('dark');
		setTimeout(() => document.getElementById(idElement).className = 'modal fade dark show',200);
	}

	hideModal(idElement){
		setTimeout(() => document.getElementById(idElement).className = 'modal fade',300);
		setTimeout(() => document.getElementById(idElement).style = "display: none; padding-right: 0px;",400);
	}

   _envolver_(d){
		let _saludar_ = 's1z2a';
		let simpleCrypto = new SimpleCrypto(_saludar_);
		return simpleCrypto.encrypt(d);
	}

   _desenvolver_(d){
   		let _saludar_ = 's1z2a';
		let simpleCrypto = new SimpleCrypto(_saludar_);
		return simpleCrypto.decrypt(d);
	}

   IsJsonString(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
    	return true;
	}

	checkProperty(res) {
		return res !== null ? true : false;
	}

	getFormatTimeStamp(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('/');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[2]+"-"+(newdate[1] < 10 ? "0"+newdate[1] : newdate[1])+"-"+(newdate[0] < 10 ? "0"+newdate[0] : newdate[0])+seconds;
    	return formatdate;
	}

	getFormatDate(date_){
     let formatdate = date_.getDate()+"/"+(date_.getMonth()+1)+"/"+date_.getFullYear()+" "+date_.getHours()+":"+date_.getMinutes()+":"+date_.getSeconds();
     return formatdate;
    }

    LoadCourses(){
    	this.isMounted_ = true;
    	if(this.isMounted_){
    		this.setState({isLoaded:true});
    	}
    	let id = (sessionStorage.getItem('duct') ===  undefined || sessionStorage.getItem('duct') === null || sessionStorage.getItem('duct') === "undefined") ? 0 : JSON.parse(sessionStorage.getItem('duct'))[0].us;
    	let data = JSON.stringify({us:id});
    	services.requestGet(routes.courses.listId,data)
    	.then(res => {
    				console.log(res);
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
						this.props.addCourses(res);
			      	}
			      }
			    },
		    (error) => {
		      if(this.isMounted_){
			      this.setState({
			        isLoaded: false,
			        error
			      });
		  	  }

		  	  alert(error);
		    }).finally(() => {

		     if(this.isMounted_){
		      	 this.setState({isLoaded:false});
		      	 this.isMounted_ = false;
		      }
		    }).catch(function(error) {
		      alert(
		        error.message
		      );

		     // ADD THIS THROW error
		      throw error;
		    });
    
    }

    validateTypeSend(){
    	const { typeSend,idCourse, codeCourse, code , name, description, currentColor } = this.state;
    	if(typeSend === "ADD"){
    		return JSON.stringify({ 
    			codeCourse: codeCourse, 
    			code: code , 
    			name: name, 
    			description: description, 
    			color: currentColor
    		});
    	}else{
    		console.log(codeCourse + ' - ' + code);
    		return JSON.stringify({ 
    			codeCourse: codeCourse, 
    			code: code , 
    			name: name, 
    			description: description, 
    			color: currentColor,
    			course_id: idCourse
    		});
    	}
    }

    callbakcAction(codeCourse,code,name,description,currentColor,idCourse,indexCourse){
    	let currentData = this.props.courses.courses;
		//let date_ = this.getFormatTimeStamp(this.getFormatDate(new Date()));
		let newdata = { 
    		codeCourse: codeCourse, 
    		code: code , 
    		c_name: name, 
    		description: description, 
    		color: currentColor,
    		c_course_id: idCourse
    	}

		currentData[indexCourse] = newdata;
		this.props.UpdateCourse(currentData);
    }

	sendData(){
    	const { codeCourse, code , name, description, currentColor,readyToSend,indexCourse,idCourse, typeSend } = this.state;
    	let data_ = this.validateTypeSend();
    	this.isMounted_ = true;
    	if(this.isMounted_){
    		this.setState({isLoaded:true});
    	}
    	if(readyToSend){
    		let rute = (typeSend === "ADD") ? routes.courses.add : routes.courses.update;
    		services.requestSet(rute,data_)
    		.then(res => {
    			  console.log(res);
			      if(this.isMounted_){
			      	
			      	let res_ = res.split('-');
			      	if(res[0] !== 'failed'){
			      		
			      		document.getElementById('#modalNewCourse').className = 'modal fade';
				 		document.getElementById('#modalNewCourse').style = "display: none; padding-right: 0px;";
				 		let msg = (typeSend === 'ADD') ? 'El curso se ha creado correctamente!' : 'El curso de ha actualizado correctamente!';
			      		Swal.fire(
						  'Buen trabajo!',
						  msg,
						  'success'
						);
						if(typeSend === "ADD"){
							let date_ = this.getFormatTimeStamp(this.getFormatDate(new Date()));
							data_ = {c_course_id:res_[1],code_group:codeCourse,code:code,c_name:name,description:description,color:currentColor,created:date_,updated:date_};
							this.props.addNewCourse(data_);
						}else{
							this.callbakcAction(codeCourse,code,name,description,currentColor,idCourse,indexCourse);
						}
						
			      	}
			      }
			    },
		    (error) => {
		      if(this.isMounted_){
			      this.setState({
			        isLoaded: false,
			        error
			      });
		  	  }
		  	  alert(error);
		    }).finally(() => {

		     if(this.isMounted_){
		      	 this.setState({isLoaded:false});
		      	 this.isMounted_ = false;
		      }
		    }).catch(function(error) {
		      alert(
		        error.message
		      );

		     // ADD THIS THROW error
		      throw error;
		    });
    	}else{
    		console.log('not sending...');
    	}
    
    }

    deleteData(index,id,idElement){
   	  let currentData = this.props.courses.courses;
	  this.setState({
	  	typeSend:'DELETE',
	  	idCourse:id,
	  	indexCourse:index,
	  	c_name:currentData[index].c_name
	  });
   	  this.showingModal(idElement);
   }

   updateData(index,id,idElement){
   	  let currentData = this.props.courses.courses;
	  this.setState({
	  	typeSend:'UPDATE',
	  	idCourse:id,
	  	indexCourse:index,
	  	name:currentData[index].c_name,
	  	description:currentData[index].description,
	  	code:currentData[index].code,
	  	codeCourse: currentData[index].code_group,
	  	currentColor:currentData[index].color
	  });
	  console.log(currentData[index].code_group + ' - ' + currentData[index].code);
   	  this.showingModal(idElement);
   }

   delete(){
   		const { indexCourse , idCourse } = this.state;
   		
	   	if(idCourse === '0'){
	   		console.log('undefined id data');
	   	}else{
	   		let data_ = JSON.stringify({c_course_id:idCourse});
	   		//console.log('i am here');
	   		this.isMounted_ = true;
	   		this.setState({isLoaded:true});
	   		services.requestSet(routes.courses.delete,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		this.hideModal('#modalQuestionForCurso');
			      		Swal.fire(
						  'Buen trabajo!',
						  'La institucion se ha Eliminado correctamente!',
						  'success'
						);
						
						this.props.DeleteCourse(indexCourse);
						
						
			      	}
			      }
			    },
		    (error) => {
		      this.setState({
		        isLoaded: false,
		        error
		      });
		    }).finally(() => {

		      this.setState({isLoaded:false,typeSend:'ADD'});
		      this.isMounted_ = false;

		    }).catch(function(error) {
		      alert(
		        error.message
		      );

		     // ADD THIS THROW error
		      throw error;
		    });
	   	}
   }

	continue(ev){
		const { code, codeCourse , name } = this.state;
		ev.preventDefault();
		if(code.length === 0 && codeCourse.length === 0 && name.length === 0 ){
			this.setState({showAlert:true,msgAlert:'Por favor complete todos los campos para continuar',bgAlert:'alert-danger',readyToSend:false});
		}else if(code === 0 || code.length === 0){
			this.setState({showAlert:true,msgAlert:'Por favor ingrese el codigo del grupo al cual va a pertenecer el curso para continuar',bgAlert:'alert-danger',readyToSend:false});
		}else if(codeCourse === 0 || codeCourse.length === 0){
			this.setState({showAlert:true,msgAlert:'Por favor ingrese un codigo unico o genere un codigo dando click en el boton generar para para continuar',bgAlert:'alert-danger',readyToSend:false});
		}else if(name === 0 || name.length === 0){
			this.setState({showAlert:true,msgAlert:'Por favor ingrese un nombre para el curso para continuar',bgAlert:'alert-danger',readyToSend:false});
		}else{
			this.setState({showOtherFields:true,showAlert:false,readyToSend:true});
		}
		
	}

	showColor(ev){
		ev.preventDefault();
		document.querySelector('.container-colors').classList.toggle('show');
	}


	chooseColor(ev,color,style){
		ev.preventDefault();
		console.log(color);
		document.querySelector('.container-colors').classList.remove('show');
		document.querySelector('.box-color').className = `box-color ${style}`;
		this.setState({currentColor:style});
	}

	GoBack(ev){
		ev.preventDefault();
		this.setState({showOtherFields:false});
	}

	showOptions(ev){
		ev.preventDefault();
		let parent = '';
		if(ev.target.tagName === "P"){
			parent = ev.target.parentElement.parentElement;
			parent.children[1].classList.toggle('show');
		}else{
			parent = ev.target.parentElement;
			parent.children[1].classList.toggle('show');
		}

		
	}
    
   _renderItems_(item,index){
   		if(item === "" || item === null || item === "undefined"){
   			return(<div className="container-global-preloader mt-5" key={index+1}>
				<div className="global-preloader mt-5">
					<div className="preloader_">
						<div className="bar bar-one"></div>
						<div className="bar bar-two"></div>
					</div>
				</div>
			</div>);
   		}else{
   			if(Object.values(item)[0] === "empty"){
   				return(<div key={index+1}><p></p></div>);
   			}else{
	   			return(<div className="card rounded_10 shadow-sm mb-3 p-0 " style={{width:'368px',height: '160px'}} key={index+1}>
						<div className={"card-header rtop_10 "+item.color} style={{height: '105px'}}>
							<Link to={{
								pathname:"/viewcourse/"+item.c_name.replace(/\s/g,'-')+'/',
									course:item.c_name.replace(/\s/g,'-'),
									state: {
										course:{courseId:item.c_course_id,c_name:item.c_name.replace(/\s/g,'-'),color:item.color}
									}}
								} className="mr-4 mb-3 rounded-20" style={{textDecoration: 'none'}}>
								<div className="bd-callout bd-callout-l-white">
									<h4 className="white_light mb-0">{item.c_name}</h4>
									<p className="card-text white_light">{item.description.length < 75 ? item.description :item.description.substring(0,80)+'...'}</p>
								</div>
							</Link>
						</div>
						<div className="card-body d-flex justify-content-end align-items-center p-3">
							<div className="dropdown " style={{prosition:'relative',top:'-1px'}}>
								<button className="btn btn-outline-dark font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{height:'35px'}} onClick={(ev) => this.showOptions(ev)}><p style={{position:'relative',top:'-7px',fontSize:'18px'}}>...</p></button>
								<div className="dropdown-menu menu-options" aria-labelledby="dropdownMenuButton">
									<button type="button" className="dropdown-item addhoverdark" onClick={(ev) => this.updateData(index,item.c_course_id,'#modalNewCourse')}>Editar</button>
									<button type="button" className="dropdown-item addhoverdark" onClick={(ev) => this.deleteData(index,item.c_course_id,'#modalQuestionForCurso')}>Eliminar</button>
								</div>
							</div>
						</div>
				</div>
				);
   			}
   			
   		
   		}
   }

   render(){

   		const { isLoaded,c_name, name, code, codeCourse, showOtherFields, color, showAlert, bgAlert, msgAlert, description, currentColor } = this.state;

		return(
			<div>
			    <ProgressBar />
				<Header currentSection="cursos" />
				<div className="container-fluid w-95">
					<div className="modal fade" id="#modalNewCourse" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: 'none', paddingRight: '0px'}}>
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title" id="exampleModalLabel">Agregar Institucion</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() =>this.hideModal('#modalNewCourse')}>
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						        {showAlert ? <div class={"mb-2 alert "+bgAlert} role="alert">{msgAlert}</div> : null}
						        <form>
									  {
									  	showOtherFields ?
									  	<div>
									  	{/*u7IbdR*/}
									  		<div className="form-group">
											    <label htmlFor="exampleInputPassword1">Descripcion</label>
											  	<textarea className="form-control" id="message" rows="2" placeholder="Cuentanos un poco de que se trata el curso Maximo 255 Caracteres" value={description} onChange={(text) => this.setState({description:text.target.value})}></textarea>
									  		</div>
										  	<div className="form-group">
										  		<button type="button" className="btn d-flex" onClick={(ev) => this.showColor(ev)}>
										  			<span className={"box-color "+currentColor}></span>
										  			<label htmlFor="" className="mt-1">Escoje un color</label>
										  		</button>
										  		<div className="d-flex fade container-colors">
										  			<ul className="d-flex bg-white shadow-lg rounded-5 p-1" style={{justifyContent:'flex-start',borderRadius:'6px'}}>
										  			{color.map((item, index) => {
										  				return <li style={{listStyle:'none',marginLeft:'3px'}} key={index+1}><button type="button" className="btn p-1" onClick={(ev) => this.chooseColor(ev,item.color,item.style)}><span className={"box-color "+ item.style} value={item.color}></span></button></li>
										  			})}
										  			</ul>
										  		</div>
										  	</div>
									  	</div>
									  	: <div>
									  	 	<div className="form-group">
										    <label htmlFor="exampleInputEmail1">Codigo del Grupo</label>
										    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar codigo" value={code !== undefined ? code : '' } onChange={(code) => this.setState({code:code.target.value})}/>
										    <small id="emailHelp" className="form-text text-muted">El codigo del grupo debe ser el mismo codigo de algun grupo que hallas creado.</small>
										  </div>
										  <div className="form-group">
										    <label htmlFor="exampleInputPassword1">Codigo del curso</label>
										    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Ej Sur" value={codeCourse !== undefined ? codeCourse : ''} onChange={(code) => this.setState({codeCourse:code.target.value})}/>
										  </div>
										  <div className="form-group">
										    <label htmlFor="exampleInputPassword1">Nombre del curso</label>
										    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Ej Codelines" value={name !== undefined ? name : ''} onChange={(name) => this.setState({name:name.target.value})}/>
										  </div>
									  	 </div> 
									  }
								</form>
						      </div>
						      {!showOtherFields ? <div className="modal-footer">
						        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() =>this.hideModal('#modalNewCourse')}>Cancelar</button>
						        <button type="button" className="btn btn-primary" onClick={(event) => this.continue(event)}>Siguiente</button>
						      </div>
						      	: <div className="modal-footer">
						        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={(ev) =>this.GoBack(ev)}>Atras</button>
						        <button type="button" className="btn btn-primary" onClick={(event) => this.sendData()}>Crear curso</button>
						      </div>}
						      {isLoaded ? <div className="container_circle_preloader">
			               <div className="child_container_">
			                 <div className="circle"><div className="child"></div></div>
			               </div>
			         </div> : null}
						    </div>
						  </div>
					</div>
					<div className="modal fade"  role="dialog" id="#modalQuestionForCurso" style={{display: 'none', paddingRight: '0px'}}>
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title">Eliminar Cursos</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						        <p>¿Se encuentra seguro/a  de eliminar el curso <b>{c_name}</b> ?.</p>
						      </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-primary" onClick={() => this.delete()}>Aceptar</button>
						        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() =>this.hideModal('#modalQuestionForInstitution')}>Cancelar</button>
						      </div>
						      {isLoaded ? <div className="container_circle_preloader">
			               <div className="child_container_">
			                 <div className="circle w80"><div className="child w80"></div></div>
			               </div>
			         </div> : null}
						    </div>
						  </div>
						</div>
					<div className="row ">
						<div className="ml-5 pl-3" style={{position:'relative',top:'10px'}}>
							<h3 className="mt-3">Listado de cursos asignados</h3>
							<p className="text-muted">Esta seccion te permite administrar los cursos a tu gusto</p>
						</div>
					</div>
					<div className="row d-flex justify-content-center" id="content-card-render">
						<div className="col col-md-9">
							<div className="row d-flex justify-content-between p-5 ml-1 mr-3">
								{this.props.courses.courses.map((item,index) =>{
									return this._renderItems_(item,index);
								})}
								<button type="button" className="btn btn-outline-dark mr-4 btn-add" style={{position:'relative',width:'368px',height: '160px',left:'5px'}} onClick={() => this.showingModal('#modalNewCourse')}>
									<span className="font-weight-bold" style={{fontSize:'22px'}}>+</span>
									<p style={{fontSize:'18px'}}>Agregar un nuevo curso</p>
								</button>
							</div>
						</div>
						<div className="col">
						</div>
					</div>
			  </div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  }
}

const mapDispatchToProps = {
  addCourses,
  addNewCourse,
  UpdateCourse,
  DeleteCourse
};

export default connect( mapStateToProps , mapDispatchToProps )(Courses)