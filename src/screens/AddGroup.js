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

class AddGroup extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	teacherId: this.props.location.state === undefined ? 'DEFAULT' : (this.props.location.state.course !== undefined ? this.props.location.state.course.teacherId : 'DEFAULT'),
      	code:this.props.location.state === undefined ? '' : (this.props.location.state.course !== undefined ? this.props.location.state.course.code : ''),
      	name:this.props.location.state === undefined ? '' : (this.props.location.state.course !== undefined ? this.props.location.state.course.name : ''),
      	additionalStyle:{
      		display: 'none', 
      		paddingRight: '0px'
      	},
      	isLoaded:false,
      	typeclass:'',
      	msg:'',
      	showAlert:false,
      	hash:false

	  };

	  this.showing = false;
	  this.isMounted_ = false;
	}

	componentDidMount(){
		this.LoadTeachers();
		if(this.state.code === undefined || this.state.code === null || this.state.code === ''){
			this.GenerateCode(6);
		}
		
		if(this.state.teacherId == 'DEFAULT'){
			if(JSON.parse(sessionStorage.getItem('duct'))[0].r_rol_id.substring(12,13) == 2){
				this.setState({teacherId:JSON.parse(sessionStorage.getItem('duct'))[0].us,hash:true});
				console.log('si');
			}
		}else{
			console.log('no');
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

	LoadTeachers(){
		this.isMounted_ = true;
		if(this.isMounted_){
			this.setState({isLoaded:true});
		}
		services.requestGet(routes.teachers.list)
	    .then(res => {
	      if(this.isMounted_){
	      	 this.props.LoadTeachers(res);
	      	 //console.log(res);
	      }
	    },
	    (error) => {
	      if(this.isMounted_){
	      	this.setState({
	          isLoaded: false
	      	});
	      	this.isMounted_ = false;
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
		return (this.props.location.state === undefined ? false : this.props.location.state.course !== undefined ? true : false)
	}

	saveData(data){
		this.setState({isLoaded:true});
		let url = this.validateAction() ? routes.groups.update : routes.groups.add;
		services.requestSet(url,data)
    	.then(res => {
			console.log(res + url);
		  	if(res !== "failed"){
		  		let text = this.validateAction() ? 'actualizado este' : 'crear este nuevo';
		  		this.setState({showAlert:true,msg:'Felicidades ha '+text+' grupo correctamente',typeclass:'alert-success'});
		  	}else{
		  		let text = this.validateAction() ? 'actualizado este' : 'crear este nuevo';
		  		this.setState({showAlert:true,msg:'Upps! Ah ocurrido un problema al intentar '+text+' grupo, vuelva a intentarlo luego para poder crear un nuevo grupo',typeclass:'alert-danger'});
		  	}
	    },
		(error) => {
		  this.setState({
		  	showAlert:true,
		  	msg:'Upps! Al parecer no tienes conexion a internet, vuelva a intentarlo luego para poder crear un nuevo grupo',
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
		const { name, code, teacherId, hash } = this.state;
		if((teacherId === '' || teacherId === 'DEFAULT' || teacherId === '0' || teacherId === 0) && code === '' && name === ''){
			this.setState({showAlert:true,msg:'Por favor complete todos los campos para guardar el grupo'});
		}else if((teacherId === '' || teacherId === 'DEFAULT' || teacherId === '0' || teacherId === 0)){
			this.setState({showAlert:true,msg:'Seleccione un profesor para poder crear un nuevo grupo',typeclass:'alert-danger'});
		}else if(name === ''){
			this.setState({showAlert:true,msg:'Ingrese un nombre para el grupo para poder crear un nuevo grupo',typeclass:'alert-danger'});
		}else{

			let data = this.validateAction() ? JSON.stringify({name:name,code:code,teacherId:teacherId,Id:this.props.location.state.course.id,hash:''}) : JSON.stringify({name:name,code:code,teacherId:teacherId,hash:hash});
			this.saveData(data);
		}
	}
	//g_groups_ibfk_1 - c_courses_ibfk_1
	render(){
		const { name, code, typeclass, msg, showAlert, isLoaded, teacherId } = this.state;
		return(
			<div>
				<Header currentSection="grupos"/>
				<div className="container-fluid mt-3 col-md-9">
					  <section className="content">
					  		<div className="card">
						  		<div className="card-header">
									<h5>Agrega un nuevo Grupo</h5>
								</div>
								<div className="card-body">
								  {showAlert ? <div className={'alert '+typeclass} role="alert">{msg}</div> : null}
								  <form>
										{
										 (JSON.parse(sessionStorage.getItem('duct'))[0].r_rol_id.substring(12,13) == 4 || JSON.parse(sessionStorage.getItem('duct'))[0].r_rol_id.substring(12,13) == 1) ?
										 <div className="form-group">
											  <label htmlFor="exampleInputEmail1">Profesores</label>
											  <select className="custom-select" id="inputGroupSelect01" defaultValue={teacherId} onChange={(id) => this.setState({teacherId:id.target.value})}>
											    <option value="DEFAULT">Selecciona un Profesor</option>
											    {this.props.groups.teachers.map((item, index) => {
											    	return(
											    		<option value={item.us_user_information_id} key={index+1}>{item.us_name + ' ' + item.l_lastnames}</option>
											    	)
											    })}
											  </select>
										 </div> : null 
										}
										<div className="form-group">
										  <label htmlFor="exampleInputEmail1">Codigo</label>
										  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar codigo" readOnly value={code}/>
										  <small id="emailHelp" className="form-text text-muted">El codigo puede ser alfanumerico Ej e5dsr.</small>
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputPassword1">Nombre del grupo</label>
											<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Ej Codelines" value={name} onChange={(event) => this.setState({name:event.target.value})}/>
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

export default connect( mapStateToProps , mapDispatchToProps )(AddGroup)

