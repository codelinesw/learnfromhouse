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

export default class ViewTask extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	courseId:this.props.location === undefined || this.props.location === '' || this.props.location === null ? '0' : (this.props.location.state === undefined || this.props.location.state === '' || this.props.location.state === null) ? '0' : this.props.location.state.task.courseId,
	  	title:this.props.location === undefined || this.props.location === '' || this.props.location === null ? 'Esta titutlo de esta tarea no esta disponible' : (this.props.location.state === undefined || this.props.location.state === '' || this.props.location.state === null) ? 'Esta titulo de esta tarea no esta disponible' : this.props.location.state.task.name,
	  	description:this.props.location === undefined || this.props.location === '' || this.props.location === null ? 'La descripcion no esta disponible' : (this.props.location.state === undefined || this.props.location.state === '' || this.props.location.state === null) ? 'La descripcion no esta disponible' : this.props.location.state.task.description,
	  	file:this.props.location === undefined || this.props.location === '' || this.props.location === null ? '0' : (this.props.location.state === undefined || this.props.location.state === '' || this.props.location.state === null) ? '0' : this.props.location.state.task.file,
	  	taskId: this.props.match === undefined || this.props.match === '' || this.props.match === null ? '0' :(this.props.match.params === undefined || this.props.match.params === null || this.props.match.params === '') ? '0' : this.props.match.params.task,
	  	info:[''],
	  	rol:'0',
	  	isLoaded:false,
	  	title_:'',
	  	file_:'',
	  	SolutionIndex:'0',
	  	SolutionId:'0'
	  };

	  this.isMounted_ = false;
	}

	componentDidMount(){
		
		this.loadCurrentTask();
		
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

	SaveData(){
		const { title_, file_ } = this.state;
		if(title_ === '' || file_ === ''){

		}else if(title_ === ''){

		}else if(file_ === ''){

		}else{
			const { title_, file_ , taskId } = this.state;
			let storage = sessionStorage.getItem('duct');
			let studentId = (storage === undefined || storage === '' || storage === null) ? undefined : (this.IsJsonString(storage)) ? JSON.parse(storage) : undefined;
			studentId = (studentId === undefined || studentId === '' || studentId === null) ? '0' : (studentId[0] === undefined || studentId[0] === '' || studentId[0] === null) ? '0' : (studentId[0].us === undefined || studentId[0].us === '' || studentId[0].us === null) ? '0' : studentId[0].us;
			let name_ = (storage === undefined || storage === '' || storage === null) ? undefined : (this.IsJsonString(storage)) ? JSON.parse(storage) : undefined;
			name_ = (name_ === undefined || name_ === '' || name_ === null) ? '0' : (name_[0] === undefined || name_[0] === '' || name_[0] === null) ? '0' : (name_[0].us === undefined || name_[0].us === '' || name_[0].us === null) ? '0' : name_[0].us_name;
			let uploadData = new FormData();
			uploadData.append('taskId',taskId);
			uploadData.append('studentId',studentId);
			uploadData.append('title',title_);
			uploadData.append('file',file_);
			this.isMounted_ = true;
			if(this.isMounted_){
				this.setState({isLoaded:true});
			}
			services.requestSet(routes.homeworksolution.add,uploadData)
    		.then(res => {
			      if(this.isMounted_){
			      	let res_ = res.split('&');
			      	console.log(res_);
			      	if(res_[0] !== 'failed'){
			      		document.getElementById('ModalfromAddTask').className = 'modal fade';
				 		document.getElementById('ModalfromAddTask').style = "display: none; padding-right: 0px;";
			      		Swal.fire(
						  'Buen trabajo!',
						  'La tarea se ha subido correctamente!',
						  'success'
						);
			      		let date = this.getFormatDate(new Date());
			      		let data_ = {us_name:name_,title:title_,file:res_[1],note:'0.0',status:"NR",upload_date:date,updated:date};
			      		let newdata = [''];
			      		if(this.state.info.length >= 1){
			      			if(this.state.info[0].response === undefined){
			      				newdata = this.state.info;
			      				newdata.push(data_);
			      			}else{
			      				newdata.slice(0,1);
			      				newdata.push(data_);
			      			}
			      		}
			      		this.setState({info:newdata});
			      		//Solucion del taller #1
			      	}else{
			      		document.getElementById('ModalfromAddTask').className = 'modal fade';
				 		document.getElementById('ModalfromAddTask').style = "display: none; padding-right: 0px;";
			      		Swal.fire(
						  'Upps!',
						  'Ha ocurrido un probla al intentar subir la tarea!',
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

	deleteData(index,id,element){
		this.showingModal(element);
		console.log(index + ' - ' + id);
		this.setState({SolutionIndex:index,SolutionId:id});
	}

	delete(){
   		const { SolutionIndex , SolutionId } = this.state;
   		
	   	if(SolutionId  === '0'){
	   		console.log('undefined id data');
	   	}else{
	   		let data_ = JSON.stringify({solutionId:SolutionId});
	   		//console.log('i am here');
	   		this.isMounted_ = true;
	   		this.setState({isLoaded:true});
	   		services.requestSet(routes.homeworksolution.delete,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		this.hideModal('#modalQuestionForSolution');
			      		Swal.fire(
						  'Buen trabajo!',
						  'La institucion se ha Eliminado correctamente!',
						  'success'
						);
						let _data_ = this.state.info;
						_data_.splice(SolutionIndex,1);
						if(_data_.length > 1 || _data_.length == 0){
							_data_.push({response:'empty'});
						}
						console.log(_data_);
						this.setState({info:_data_});
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

		       //ADD THIS THROW error
		       throw error;
		     });
	   	}
   }

   getFile(route){
   	let newroute = (route !== undefined || route !== null) ? route.split('/') : '';
   	if(newroute !== ''){
   		return newroute[5];
   	}else{
   		return route;
   	}
   }
	_renderItems_(item,index){
		const { rol, title } = this.state;
		if(item === '' || item === undefined || item === null){
			return(<tr key={index+1}><td></td><td></td><td>cargando...</td><td></td><td></td></tr>);
		}else{
			if(Object.values(item)[0] === "empty"){
				return(<tr key={index+1}><th scope="row"></th><td></td><td>No han subido soluciones para esta tarea</td><td></td><td></td><td></td></tr>);
			}else{
				return(
					<tr key={index+1}>
						<th scope="row">{index+1}</th>
						<td className="font-weight-light">{item.us_name}</td>
						<td className="font-weight-light"><Link to="#" data-file={item.file == '' ? '#' : item.file} download onClick={(ev) => this.downloadFile(ev)}>{item.title}</Link></td>
						<td className="font-weight-light">{this.getDate(item.upload_date)}</td>
						<td className="font-weight-light"><span className="badge badge-primary p-2">{item.status == "NR" ? 'Sin revisar' : item.note}</span></td>
						<td className="font-weight-light">
							<div className="input-group">
								<div className="input-button">
									<a href={item.file == '' ? '#' : `http://localhost:8089${item.file}`} download className="btn btn-info mr-2 p-2 btntooltip" data-file={item.file == '' ? '#' : item.file} style={{height:'30px'}} data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
										<i className="far fa-eye" style={{position: 'relative',top:'-5px'}}></i>
									</a>
									<span className="tooltip_">Ver tarea</span>
								</div>
								<div className="input-button">
									<button type="button" className="btn btn-danger p-2" style={{height:'30px'}} download onClick={(ev) => this.deleteData(index,item.h_homework_solution_id,'#modalQuestionForSolution')}>
										<i className="fas fa-times" style={{position: 'relative',top:'-7px',padding:'4px'}}></i>
									</button>
									<span className="tooltip_" style={{width:'105px'}}>Eliminar tarea</span>
								</div>
								{rol == 1 || rol == 2 || rol == 4 ? <div className="input-button">
									<Link to={{
										pathname:`/task/${item.h_homework_solution_id}/addevaluation/`,
										state:{task:{file:this.getFile(item.file),title:title}}
									}} className="btn ml-2 btn-success p-2" style={{height:'30px'}}>
										<i className="fas fa-pen" style={{position: 'relative',top:'-5px'}}></i>
									</Link>
									<span className="tooltip_" style={{width:'92px'}}>Calificar</span>
								</div> : null }
							</div>
						</td>
					</tr>
				);
			}
		}
	}

	render(){
		const { match, location } = this.props;
		const { info, title, description , file, rol, isLoaded, title_,file_ } = this.state;
		let data = (location.state === undefined) ? {task:{description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}} :  location.state;
		return(
			<div>
				<Header currentSection="cursos"/>
				<div className="container-fluid mt-3">
					<div className="row">
						    <div className="col">
							      <nav aria-label="breadcrumb">
									  <ol className="breadcrumb w-100">
									    <li className="breadcrumb-item"><Link to="#">Matematicas</Link></li>
									    <li className="breadcrumb-item"><Link to="/tasks">Tareas</Link></li>
									    <li className="breadcrumb-item active" aria-current="page">Tarea de biomateriales para sanacion de las plaquetas</li>
									  </ol>
								   </nav>
						    </div>
					  </div>
					  <section className="content">
					  		<div className="column col-md-9 ml-0">
								<h4>{title}</h4>
					  			<h6 className="font-weight-normal ">Descripcion</h6>
					  			<p className="text-break font-weight-light ">{description}</p>
					  		</div>
					  </section>
					  <section className="content">
					  		<div className="card">
						  		<div className="card-header">
									<h5>{rol == 4 || rol == 2 || rol == 1 ? 'Documentos subidos por los estudiantes' : 'Mis Documentos subidos'}</h5>
									{rol == 4 || rol == 2 || rol == 1 ? null : <button type="button" className="btn btn-primary" onClick={() => this.showingModal('ModalfromAddTask')}>Subir mi tarea</button>}
								</div>
								<div className="card-body">
									<table className="table table-bordered">
										  <thead>
										    <tr>
										      <th scope="col" style={{fontSize:'14px'}}>#</th>
										      <th scope="col" style={{fontSize:'14px'}}>Estudiante</th>
										      <th scope="col" style={{fontSize:'14px'}}>Titulo del documento</th>
										      <th scope="col" style={{fontSize:'14px'}}>Fecha de subida</th>
								      		  <th scope="col" style={{fontSize:'14px'}}>Nota</th>
										      <th scope="col" style={{fontSize:'14px'}}>Opciones</th>
										    </tr>
										  </thead>
										  <tbody>
										      {this.state.info.map( ( item , index) => {
										      	return this._renderItems_(item,index);
										      })}										      
										  </tbody>
									</table>
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
				<div className="modal fade" id="ModalfromAddTask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLabel">Agregar Tarea</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(ev) => this.hideModal('ModalfromAddTask')}>
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        <form>
							<div className="form-group">
								<label htmlFor="exampleInpuTitle">Título</label>
								<input type="email" className="form-control" id="exampleInpuTitle" aria-describedby="emailHelp" placeholder="Ingresar un nombre para el documento" value={title_ !== undefined ? title_ : '' } onChange={(title) => this.setState({title_:title.target.value})}/>
								<small id="emailHelp" className="form-text text-muted">El título puede ser cualquier Ej: Solucion taller #3</small>
							</div>
							<div className="form-group">
							    <label htmlFor="exampleInputEmail1">Cargar Archivo</label>
								<div className="input-group">								  
								  <div className="custom-file">
								    <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={(file) => {this.setState({file_:file.target.files[0]})}}/>
								    <label className="custom-file-label" htmlFor="inputGroupFile04">Escoje un documento</label>
								  </div>
								</div>
							</div>
						</form>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={(ev) => this.hideModal('ModalfromAddTask')}>Cancelar</button>
				        <button type="button" className="btn btn-primary" onClick={(ev) => this.SaveData()}>Guardar Cambios</button>
				      </div>

				    </div>
				  </div>
				  {isLoaded ? <div className="container_circle_preloader">
			               <div className="child_container_">
			                 <div className="circle w80"><div className="child w80"></div></div>
			               </div>
			         </div> : null}
				</div>
				<div className="modal fade"  role="dialog" id="#modalQuestionForSolution" style={{display: 'none', paddingRight: '0px'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
						    <div className="modal-header">
						       <h5 className="modal-title">Eliminar Instituccion</h5>
						       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						         <span aria-hidden="true">&times;</span>
						       </button>
						     </div>
						     <div className="modal-body">
						       <p>¿Se encuentra seguro/a  de eliminar este documento?.</p>
						     </div>
						     <div className="modal-footer">
						       <button type="button" className="btn btn-primary" onClick={() => this.delete()}>Aceptar</button>
						       <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() =>this.hideModal('#modalQuestionForSolution')}>Cancelar</button>
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

