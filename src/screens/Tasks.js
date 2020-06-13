import React from 'react';
import {
 Link,
 Redirect
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import SideBar from '../components/SideBar';
import Swal from 'sweetalert2';
import routes from '../request/routes';
import services from '../request/services';
import { connect } from 'react-redux';
import {
  addTasks,
  DeleteTask
} from '../actions'
class Tasks extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:'',
      	password:'',
      	courseId: this.props.location.state === undefined ? '0' : (this.props.location.state.course !== undefined ? this.props.location.state.course.courseId : '0'),
      	isLoaded:false,
      	t_name:'',
      	taskId:'0',
      	indexTask:'0'
	  };

	  this.isMounted_ = false;
	}
	componentDidMount(){
		document.body.style.backgroundColor = '#f3f3f3';
		this.LoadTasks();
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

	BadgeText(date){
		let currentDate = new Date();
		let result =  parseInt(String(new Date().getDate()).padStart(2, '0')) - parseInt(String(new Date(date).getDate()).padStart(2, '0'));
		result = String(result).replace(/\-/g,'');
		result = parseInt(result);
		if(result <= 4 && result > 0){
			return "Pronto a caducar#badge-warning";
		}else if(result >= 5){
			return "Nuevo#badge-info ";
		}else{
			
			if(result == 0){
				return "Cacudaca#badge-danger";
			}
		}

		

	}

	getFormatTimeStamp(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('/');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[2]+"-"+(newdate[1] < 10 ? "0"+newdate[1] : newdate[1])+"-"+(newdate[0] < 10 ? "0"+newdate[0] : newdate[0])+seconds;
    	return formatdate;
	}

	getDate(date){
		console.log(date);
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

	_renderItems_(item,index){

		if(item === "" || item === "undefined" || item === null || item === undefined){
			return <p key={index+1}>No hay tareas creadas aun</p>;
		}else{
			if(Object.values(item)[0] === "empty"){

			}else{
				return(
					<tr key={index+1}>
						<th scope="row">{index+1}</th>
						<td className={{fontsize:'12px'}}><Link to="/viewtask/" className="text-dark">{item.t_name.length > 50 ? item.t_name.substring(0,50)+'...' : item.t_name}</Link></td>
						<td className={{fontsize:'12px'}}>{this.getDate(item.startdate)}</td>
						<td className={{fontsize:'12px'}}>{this.getDate(item.enddate)}</td>
						<td className={{fontsize:'12px'}}>
							<div className="input-group" role="group" aria-label="Basic example">
								<Link to={{
							           	pathname:'/addtask/'+this.props.location.state.course.c_name.replace(/\s/g,'-')+'/',
							           	state:{
							           	action:'UPDATE',
							           	task:{taskId:item.t_tasks_id,
							           	  courseId:item.c_course_id,
							           	  name:item.t_name,
							           	  description:item.description,
							           	  file_one:item.file_one,
							           	  startdate:this.getDateToInput(item.startdate),
							           	  enddate:this.getDateToInput(item.enddate)
							           }
							        }
							    }} className="btn btn-warning mr-3">Editar</Link>
								<button type="button" className="btn btn-danger" onClick={(ev) => this.deleteData(index,item.t_tasks_id,'#modalQuestionForTask')}>Eliminar</button>
							</div>
						</td>
					</tr>
				);
			}
		}
	}

	LoadTasks(){
		this.isMounted_ = true;
    	if(this.isMounted_){
    		this.setState({isLoaded:true});
    	}
    	let id = (sessionStorage.getItem('duct') ===  undefined || sessionStorage.getItem('duct') === null || sessionStorage.getItem('duct') === "undefined") ? 0 : JSON.parse(sessionStorage.getItem('duct'))[0].t_teacher_id;
    	let data = JSON.stringify({c_course_id:this.state.courseId});
    	services.requestGet(routes.tasks.listId,data)
    	.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
						this.props.addTasks(res);
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
   	let currentData = this.props.tasks.tasks;
	  this.setState({
	  	taskId:id,
	  	indexTask:index,
	  	t_name:currentData[index].t_name
	  });
	  console.log(currentData[index].t_name);
   	  this.showingModal(idElement);
   }

   delete(){
   		const { indexTask , taskId } = this.state;
   		
	   	if(taskId === '0'){
	   		console.log('undefined id data');
	   	}else{
	   		let data_ = JSON.stringify({tasks_id:taskId});
	   		this.isMounted_ = true;
	   		this.setState({isLoaded:true});
	   		services.requestSet(routes.tasks.delete,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		this.hideModal('#modalQuestionForTask');
			      		Swal.fire(
						  'Buen trabajo!',
						  'La tarea se ha Eliminado correctamente!',
						  'success'
						);
						
						this.props.DeleteTask(indexTask);
						
						
			      	}
			      }
			    },
		    (error) => {
		      this.setState({
		        isLoaded: false,
		        error
		      });
		    }).finally(() => {

		      this.setState({isLoaded:false});
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

	render(){
		const {  isLoaded, t_name  } = this.state;
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
									<SideBar state_={this.props.location.state} current="Tasks" path={{one:'/viewcourse/',two:'/tasks/',three:'/members/'}} />
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
										<h5 className="card-title">Listado de tareas</h5>
										<Link to={{
											pathname:"/addtask",
											state: {
												action:'ADD',
												task:{
													courseId:this.state.courseId,
													name:'',
													description:'',
													file_one:'',
													startdate:'',
													enddate:'',
													taskId:'0'
												}
											}}
										} className="btn btn-secondary">Nueva tarea</Link>
									</div>
									<div className="card-body p-3">
										<table className="table">
									  <thead>
									    <tr>
									      <th scope="col">#</th>
									      <th scope="col">Tarea</th>
									      <th scope="col">Fecha de Inicio</th>
									      <th scope="col">Fecha limite</th>
									      <th scope="col">Acciones</th>
									    </tr>
									  </thead>
									  <tbody>
									  	{this.props.tasks.tasks.map((item,index) =>{
											return this._renderItems_(item,index);
										})}
									  </tbody>
									</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade"  role="dialog" id="#modalQuestionForTask" style={{display: 'none', paddingRight: '0px'}}>
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title">Eliminar Tarea</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						        <p>¿Se encuentra seguro/a  de eliminar la tarea <b>{t_name}</b> ?.</p>
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
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  addTasks,
  DeleteTask
};

export default connect( mapStateToProps , mapDispatchToProps )(Tasks)