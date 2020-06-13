import React from 'react';
import {
 Link,
 Redirect
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import ProgressBar from '../components/ProgressBar';
import imgteacher from '../images/teacher.svg';

export default class Portal extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:'',
      	password:'',
      	isLoaded:false
	  };


	}

	
	componentDidMount(){
		document.body.style.backgroundColor = "#edeff0"
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

	render(){
		let auth = sessionStorage.getItem('duct');

		if(auth === undefined || auth === null || auth === "undefined"){
			return (<Redirect to={'/'}/>)
		}else{
			if(auth !== undefined && auth !== null){
					if(this.IsJsonString(auth)){
						auth = JSON.parse(auth);
						if(auth.length > 0){
							if(this.checkProperty(auth[0])){
								if(auth[0].status === undefined){
									return (<Redirect to={'/'}/>)
								}else{
									let status = this._desenvolver_(auth[0].status);
									if (status != 1){
								 	  return (<Redirect to={'/'}/>)
									}
								}
							}else{
								return (<Redirect to={'/'}/>)
							}
						}else{
							return (<Redirect to={'/'}/>)
						}
				    }else{
				    	return (<Redirect to={'/'}/>)
				    }
				    
			}

		}
		

		return(
			<div>
			    <ProgressBar />
				<Header currentSection="portal"/>
				<div className="container-fluid mt-3">
					  <section className="content d-flex justify-content-center mb-3">
					  		<div className="card col-md-10 p-3 shadow-sm rounded-10">
					  			<div className="card-body  d-flex justify-content-center">
						  			<div className="column col-md-7 ml-0">
										<h4>Bienvenido a la seccion de los maestros</h4>
										<p className="text-break font-weight-light">Este es el catalogo de profesores que pertenecen a la institucion a la que te encuentras registrado, recuerda que si no sabes a que institucion estas inscrito, puedes dar click <Link to={{pathname:'/institutions'}}>Aqui</Link></p>
						  				<p className="text-break font-weight-light ">Esta seccion te da el privilegio de poder agregar un nuevo profesor a la institucion que desees</p>
						  				<button type="button" className="btn btn-primary p-2 mb-2">Agregar uno nuevo</button>
						  			</div>

							  		<div className="column col-md-5 ml-0 overflow-hidden ">
										<img src={imgteacher} className="imageRight"/>
							  		</div>
					  			</div>
					  		</div>
					  </section>
					  <section className="content d-flex justify-content-center mb-3">
					  		<div className="card bg-transparent border-0" style={{width:'1055px'}}>
								<div className="card-body">
									<div className="row d-block">
										<h6>Maestros</h6>
										<p>Explora los maestros para si darte cuenta cual tiene un perfil mas adecuado para asignarle un curso</p>
									</div>
									<div className="row">

									</div>
								</div>
					  		</div>
					  </section>
				</div>
			</div>
		)
	}
}

