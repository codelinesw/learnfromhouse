import React from 'react';
import {
 Link,
 Redirect
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import SideBar from '../components/SideBar';
import Pagination from '../components/Pagination';
import Swal from 'sweetalert2';
import routes from '../request/routes';
import services from '../request/services';
import { connect } from 'react-redux';
import {
  addStudents,
  DeleteStudent,
  ChangeRute
} from '../actions'
class Members extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:'',
      	password:'',
      	courseId: this.props.location.state === undefined ? '0' : (this.props.location.state.course !== undefined ? this.props.location.state.course.courseId : '0'),
      	isLoaded:false,
      	isloaded_:false,
      	t_name:'',
      	taskId:'0',
      	indexTask:'0',
      	loadCountotal:[{count:'0'},{count:'0'}],
      	page:'1',
      	isloading:false,
      	search:'',
      	route:routes.inscriptions.listforinstitution,
      	indexStudent:'0',
      	studentId:'0'
	  };

	  this.isMounted_ = false;
	  this._isMounted_ = false;
	}
	componentDidMount(){
		if(this.state.page == 1){
			this.LoadMembers(1);
		}
		this.LoadCountMembers();
		document.body.style.backgroundColor = "#f2f2f2";
	}
	componentWillUnmount(){
		this.isMounted_ = false;
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
		return res != null ? true : false;
	}


	getFormatTimeStamp(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('/');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[2]+"-"+(newdate[1] < 10 ? "0"+newdate[1] : newdate[1])+"-"+(newdate[0] < 10 ? "0"+newdate[0] : newdate[0])+seconds;
    	return formatdate;
	}

	getDate(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('-');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[0]+"/"+ newdate[1]+"/"+ newdate[2];
    	return formatdate;
	}

	getFormatDate(date_){
     let formatdate = date_.getDate()+"/"+(date_.getMonth()+1)+"/"+date_.getFullYear()+" "+date_.getHours()+":"+date_.getMinutes()+":"+date_.getSeconds();
     return formatdate;
    }

    getDateToInput(date){
    	let newdate = date.substring(0,date.indexOf(" ")).split('-');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[0]+"-"+ newdate[1]+"-"+ newdate[2];
    	return formatdate;
    }

    enrollstudent(ev,id,item){
    	ev.preventDefault();
    	this.isMounted_ = true;
    	let this_ = ev.target;
    	ev.target.parentElement.children[0].classList.add('hide');
    	ev.target.parentElement.children[1].classList.add('show');
    	console.log(this_.parentElement.parentElement.parentElement);
    	if(id !== undefined || id > 0 || id !== null){
    		let data = JSON.stringify({studentid:id,courseid:this.props.location.state.course.courseId});
    		services.requestSet(routes.inscriptions.add,data)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		Swal.fire(
						  'Buen trabajo!',
						  'Este estudiante se ha agregado al curso correctamente!',
						  'success'
						);
			      	}else{

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
				 this.setState({isLoaded: false});
		      	 this.isMounted_ = false;
		      	 this_.parentElement.children[0].classList.remove('hide');
		      	 this_.parentElement.children[0].classList.add('show');
		      	 this_.parentElement.children[1].classList.remove('hide');
    			 this_.parentElement.children[1].classList.add('hide');
    			 this.props.DeleteStudent(item);
    			 console.log(this_.parentElement.parentElement.parentElement);
		      }
		    }).catch(function(error) {
		      alert(
		        error.message
		      );

		     // ADD THIS THROW error
		      throw error;
		    });
    	}else{
    		console.log('por aca');
    	}
    }

    delete(){
   		const { indexStudent , studentId } = this.state;
	   	if(studentId === '0'){
	   		console.log('undefined id data');
	   	}else{
	   		let data_ = JSON.stringify({studentid:studentId});
	   		this.isMounted_ = true;
	   		this.setState({isloaded_:true});
	   		services.requestSet(routes.inscriptions.delete,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		this.hideModal('#modalQuestionForMembers');
			      		Swal.fire(
						  'Buen trabajo!',
						  'Se ha dado de alta al estudiante correctamente!',
						  'success'
						);

			      	}
			      }
			    },
		    (error) => {
		      if(this.isMounted_){
		      	this.setState({
		        	isloaded_: false,
		        	error
		      	});
		      }
		    }).finally(() => {
		      if(this.isMounted_){
		      	this.setState({isloaded_:false});
		      	this.isMounted_ = false;
		      	this.props.DeleteStudent(indexStudent);
		  	  }
		    }).catch(function(error) {
		      alert(
		        error.message
		      );

		     // ADD THIS THROW error
		      throw error;
		    });
	   	}
   }

	_renderItems_(item,index){
		console.log(item);
		if(item === "" || item === "undefined" || item === null){
			return(<tr key={index+1}><td className="text-muted"></td></tr>);
		}else{
			if(Object.values(item)[0] === "empty"){
				return(<tr key={index+1}><th scope="row"></th><td></td><td>No existen estudiantes registrados</td><td></td></tr>);
			}else{
				return(
			        <tr key={index+1}>
			        	<td className="p-1"><input type="checkbox" aria-label="Checkbox for following text input" className="ml-1 mt-3" /></td>
						<td scope="row">{index+1}</td>
						<td><div className="row d-flex ml-1">
							<img src="https://pngimage.net/wp-content/uploads/2018/06/user-png-image-5.png" width="35" height="35" />
							<p style={{position: 'relative', top:'5px', marginLeft: '5px'}}>{item.us_name}</p>
						</div></td>
						<td><p className="mt-1">{item.c_code}</p></td>
						<td><p className="mt-1">Grado 6to</p></td>
						<td><p className="mt-1">{item.status}</p></td>
						<td>
							{this.state.route === routes.students.listforinstitution ?
							    <div className="input-group" role="group" aria-label="Basic example" onClick={(ev) => this.enrollstudent(ev,item.us_user_information_id,index)}>
									<button type="button" className="btn btn-secondary">Inscribir</button>
									<div className="btn btn-outline-dark disabled position-absolute hide" style={{width:'80px',height:'39px'}}>
										<div className="container_circle_preloader position-relative bg-transparent d-flex justify-content-center align-items-center mb-5" style={{width:'100%',height:'100%'}}>
											<div className="child_container_ position-relative d-flex justify-content-center align-items-center">
												<div className="circle w30">
													<div className="child w30 border_dark">
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								: <div className="input-group" role="group" aria-label="Basic example" onClick={() => this.deleteData(index,item.us_user_information_id,'#modalQuestionForMembers')}>
									<button type="button" className="btn btn-outline-danger">Dar de baja</button>
								</div>
							}
						</td>
					</tr>
				);
			}
		}
	}

	LoadMembers = (count,rute_ = false,item = false) =>{
		this.isMounted_ = true;
    	if(this.isMounted_){
    		this.props.addStudents(['']);
 			if(item.target !== undefined){
 				if(item.target.className !== 'item-tabs nav-link active'){
	    			[].forEach.call(document.querySelectorAll('.item-tabs'), function(button) {
					  	if(button !== item.target){
					  		button.classList.remove('active');
					  		button.classList.add('innactive');
					  	}else{
					  		button.classList.remove('innactive');
					  		button.classList.add('active');
					  	}
					});
    			}
 			}

    		if(rute_ === false || rute_ === undefined){
    			rute_ = this.state.route;
    		}

    		this.setState({isLoaded:true,route:rute_});
    	}
    	
    	let id = (sessionStorage.getItem('duct') ===  undefined || sessionStorage.getItem('duct') === null || sessionStorage.getItem('duct') === "undefined") ? 0 : JSON.parse(sessionStorage.getItem('duct'))[0].i_institution_id;
    	let data = (count == 1) ? ( (rute_ == routes.students.loadforinstitution) ? JSON.stringify({institution_id:id}) : JSON.stringify({institution_id:id,courseId:this.props.location.state.course.courseId}) ): JSON.stringify({institution_id:id,page:count});
    	services.requestGet(rute_,data)
    	.then(res => {
    		      
			      if(this.isMounted_){
			      	//console.log(res);
			      	if(res !== 'failed'){
			      		//console.log(res);
						this.props.addStudents(res);
						if(count){
							this.setState({page:count});
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
				 this.setState({isLoaded: false});
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

	LoadCountMembers(){
		this._isMounted_ = true;
    	if(this._isMounted_){
    		this.setState({isLoaded:true});
    	}
    	let id = (sessionStorage.getItem('duct') ===  undefined || sessionStorage.getItem('duct') === null || sessionStorage.getItem('duct') === "undefined") ? 0 : JSON.parse(sessionStorage.getItem('duct'))[0].i_institution_id;
    	let courseid = (this.props.location ===  undefined || this.props.location.state === null || this.props.location.state.course === "undefined") ? 0 : this.props.location.state.course.courseId;
    	let data = JSON.stringify({institution_id:id,courseId:courseid});
    	services.requestGet(routes.students.loadforinstitution,data)
    	.then(res => {
    			console.log(res);
			      if(this._isMounted_){
			      	if(res !== 'failed'){
						this.setState({loadCountotal:res});
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

	showingModal(idElement){
		document.getElementById(idElement).style = "display: block; padding-right: 15px;";
		document.getElementById(idElement).classList.add('dark');
		setTimeout(() => document.getElementById(idElement).className = 'modal fade dark show',200);
	}

	hideModal(idElement){
		setTimeout(() => document.getElementById(idElement).className = 'modal fade',300);
		setTimeout(() => document.getElementById(idElement).style = "display: none; padding-right: 0px;",400);
	}

   deleteData(index,id,idElement){
   	  let currentData = this.props.students.students;
	  this.setState({
	  	studentId:id,
	  	indexStudent:index,
	  	t_name:currentData[index].us_name
	  });
	  console.log(currentData[index].us_name);
   	  this.showingModal(idElement);
   }

   search(){
   	    this.isMounted_ = true;
    	if(this.isMounted_){
    		this.props.addStudents(['']);
    		this.setState({isLoaded:true});
    	}
   		let data = JSON.stringify({data:this.state.search});
    	services.requestGet(routes.students.searchforinstitution,data)
    	.then(res => {
			if(this.isMounted_){
			    if(res !== 'failed'){
					this.props.addStudents(res);
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
				this.setState({isLoaded: false});
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

   validateSearch(ev){
	   	ev.preventDefault();
	   	const { search } = this.state;
	   	if(search.trim().length == 0){
	   		document.querySelector('.toast_custom').classList.add('_show_');
	   		document.querySelector('.toast_custom').innerHTML = '<p>Si deseas buscar un estudiante,diligencia el campo de busqueda</p>';
	   		setTimeout(() => {
	   			document.querySelector('.toast_custom').classList.remove('_show_');
	   		},5500);
	   	}else{
	   		this.search();
	   	}
   }

	render(){
		const { isLoaded, t_name, isloading, search , route , loadCountotal, page, isloaded_  } = this.state;
		const { location } = this.props;
		return(
			<div>
				<Header currentSection="cursos" />
				<div className="container-fluid w-100">
					<div className="row">
						<div className="col col-md-3 mt-2">
							<div className="card col-sm-10 p-0 m-auto mb-4 bg-transparent border-0">
								<div className="card-header p-2  bg-none bg-white border-0 shadow-sm  m-auto rounded-5 w-100">
									<div className="row d-flex border-0 w-100">
										<img src="https://pngimage.net/wp-content/uploads/2018/06/user-png-image-5.png" width="42" height="42" className="d-inline-block align-top mr-2 ml-3" alt="" />
										<div className="column">
											<p className="card-text m-0 font-weight-bold">Jhon Murillo Mendez</p>
											<p className="card-text font-weight-light fs-12 small mb-1" style={{marginTop: '-2px'}}>Docente</p>
											<div className="input-group mb-1">
												<a className="btn btn-outline-info" href="/" style={{height: '35px',fontSize:'13px'}}><p style={{fontSize: '13px'}}>Actualizar Mi Perfil</p></a>
											</div>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<SideBar state_={this.props.location.state} current="Members" path={{one:'/viewcourse/',two:'/tasks/',three:'/members/'}} />
								</div>
							</div>
						</div>
						<div className="col col-md-9">
							<div className="row mt-2 mb-2">
								<div className="card m-auto bg-white w-93">
									<div className="card-header bg-white border-bottom-0">
										<div className={"bd-callout b-"+location.state.course.color.split('-')[1]+'-'+location.state.course.color.split('-')[2]}>
											<h4 className="text-dark">{location.state.course.c_name.replace(/\-/g,' ')}</h4>
											<p className="card-text text-black-50" style={{marginTop: '-9px'}}>Docente - Carolina Gonzales Velasco | Jornada nocturna | Grado 9</p>
										</div>
										<p className="card-text text-secondary mt-1">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
									</div>
									<div className="card-body">
										
									</div>
								</div>
							</div>
							<div className="row">
								<div className="card m-auto" style={{maxWidth:'900px',width:'900px'}}>
									<div className="card-header bg-transparent d-flex justify-content-between">
										<h5 className="card-title">Listado de miembros del curso</h5>
									</div>
									<ul className="nav nav-tabs">
									  <li className="nav-item">
									    <button className="item-tabs nav-link active" onClick={(ev) => this.LoadMembers(1,routes.inscriptions.listforinstitution,ev)} style={{outline:'none'}}>Estudiantes Inscritos</button>
									  </li>
									  <li className="nav-item">
									    <button className="item-tabs nav-link innactive" onClick={(ev) => this.LoadMembers(1,routes.students.listforinstitution,ev)} style={{outline:'none'}}>Agregar Estudiantes</button>
									  </li>
									</ul>
									<div className="card-body p-3">
										<div className="card p-1 border-0">
											<div className="card-header p-1 border-0 bg-transparent">
												<div className="d-flex justify-content-between">
														<div className="column d-flex align-items-center col-md-2">
															<p style={{position: 'relative', top: '5px'}}>Mostrar</p>
															<select className="form-control ml-2" id="exampleFormControlSelect1" defaultValue="DEFAULT">
																<option value="DEFAULT">10</option>
																<option value="5">5</option>
															</select>
														</div>
														<div className="input-group col-md-4">
														  <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" placeholder="Busca por el codigo" value={search} onChange={(text) => this.setState({search:text.target.value})} />
														  <div className="input-group-append">
														    <button type="button" className="btn btn-outline-secondary" onClick={(ev) => this.validateSearch(ev)}>Buscar</button>
														  </div>
														</div>
												</div>
											</div>
											<div className="card-body p-1">
												<table className="table table-bordered">
												  <thead>
												    <tr>
												      <th scope="col" className="p-1"><input type="checkbox" aria-label="Checkbox for following text input" className="ml-1" /></th>
												      <th scope="col">#</th>
												      <th scope="col">Estudiante</th>
												      <th scope="col">Codigo</th>
												      <th scope="col">Grado</th>
												      <th scope="col">Estado</th>
												      <th scope="col">Acciones</th>
												    </tr>
												  </thead>
												  <tbody id="content-render">
												  	{this.props.students.students.map((item,index) =>{
														return this._renderItems_(item,index);
													})}
												  </tbody>
												</table>
											</div>
											{isLoaded ? <div className="container_circle_preloader position-relative d-flex justify-content-center align-items-center mb-5" style={{width:'866px',height:'50px'}}>
												<div className="child_container_ position-relative d-flex justify-content-center align-items-center">
													<div className="circle w40">
														<div className="child w40">
														</div>
													</div>
												</div>
											</div> : null}
										</div>
										<div className="row d-flex justify-content-between">
											<p className="text-dark ml-4 d-flex mt-2">Mostrando del <b className="ml-1 mr-2">{page}</b> al <b className="ml-1 mr-2">10</b> de un total de <b className="ml-1 mr-2">{route !== routes.students.listforinstitution ? loadCountotal[1].count : loadCountotal[0].count}</b> registros</p>
											<nav aria-label="Page navigation example">
											  {
											   route !== routes.students.listforinstitution ? (loadCountotal[1].count < 10) ? null : 
											   <Pagination 
											   count={loadCountotal[1]} 
											   prev={this.LoadMembers} 
											   next={this.LoadMembers}
											   currentPage={page}
											   route={route}
											   />: null
											  }
											  {route === routes.students.listforinstitution ? 
											  <Pagination 
											   count={loadCountotal[0]} 
											   prev={this.LoadMembers} 
											   next={this.LoadMembers}
											   currentPage={page}
											   route={route}
											   />: null }
											</nav>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade"  role="dialog" id="#modalQuestionForMembers" style={{display: 'none', paddingRight: '0px'}}>
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title">Eliminar Tarea</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						        <p>¿Se encuentra seguro/a de dar de alta al estudiante <b>{t_name}</b> ?.</p>
						      </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-primary" onClick={() => this.delete()}>Aceptar</button>
						        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() =>this.hideModal('#modalQuestionForInstitution')}>Cancelar</button>
						      </div>
						      {isloaded_ ? <div className="container_circle_preloader">
			               <div className="child_container_">
			                 <div className="circle w80"><div className="child w80"></div></div>
			               </div>
			         </div> : null}
						    </div>
						  </div>
				</div>
				<div className="toast_custom"></div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    students: state.students
  }
}

const mapDispatchToProps = {
  addStudents,
  DeleteStudent,
  ChangeRute
};

export default connect( mapStateToProps , mapDispatchToProps )(Members)