import React from 'react';
import {
 Redirect
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import { connect } from 'react-redux';
import routes from '../request/routes';
import services from '../request/services';
import {
  addInstitution,
  addSpecialties
} from '../actions'

class AddUsers extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	institutionId: this.props.location.state === undefined ? 'DEFAULT' : (this.props.location.state.teacher !== undefined ? this.props.location.state.teacher.institutionId : 'DEFAULT'),
      	code:this.props.location.state === undefined ? '' : (this.props.location.state.teacher !== undefined ? this.props.location.state.teacher.code : ''),
      	name:this.props.location.state === undefined ? '' : (this.props.location.state.teacher !== undefined ? this.props.location.state.teacher.name : ''),
      	lastnames:this.props.location.state === undefined ? '' : (this.props.location.state.teacher !== undefined ? this.props.location.state.teacher.lastnames : ''),
      	user:this.props.location.state === undefined ? '' : (this.props.location.state.teacher !== undefined ? this.props.location.state.teacher.user : ''),
      	password:'',
      	specialties:this.props.location.state === undefined ? '' : (this.props.location.state.teacher !== undefined ? this.props.location.state.teacher.specialty : ''),
      	additionalStyle:{
      		display: 'none', 
      		paddingRight: '0px'
      	},
      	isLoaded:false,
      	typeclass:'',
      	msg:'',
      	showAlert:false,
      	showOtherFields:false,
      	userId:'0',
      	role:'0',
      	type: this.props.location.state === undefined ? 'profesor' : (this.props.location.state.create == undefined) ? 'profesor' :  this.props.location.state.create
	  };

	  this.showing = false;
	  this.isMounted_ = false;
	  this._isMounted_ = false;
	}

	componentDidMount(){
		this.LoadInstitutions();
		this.LoadSpecialties();
		console.log(this.props.location.state);
	}

	loadFieldData(){
		if(this.props.location.state !== undefined){
			if(this.props.location.state.teacher !== undefined){
				this.setState({
					institutionId: this.props.location.state.teacher.institutionId,
      				specialties: this.props.location.state.teacher.specialty,
				});
			}
		}

	}

	componentWillUnmount(){
		this.isMounted_ = false;
		this._isMounted_ = false;
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

	LoadInstitutions(){
		this.isMounted_ = true;
		if(this.isMounted_){
			this.setState({isLoaded:true});
		}
		services.requestGet(routes.institutions.list)
	    .then(res => {
	      if(this.isMounted_){
	      	this.props.addInstitution(res);
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

	LoadSpecialties(){
	  this._isMounted_ = true;
	  if(this._isMounted_){
		this.setState({isLoaded:true});
	   }
	   services.requestGet(routes.specialties.list)
	   .then(res => {
	   	 console.log(this._isMounted_);
	     if(this._isMounted_){
	      	this.props.addSpecialties(res);
	     }
	   },
	   (error) => {
	     if(this._isMounted_){
	      this.setState({
	         isLoaded: false
	      });
	      this._isMounted_ = false;
	    }
	   }).finally(() => {
	      if(this._isMounted_){
	      	let specialty_id = this.props.teachers.specialties.filter((obj) => obj.s_specialty_id === this.state.specialties);
	      	this.setState({isLoaded:false,specialties:specialty_id});
	      	this._isMounted_ = false;
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
		return res !== null ? true : false;
	}

	validateAction(){
		return (this.props.location.state === undefined ? false : this.props.location.state.action !== "ADD" ? true : false)
	}

	saveData(url,data){
		this.setState({isLoaded:true});
		//let url = this.validateAction() ? routes.teachers.update : routes.teachers.add;
		services.requestSet(url,data)
    	.then(res => {
			let res_ = res.split('-');
			console.log(res);
		  	if(res_[0] !== "failed"){
		  		let text = this.validateAction() ? 'actualizado este' : 'creado este nuevo';
		  		this.setState({showAlert:true,msg:'Felicidades ha '+text+' usuario correctamente',typeclass:'alert-success',showOtherFields:true,userId:res_[1]});
		  	}else{
		  		let text = this.validateAction() ? 'actualizado este' : 'crear este nuevo';
		  		this.setState({showAlert:true,msg:'Upps! Ah ocurrido un problema al intentar '+text+' usuario, vuelva a intentarlo mas tarde',typeclass:'alert-danger'});
		  	}
	    },
		(error) => {
		  this.setState({
		  	showAlert:true,
		  	msg:'Upps! Al parecer no tienes conexion a internet, vuelva a intentarlo luego para poder crear un nuevo usuario',
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
		const { institutionId, code, name, lastnames, userId } = this.state;
		if(code === '' && name === '' && lastnames === ''){
			this.setState({showAlert:true,msg:'Por favor complete todos los campos para guardar la complementar la informacion del usuario'});
		}else if(code === ''){
			this.setState({showAlert:true,msg:'Ingrese un codigo o identificacion del maestro ',typeclass:'alert-danger'});
		}else if(name === ''){
			this.setState({showAlert:true,msg:'Ingrese un nombre para el usuario ',typeclass:'alert-danger'});
		}else if(lastnames === ''){
			this.setState({showAlert:true,msg:'Ingrese un apellido para el usuario ',typeclass:'alert-danger'});
		}else{
			let data = this.validateAction() ? JSON.stringify({credential_id:userId,name:name,lastnames:lastnames,id:this.props.location.state.user.id}) : JSON.stringify({credential_id:userId,code:code,name:name,lastnames:lastnames});
			this.saveData(routes.teachers.add,data);
		}
	}

	validateFirstFrom(ev){
		ev.preventDefault();
		const { institutionId, user, password,role } = this.state;
		if((institutionId.trim() === '' || institutionId.trim() === 'DEFAULT' || institutionId.trim() === '0' || parseInt(institutionId.trim()) === 0) && user.trim() === '' && password.trim() === ''){
			this.setState({showAlert:true,msg:'Por favor complete todos los campos para guardar el maestro'});
		}else if((institutionId.trim() === '' || institutionId.trim() === 'DEFAULT' || institutionId.trim() === '0' || parseInt(institutionId.trim()) === 0)){
			this.setState({showAlert:true,msg:'Seleccione una institucion para poder crear un nuevo maestro',typeclass:'alert-danger'});
		}else if(user.trim() === ''){
			this.setState({showAlert:true,msg:'Ingrese un usuario o identificacion del usuario',typeclass:'alert-danger'});
		}else if(password.trim() === ''){
			this.setState({showAlert:true,msg:'Ingrese una contrasenia para el usuario ',typeclass:'alert-danger'});
		}else{
			this.setState({showAlert:false,typeclass:''});
			let data = this.validateAction() ? JSON.stringify({institution_id:institutionId,user:user,password:password,id:this.props.location.state.user.id,role:role}) : JSON.stringify({institution_id:institutionId,user:user,password:password,role:role});
			this.saveData(routes.teachers.addCredentials,data);
		}

	}
	//g_groups_ibfk_1 - c_courses_ibfk_1
	render(){
		const {  name, lastnames, code, user, password , typeclass, msg, showAlert, isLoaded, institutionId, showOtherFields, type, role } = this.state;
		return(
			<div>
				<Header currentSection="teachers"/>
				<div className="container-fluid mt-3 col-md-9">
					  <section className="content">
					  		<div className="card">
						  		<div className="card-header">
									<h5>Agrega un nuevo usuario</h5>
								</div>
								<div className="card-body">
								  {showAlert ? <div className={'alert '+typeclass} role="alert">{msg}</div> : null}
								  <form>
										{showOtherFields ?
										<div>
											<div className="form-group">
											  <label htmlFor="exampleInputEmail1">Codigo</label>
											  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar codigo" value={code}  onChange={(text) => this.setState({code:text.target.value})}/>
											  <small id="emailHelp" className="form-text text-muted">El codigo solo puede ser numerico EJ: 123456.</small>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputPassword1">Nombres</label>
												<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Ej Pepito" value={name} onChange={(event) => this.setState({name:event.target.value})}/>
											</div>
											<div className="form-group">
												<label htmlFor="inputLastnames">Apellidos</label>
												<input type="text" className="form-control" id="inputLastnames" placeholder="Ej Murillo Mendez" value={lastnames} onChange={(event) => this.setState({lastnames:event.target.value})} />
											</div>
											<div className="form-group">
												<button type="button" className="btn btn-secondary mr-2" data-dismiss="modal" onClick={() =>this.hideModal()}>Cancelar</button>
							        			<button type="button" className="btn btn-primary" onClick={(ev) => this.validateForm(ev)}>Guardar cambios</button>
											</div>
										</div>: 
										<div>
											<div className="form-group">
												  <label htmlFor="exampleInputEmail1">Institucion</label>
												  	<select className="custom-select" id="inputGroupSelect01" defaultValue={institutionId} onChange={(id) => this.setState({institutionId:id.target.value})}>
												    <option value="DEFAULT">Selecciona una Institucion</option>
												    {this.props.teachers.institutions.map((item, index) => {
												    	return(
												    		<option value={item.i_institution_id} key={index+1}>{item.i_name}</option>
												    	)
												    })}
												  </select>
												</div>
												<div className="form-group">
												 	<label htmlFor="exampleInputEmail1">Roles</label>
												  	<select className="custom-select" id="inputGroupSelect01" defaultValue={role} onChange={(role) => this.setState({role:role.target.value})}>
												    <option value="DEFAULT">Selecciona un rol</option>
												    <option value="4">Profesor con privilegios</option>
												    <option value="2">Profesor</option>
												    <option value="3">Estudiante</option>
												  	</select>
												</div>
												<div className="form-group">
												  <label htmlFor="exampleInputEmail1">Usuario</label>
												  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar usuario o codigo" value={user}  onChange={(text) => this.setState({user:text.target.value})}/>
												  <small id="emailHelp" className="form-text text-muted">El usuario tambien puede ser su codigo de identificacion  EJ: 123456.</small>
												</div>
												<div className="form-group">
												  <label htmlFor="exampleInputPassword">Contrasenia</label>
												  <input type="password" className="form-control" id="exampleInputPassword" aria-describedby="emailHelp" placeholder="Ingresar una contrasenia" value={password}  onChange={(text) => this.setState({password:text.target.value})}/>
												  <small id="emailHelp" className="form-text text-muted">El codigo solo puede ser numerico EJ: 123456.</small>
												</div>
												<div className="input-group">
													<button type="button" className="btn btn-secondary mr-2" data-dismiss="modal" onClick={() =>this.hideModal()}>Cancelar</button>
						        					<button type="button" className="btn btn-primary" onClick={(ev) => this.validateFirstFrom(ev)}>Continuar</button>
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
					  </section>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    teachers: state.teachers
  }
}

const mapDispatchToProps = {
  addInstitution,
  addSpecialties
};

export default connect( mapStateToProps , mapDispatchToProps )(AddUsers)

