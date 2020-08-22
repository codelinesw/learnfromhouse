import React from 'react';
import {
 Redirect,
 Link
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

class AddEvaluation extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	taskId: this.props.location.state === undefined ? '0' : (this.props.location.state.task !== undefined ? this.props.location.state.task.taskId : '0'),
	  	courseId: this.props.location.state === undefined ? '0' : (this.props.location.state.task !== undefined ? this.props.location.state.task.courseId : '0'),
      	title:this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? '' : 's'),
      	description:this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? '' : ''),
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
      	nameFile:'Selecciona un archivo',
      	showOtherOptions:false,
      	timelimit:'5',
      	showresult:false,
      	randomquestions:false,
      	active:true

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
		let url = (this.state.action !== "ADD") ? routes.evaluation.update : routes.evaluation.add;
		let id_ = 0;
		services.requestUpload(url,data)
    	.then(res => {
			let response = res.split('-');

		  	if(response[0] !== "failed"){
		  		let text = (this.state.action !== "ADD") ? 'actualizado esta' : 'crear esta nueva';
		  		id_ = response[1];
		  		console.log(id_);
		  		this.setState({showAlert:true,msg:'Felicidades ha '+text+' evaluacion correctamente',typeclass:'alert-success'});
		  		this.props.history.push(`/evaluation/${id_}/addquestions/`);
		  	}else{
		  		let text = (this.state.action !== "ADD") ? 'actualizado esta' : 'crear esta nueva';
		  		this.setState({showAlert:true,msg:'Upps! Ah ocurrido un problema al intentar '+text+' evaluacion, vuelva a intentarlo mas tarde',typeclass:'alert-danger'});
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
	validateForm(ev){
		ev.preventDefault();
		const { title, description, timelimit , showresult, randomquestions, startdate, enddate } = this.state;
		const { match } = this.props;
		console.log('hello');
		if(startdate.length == 0 && enddate.length == 0){
			this.setState({showAlert:true,msg:'Por favor seleccione una fecha de inicio y de fin para la evaluacion',typeclass:'alert-danger'});
		}else if(startdate.length == 0){
			this.setState({showAlert:true,msg:'Por favor seleccione una fecha de inicio para la evaluacion',typeclass:'alert-danger'});
		}else if(enddate.length == 0){
			this.setState({showAlert:true,msg:'Por favor seleccione una fecha de fin para la evaluacion',typeclass:'alert-danger'});
		}else{
			this.setState({showAlert:false,msg:'',typeclass:'',showOtherOptions:true});
			let data = JSON.stringify({
				title:title,
				description:description,
				time:timelimit,
				showresult:showresult,
				randomq:randomquestions,
				startdate:startdate,
				enddate:enddate,
				courseId: match.params ? (match.params.course) ? match.params.course : '0' : '0'
			});
			this.saveData(data);
		}
	}

	showOtherOptions(ev){
		ev.preventDefault();
		const { title, description, timelimit } = this.state;
		if(title.length == 0 && description.length == 0 && timelimit.length == 0){
			this.setState({showAlert:true,msg:'Por favor complete todos los campos para continuar',typeclass:'alert-danger'});
		}else if(title.length == 0){
			this.setState({showAlert:true,msg:'Por favor ingrese el titulo de la evaluacion',typeclass:'alert-danger'});
		}else if(description.length == 0){
			this.setState({showAlert:true,msg:'Por favor ingrese la descripccion de la evaluacion',typeclass:'alert-danger'});
		}else if(timelimit.length == 0 || timelimit == ''){
			this.setState({showAlert:true,msg:'Por favor ingrese el tiempo de duracion para la evaluacion',typeclass:'alert-danger'});
		}else{
			document.querySelector('.btn-new').disabled = false;
			document.querySelector('.btn-new').classList.remove('btn-disabled');
			this.setState({showAlert:false,msg:'',typeclass:'',showOtherOptions:true,active:false});
		}
		
	}

	goBack(){
		this.setState({showOtherOptions:false});
	}
	//g_groups_ibfk_1 - c_courses_ibfk_1
	render(){
		const { teacherId, courseId, title, description, startdate,enddate, typeclass, msg, showAlert, isLoaded, showOtherOptions, timelimit,randomquestions, showresult,active } = this.state;
		return(
			<div>
				<Header currentSection="cursos"/>
				<div className="container-fluid mt-3 col-md-11">
					  <section className="content w-100">
					  		<div className="col d-flex w-100">
					  		 <div className="col col-md-3">
					  		 	<div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
								      <Link className="nav-link active" id="v-pills-home-tab" data-toggle="pill" to="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Detalles del examen</Link>
								      <Link className="nav-link disabled" id="v-pills-profile-tab" data-toggle="pill" to="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Pregunta #1</Link>								      
								      <button type="button" className="nav-link btn btn-outline-primary mb-2 btn-disabled">Agregar pregunta<i className="fas fa-plus ml-2"></i></button>
								      <button type="button" className="nav-link btn btn-primary btn-disabled btn-new" onClick={(event) => this.validateForm(event)} disabled={active}>Guardar Cambios</button>
    							 </div>
					  		 </div>
					  		 <div className="col">
					  		 						  		<div className="card mb-5">
						  		<div className="card-header">
									<h5>Agrega una nueva evaluacion</h5>
								</div>
								<div className="card-body">
								  {showAlert ? <div className={'alert '+typeclass} role="alert">{msg}</div> : null}
								  <form>
										{showOtherOptions ?
											<div>
												<div className="form-group mb-2 d-flex">
													<div class="input-check mr-2">
      													<input type="checkbox" aria-label="Checkbox for following text input" className="checkbox_" id="showresult" value={showresult} onChange={(ev) => this.setState({showresult:ev.target.checked})}/>
      													<label htmlFor="showresult" className="lcheckbox bg_primary"><i class="fas fa-check"></i></label>
    												</div>
    												<label htmlFor="result">Mostrar resultados al estudiante al terminar</label>
												</div>
												<div className="form-group mb-2 d-flex">
													<div class="input-check mr-2">
      													<input type="checkbox" aria-label="Checkbox for following text input" className="checkbox_" id="randomquestions" value={randomquestions} onChange={(ev) => this.setState({randomquestions:ev.target.checked})}/>
      													<label htmlFor="randomquestions" className="lcheckbox bg_primary"><i class="fas fa-check"></i></label>
    												</div>
    												<label htmlFor="result">Preguntar aleatoriamente</label>
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
													<button type="button" className="btn btn-secondary mr-2" data-dismiss="modal" onClick={(ev) =>this.goBack(ev)}>Anterior</button>
												</div>
											</div> : <div>
												<div className="form-group">
											<label htmlFor="exampleInputTitle">Titulo</label>
											<input type="text" className="form-control" id="exampleInputTitle" placeholder="Ej Cual es el nombre del personaje que protagoniza iron-man" value={title} onChange={(event) => this.setState({title:event.target.value})}/>
										</div>
										<div className="form-group">
										  <label htmlFor="exampleInputDescription">Descripcion</label>
										  <textarea className="form-control" id="exampleInputDescription" rows="3" placeholder="Instructivo de la evaluacion Maximo 455 Caracteres" value={description} onChange={(text) => this.setState({description:text.target.value})}></textarea>
										</div>
										<div className="form-group">
										  <label htmlFor="exampleInputTime">Tiempo Limite</label>
										  <div className="input-group">
										  	<input type="number" className="form-control" id="exampleInputTime" min="5" max="120" value={timelimit} onChange={(ev) => this.setState({timelimit:ev.target.value})}/>
										  	<div className="input-group-append">
											   <span className="input-group-text" id="basic-addon2">Minutos</span>
											</div>
										  </div>
										</div>
										<div className="input-group">
											<button type="button" className="btn btn-secondary mr-2" data-dismiss="modal" onClick={() =>this.hideModal()}>Cancelar</button>
						        			<button type="button" className="btn btn-primary" onClick={(event) => this.showOtherOptions(event)}>Siguiente</button>
										</div>
										</div>
										}
								  </form>
								</div>
								{isLoaded ? <div className="container_circle_preloader">
			               <div className="child_container_">
			                 <div className="circle"><div className="child"></div></div>
			               </div>
			         </div> : null}
					  		</div>
					  		 </div>
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

export default connect( mapStateToProps , mapDispatchToProps )(AddEvaluation)
