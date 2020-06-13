import React from 'react';
import {
 Link,
 Redirect,
} from  'react-router-dom';
import auth from './auth';
import SimpleCrypto from "simple-crypto-js";
import { connect } from 'react-redux';
import routes from '../request/routes';
import services from '../request/services';
import {
  login
} from '../actions'


class Login extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:'',
      	password:'',
      	msg: '',
      	showAlert:false,
      	isLoaded: false,
      	type_:3,
      	isauthenticated: false
	  };

	  this.isMounted_ = false;
	}


	random() {
    	return Math.random().toString(36).substr(2); // Eliminar `0.`
	}

	token() {
    	return this.random() + this.random() + this.random();
	};

	chooseType(e,type){
		e.preventDefault();
		this.setState({type_:type});

		if(type === 3){
			document.getElementById('btn-student').classList.add('border-primary');
			document.getElementById('btn-student').classList.remove('btn-primary');
			document.getElementById('btn-teacher').classList.remove('bg-transparent');
			document.getElementById('btn-teacher').classList.remove('border-primary');
			document.getElementById('btn-teacher').classList.add('btn-primary');
		}else{
			document.getElementById('btn-teacher').classList.add('border-primary');
			document.getElementById('btn-teacher').classList.remove('btn-primary');
			document.getElementById('btn-student').classList.remove('bg-transparent');
			document.getElementById('btn-student').classList.remove('border-primary');
			document.getElementById('btn-student').classList.add('btn-primary');
		}
		return false;
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
		//console.log(res == null ? true : false);
		return res !== null ? true : false;
	}

	generateToken(){
		let data = sessionStorage.getItem('duct');

		if(data !== undefined || data !== null){
			 if(this.IsJsonString(data)){
			 	data = JSON.parse(sessionStorage.getItem('duct'));
			 	 if(data.length > 0){
			 	 	if(this.checkProperty(data[0])){
			 	 		if(data[0].status !== undefined){
				 	 		data[0].status = this._envolver_(data[0].status);
						    let newdata = JSON.stringify(data);
						    sessionStorage.setItem('duct', newdata);
						    this.props.login(true);
			 	 		}
			 	 	}
			 	 }

			 }
      	 
		}
	}


	validateForm(e){
	    e.preventDefault();
	    const { username , password, type_ } = this.state;
	    this.isMounted_ = true;
	    let da = "";
	    
	    if(username === "" && password === ""){
	      this.setState({showAlert:true,msg: 'Por favor completar todos los campos para iniciar sesion'});
	    }else if(username === ""){
	      this.setState({showAlert:true,msg: 'El campo del usuario se encuentra vacio por favor diligencielo'});
	    }else if(password === ""){
	      this.setState({showAlert:true,msg: 'El campo de la contrasenia se encuentra vacio por favor diligencielo'});
	    }else{
	      this.setState({isLoaded:true});
	     let data_ = JSON.stringify({username:username,password:password,type:type_});
         services.requestGet(routes.login.login,data_)
	     .then(res => {
	      console.log(res);
	      if(this.isMounted_){
	      	
	        if(res === "undefined" || res === null || res === ""){
	        	this.setState({showAlert:true,msg: 'Datos incorrectos, por favor verifique y intente de nuevo'});
	        }else{
	        	res.map((item,index) => {
	        		console.log(Object.values(item)[0]);
	        		if(Object.values(item)[0] === "empty"){
	        			this.setState({showAlert:true,msg: 'Datos incorrectos, por favor verifique y intente de nuevo'});
		        	}
	        	})

	        	da = res;
	        }
	      }
	    },
	    (error) => {
	      this.setState({
	        isLoaded: false,
	        error
	      });
	    }).finally(() => {

	      auth.login(() => {
	      	  this.setState({isauthenticated:true,isLoaded:false});
		      let data = JSON.stringify(da);
		      sessionStorage.setItem('duct', data);
		      this.generateToken();
		      this.isMounted_ = false;
	     });

	    }).catch(function(error) {
	      alert(
	        error.message
	      );

	     // ADD THIS THROW error
	      throw error;
	    });

	    }

	    return false;
   }

	render(){

		const { msg, showAlert, username, password, isLoaded } = this.state;
		let auth = sessionStorage.getItem('duct');
		if(auth !== undefined && auth !== null){

				if(this.IsJsonString(auth)){
					auth = JSON.parse(auth);

					if(auth.length > 0){
						if(this.checkProperty(auth[0])){

							if(auth[0].status !== undefined){
								let status = this._desenvolver_(auth[0].status);
								//console.log(this.props.users.isauthenticated);
								if(status == 1){
								 	console.log(this.state.isauthenticated);
								 	return (<Redirect to={'/portal/'}/>)
								}
					  		}
						}
					}
				}
		}


		return(
			<div className="container">
			    <div className="mainbox col-md-6 mx-auto mt-3">
			      <div className="card-group-item w-100">
			          <div className="row w-100 d-flex justify-content-center">
			            <div className="input-group w-70 d-flex justify-content-center">
			              <Link to="#" className="btn btn-primary rounded-0 pd-11 btn-change" id="btn-teacher" value={username} onClick={(e) => this.chooseType(e,3)}>Soy profesor</Link>
			              <Link to="#" className="btn bg-transparent border rounded-0 border-primary pd-11 btn-change" id="btn-student" value={password} onClick={(e) => this.chooseType(e,2)}>Soy estudiante</Link>
			            </div>
			          </div>
			        <hr/>
			     </div>
			    {showAlert ? <div className="alert alert-danger mb-3" role="alert">{msg}</div> : null}
			    <div className="card">
			      <div className="card-group-item">
			        <div className="card-header">
			          <h6 className="title">INICIA SESION </h6>
			        </div>
			        <div className="card-body">
			          <form id="loginform" className="form-horizontal" role="form" onSubmit={(event) => this.validateForm(event)}>
			              <div className="input-group mb-3">
			                  <div className="input-group-prepend">
			                    <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
			                  </div>
			                  <input type="text" className="form-control" placeholder="Usuario" aria-label="Usuario" aria-describedby="basic-addon1"  onChange={(username) => this.setState({username:username.target.value})}/>
			                </div>
			                <div className="input-group mb-3">
			                  <div className="input-group-prepend">
			                    <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
			                  </div>
			                  <input type="password" className="form-control" placeholder="Contrasenia" aria-label="Contrasenia" aria-describedby="basic-addon1" onChange={(password) => this.setState({password:password.target.value})}/>
			                </div>
			              <div className="form-row mb-2">
			                <div className="col-auto">
			                  <div className="input-group">
			                    <button id="btn-login" href="#" className="btn btn-primary pull-right" onClick={(event) => this.validateForm(event)}>Login  </button>
			                  </div>
			                </div>
			              </div>
			                 <div className="form-group" style={{position:'relative',top:'10px'}}>
			                     <div className="col-md-13 control">
			                         <div className="stylesadditional">No tienes cuenta! <Link to="/website-testing/user_profile_choice/">Registrate Aqui</Link>
			                         </div>
			                     </div>
			                 </div>    
			               </form>
			        </div>
			        {isLoaded ? <div className="container_circle_preloader mt-2">
			               <div className="child_container_ mt-4">
			                 <div className="circle"><div className="child"></div></div>
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
    users: state.users
  }
}

const mapDispatchToProps = {
  login
};

export default connect( mapStateToProps , mapDispatchToProps )(Login)

