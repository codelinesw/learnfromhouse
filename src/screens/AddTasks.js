import React from 'react';
import {
 Redirect,
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import { connect } from 'react-redux';
import routes from '../request/routes';
import services from '../request/services';
import {
  LoadTeachers,
  addNewGroup,
  UpdateGroup,
} from '../actions'

class AddTasks extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	taskId: this.props.location.state === undefined ? '0' : (this.props.location.state.task !== undefined ? this.props.location.state.task.taskId : '0'),
	  	courseId: this.props.location.state === undefined ? '0' : (this.props.location.state.task !== undefined ? this.props.location.state.task.courseId : '0'),
      	name:this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? this.props.location.state.task.name : ''),
      	description:this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? this.props.location.state.task.description : ''),
      	file: this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? this.props.location.state.task.file_one : ''),
      	startdate: this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? this.props.location.state.task.startdate : ''),
      	enddate: this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? this.props.location.state.task.enddate : ''),
      	additionalStyle:{
      		display: 'none', 
      		paddingRight: '0px'
      	},
      	isLoaded:false,
      	typeclass:'',
      	msg:'',
      	showAlert:false,
      	action:this.props.location.state === undefined ? 'ADD' : (this.props.location.state.action !== undefined ? this.props.location.state.action : 'ADD'),
      	nameFile:'Selecciona un archivo'
	  };

	  this.showing = false;
	  this.isMounted_ = false;
	}

	componentDidMount(){
		if(typeof file === 'object'){
	       this.setState({nameFile:this.state.file.name});
	    }else{

	        if(this.state.file != 'undefined' || this.state.file != undefined != null){
	        	if(this.state.file != '' && this.state.file != undefined && this.state.file != null){
	        		let file_ = this.state.file.split('#')[1];
	        		this.setState({nameFile:file_});
	        	}else{
	        		this.setState({nameFile:'Selecciona un archivo'});
	        	}
	        }else{
	        	this.setState({nameFile:'Selecciona un archivo'});
	        }
	    }
	}

	componentWillUnmount(){
		this.isMounted_ = false;
	}

	GenerateCode(length){
		var result           = '';
	   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
	      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   this.setState({code:result});
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

	validateAction(){
		return (this.props.location.state === undefined ? false : this.props.location.state.task !== undefined ? true : false)
	}

	getFormatDate(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('-');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[0]+"/"+ newdate[1]+"/"+ newdate[2];
    	return formatdate;
	}

	saveData(data){
		this.setState({isLoaded:true});
		let url = (this.state.action !== "ADD") ? routes.tasks.update : routes.tasks.add;
		services.requestUpload(url,data)
    	.then(res => {
			console.log(res);
		  	if(res !== "failed"){
		  		let text = (this.state.action !== "ADD") ? 'actualizado esta' : 'crear esta nueva';
		  		this.setState({showAlert:true,msg:'Felicidades ha '+text+' tarea correctamente',typeclass:'alert-success'});
		  	}else{
		  		let text = (this.state.action !== "ADD") ? 'actualizado esta' : 'crear esta nueva';
		  		this.setState({showAlert:true,msg:'Upps! Ah ocurrido un problema al intentar '+text+' tarea, vuelva a intentarlo mas tarde',typeclass:'alert-danger'});
		  	}
	    },
		(error) => {
		  this.setState({
		  	showAlert:true,
		  	msg:'Upps! Al parecer no tienes conexion a internet, vuelva a intentarlo luego para poder crear un nueva tarea',
		  	typeclass:'alert-danger',
		  	isLoaded: false,
		  });
		}).finally(() => {
		  this.setState({isLoaded:false});
		  this.isMounted_ = false;
		}).catch(function(error) {
		   this.setState({
		  	showAlert:true,
		  	msg:error,
		  	typeclass:'alert-danger',
		  });
		  throw error;
		});
	}
	validateForm(event){
		const { name, description, file, startdate, enddate, taskId, courseId } = this.state;
		if(name === '' && description === '' && startdate === '' && enddate === ''){
			this.setState({showAlert:true,msg:'Por favor complete todos los campos para guardar la tarea',typeclass:'alert-danger'});
		}else if(name === '' || name.trim().length == 0){
			this.setState({showAlert:true,msg:'Ingrese un nombre para la tarea',typeclass:'alert-danger'});
		}else if(description === '' || description.trim().length == 0){
			this.setState({showAlert:true,msg:'Ingrese una descripcion breve de la tarea',typeclass:'alert-danger'});
		}else if(startdate === '' || startdate.trim().length == 0){
			this.setState({showAlert:true,msg:'Ingrese una fecha de inicio para la tarea',typeclass:'alert-danger'});
		}else if(enddate === '' || enddate.trim().length == 0){
			this.setState({showAlert:true,msg:'Ingrese una fecha fin para la tarea',typeclass:'alert-danger'});
		}else{
			this.setState({showAlert:false,msg:'',typeclass:''});
			let data = this.validateAction() ? JSON.stringify({name:name,description:description,startdate:startdate,enddate:enddate,c_course_id:courseId}) : JSON.stringify({name:name,description:description,c_course_id:courseId,t_task_id:taskId});
			let uploadData = new FormData();
			uploadData.append('c_course_id',courseId);
	        uploadData.append('name',name);
	        uploadData.append('description',description);
	        uploadData.append('startdate',startdate);
	        uploadData.append('enddate',enddate);
	        
	        if(this.state.action !== "ADD"){
	        	uploadData.append('task_id',taskId);
	        }
	        if((file == "" || file == null || file == "undefined")){
	        	console.log('add without file');
	  			this.saveData(uploadData);
	        }else{
	        	uploadData.append('file',file);
	            //uploadData.append('file',{type:'image/jpg',uri:file,name:'uploadimage.jpg'});
	  			this.saveData(uploadData);
	        }
			
		}
	}
	//g_groups_ibfk_1 - c_courses_ibfk_1
	render(){
		const { teacherId, courseId, name, description,file,startdate,enddate, typeclass, msg, showAlert, isLoaded,nameFile } = this.state;
		return(
			<div>
				<Header currentSection="cursos"/>
				<div className="container-fluid mt-3 col-md-9">
					  <section className="content">
					  		<div className="card mb-5">
						  		<div className="card-header">
									<h5>Agrega una nueva tarea</h5>
								</div>
								<div className="card-body">
								  {showAlert ? <div className={'alert '+typeclass} role="alert">{msg}</div> : null}
								  <form>
								  		<div className="form-group">
											<label htmlFor="exampleInputName">Nombre de la tarea</label>
											<input type="text" className="form-control" id="exampleInputName" placeholder="Ej Revisar los capitulos 1 y 2 de cualquier libro" value={name} onChange={(event) => this.setState({name:event.target.value})}/>
										</div>
										<div className="form-group">
										  <label htmlFor="exampleInputDescription">Descripcion</label>
										  <textarea className="form-control" id="exampleInputDescription" rows="3" placeholder="Cuentanos un poco de que se trata esta tarea Maximo 455 Caracteres" value={description} onChange={(text) => this.setState({description:text.target.value})}></textarea>
										</div>
										<div className="input-group mb-3">
										  <div className="custom-file">
										    <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={(fl) => this.setState({file:fl.target.files[0],nameFile:fl.target.files[0].name})}/>
										    <label className="custom-file-label" htmlFor="inputGroupFile02">{nameFile}</label>
										  </div>
										</div>
										<div className="form-group mb-3">
										  	  <label htmlFor="startdate">Fecha de Inicio</label>
											  <div className="input-group">
											  	<div className="input-group-prepend">
											    	<span className="input-group-text"><i className="fas fa-clock"></i></span>
											  	</div>
										  	  	<input type="date" className="form-control date-start" id="date-start" aria-label="Amount (to the nearest dollar)" value={startdate ? startdate : ''} onChange={(date) => this.setState({startdate:date.target.value})} />
											  </div>
										</div>
										<div className="form-group mb-3">
										  	  <label htmlFor="enddate">Fecha Final</label>
											  <div className="input-group">
											  	<div className="input-group-prepend">
											    	<span className="input-group-text"><i className="fas fa-clock"></i></span>
											  	</div>
										  	  	<input type="date" className="form-control" aria-label="Amount (to the nearest dollar)" value={enddate ? enddate : ''}  onChange={(date) => this.setState({enddate:date.target.value})}/>
											  </div>
										</div>
										<div className="input-group">
											<button type="button" className="btn btn-secondary mr-2" data-dismiss="modal" onClick={() =>this.hideModal()}>Cancelar</button>
						        			<button type="button" className="btn btn-primary" onClick={(event) => this.validateForm(event)}>Guardar cambios</button>
										</div>
								  </form>
								</div>
								{isLoaded ? <div className="container_circle_preloader">
			               <div className="child_container_">
			                 <div className="circle"><div className="child"></div></div>
			               </div>
			         </div> : null}
					  		</div>
					  </section>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    groups: state.groups
  }
}

const mapDispatchToProps = {
  LoadTeachers,
  addNewGroup,
  UpdateGroup,
};

export default connect( mapStateToProps , mapDispatchToProps )(AddTasks)

