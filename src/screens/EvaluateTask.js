import React from 'react';
import {
 Link,
 Redirect
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Swal from 'sweetalert2';
import Header from '../components/header';
import routes from '../request/routes';
import services from '../request/services';

export default class EvaluateTask extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	title:this.props.location === undefined || this.props.location === '' || this.props.location === null ? 'Esta titutlo de esta tarea no esta disponible' : (this.props.location.state === undefined || this.props.location.state === '' || this.props.location.state === null) ? 'Esta titulo de esta tarea no esta disponible' : this.props.location.state.task.file,
	  	description:this.props.location === undefined || this.props.location === '' || this.props.location === null ? 'La descripcion no esta disponible' : (this.props.location.state === undefined || this.props.location.state === '' || this.props.location.state === null) ? 'La descripcion no esta disponible' : this.props.location.state.task.description,
	  	name:this.props.location === undefined || this.props.location === '' || this.props.location === null ? 'El nombre no esta disponible' : (this.props.location.state === undefined || this.props.location.state === '' || this.props.location.state === null) ? 'El nombre no esta disponible' : this.props.location.state.task.title,
	  	taskId: this.props.match === undefined || this.props.match === '' || this.props.match === null ? '0' :(this.props.match.params === undefined || this.props.match.params === null || this.props.match.params === '') ? '0' : this.props.match.params.task,
	  	note:0,
	  	info:[''],
	  	isLoaded:false
	  };

	  this.isMounted_ = false;
	}

	componentDidMount(){
		
		//this.loadCurrentTask();
		console.log(this.props.location.state.task.title);
	}


	componentWillUnmount(){
		this.isMounted_ = false;
	}

	loadCurrentTask(){
   		const { courseId , taskId  } = this.state;
   		const { match } = this.props;
   		console.log(taskId);
	   	if((taskId === '0' && courseId === '0') || taskId === '' || taskId == '0'){
	   		console.log('undefined id data');
	   		if(this.isMounted_){
	   			this.setState({info:[{response:"empty"}]});
	   		}
	   	}else{
	   		let data = sessionStorage.getItem('duct');
	   		let rol = '0';
			if(data !== undefined){			
				if(this.IsJsonString(data)){
					data = JSON.parse(data);
					if(data[0] !== undefined || data[0] !== '' || data[0] !== null){
						if(data[0].r_rol_id !== undefined || data[0].r_rol_id !== null || data[0].r_rol_id !== ''){
							rol = data[0];
						}else{
							rol = '0';
						}
					}
				}
			}
	   		
	   		this.isMounted_ = true;
	   		if(this.isMounted_){
	   			this.setState({isLoaded:true});
	   		}
	   		let data_ = (rol.r_rol_id.substring(12,13) == 4 || rol.r_rol_id.substring(12,13) == 1 || rol.r_rol_id.substring(12,13) == 2) ?  JSON.stringify({c_course_id:courseId,taskid:taskId}) : JSON.stringify({c_course_id:courseId,taskid:taskId,userid:rol.us});
	   		let url_ = (rol.r_rol_id.substring(12,13) == 4 || rol.r_rol_id.substring(12,13) == 1 || rol.r_rol_id.substring(12,13) == 2) ? routes.homeworksolution.list: routes.homeworksolution.listId;
	   		services.requestGet(url_,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		
			      		if(!res){
				      		Swal.fire(
							  '!Upps',
							  'no tienes permisos para cargar esta tarea!',
							  'error'
							);
							this.setState({info:[{response:'empty'}]});
			      		}else{
			      			this.setState({info:res,rol:rol.r_rol_id.substring(12,13)});
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

	getDate(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('-');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[0]+"/"+ newdate[1]+"/"+ newdate[2];
    	return formatdate;
	}

	getFormatDate(date_){
     let formatdate = `${date_.getFullYear()}-${(date_.getMonth()+1) < 10 ? '0'+(date_.getMonth()+1) : (date_.getMonth()+1)}-${date_.getDate() < 10 ? '0'+date_.getDate(): date_.getDate()} ${date_.getHours()}:${date_.getMinutes()}:${date_.getSeconds()}`;
     return formatdate;
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

	SaveData(ev){
		ev.preventDefault();
		this.isMounted_ = true;
		if(this.isMounted_){
			this.setState({
				isLoaded:true
			});
		}
		const { title, description, note } = this.state;
		const { match } = this.props;
		let id = (match.params === undefined) ? 0 : (match.params.id === undefined) ? 0 : match.params.id;
		if((title === '' || title === undefined || title === null) && (description === null || description === undefined)){
			console.log('Todos los campos vacios');
		}else if((title === '' || title === undefined || title === null)){
			console.log('Titulo vacio');
		}else{
			
			let data = JSON.stringify({title:title,description:description,note:note,solutionId:id});
			services.requestSet(routes.homeworksolution.update,data)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		Swal.fire(
						  'Buen trabajo!',
						  'Has evaluado la tarea correctamente!',
						  'success'
						);
			      		//Solucion del taller #1
			      	}else{

			      		Swal.fire(
						  'Upps!',
						  'Ha ocurrido un problema al intentar evaluar la tarea!',
						  'error'
						);
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
	}

	downloadFile(ev){
		ev.preventDefault();
		let file = ev.target.dataset.file;
		console.log(file);
		let a = document.createElement('a');
		a.href = `http://localhost:8089${file}`;
		a.download = file;
		a.click();
	}


	render(){
		const { match, location } = this.props;
		const { title, name, description , note,  isLoaded} = this.state;
		let data = (location.state === undefined) ? {task:{description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}} :  location.state;
		return(
			<div>
				<Header currentSection="cursos"/>
				<div className="container-fluid mt-3 w-80">
					<div className="row">
						    <div className="col">
							      <nav aria-label="breadcrumb">
									  <ol className="breadcrumb w-100">
									    <li className="breadcrumb-item"><Link to="#">Matematicas</Link></li>
									    <li className="breadcrumb-item"><Link to="/tasks">Tareas</Link></li>
									    <li className="breadcrumb-item active" aria-current="page">{name}</li>
									  </ol>
								   </nav>
						    </div>
					  </div>
					  <section className="content">
					  		<div className="card">
						  		<div className="card-header">
									<h5>Califica la tarea del estudiante</h5>									
								</div>
								<div className="card-body">
									<form>
									  <div className="form-group">
									    <label htmlFor="inputTitle">Tarea</label>
									    <input type="text" className="form-control" id="inputTitle" aria-describedby="TitleHelp" placeholder="Ingresa un titulo" readOnly value={title || ''}  onChange={(e) => this.setState({title:e.target.value})}/>
									    <small id="TitleHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
									  </div>
									  <div className="form-group">
									    <label htmlFor="description">Descripcion</label>
									    <textarea row="4" className="form-control" placeholder="Ingresa una nota para el estudiante" value={description || ''} onChange={(e) => this.setState({description:e.target.value})}></textarea>
									  </div>
									  <div className="form-group">
									  	<label className="form-check-label" htmlFor="exampleCheck1">Evaluacion</label>
									    <input type="text" className="form-control" id="inputNote" aria-describedby="NoteHelp" placeholder="5.0" value={note || ''} onChange={(e) => this.setState({note:e.target.value})}/>
									  </div>
									  <button type="submit" className="btn btn-primary" onClick={(ev) => this.SaveData(ev)}>Guardar Cambios</button>
									</form>
								</div>
								{isLoaded ? <div className="container_circle_preloader position-relative d-flex justify-content-center align-items-center mb-5" style={{width:'866px',height:'50px',top:'-85px'}}>
												<div className="child_container_ position-relative d-flex justify-content-center align-items-center">
													<div className="circle w40">
														<div className="child w40">
														</div>
													</div>
												</div>
								</div> : null}
					  		</div>
					  </section>
				</div>
			</div>
		)
	}
}

