import React from 'react';
import {
 Link,
 Redirect
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import routes from '../request/routes';
import services from '../request/services';
import ProgressBar from '../components/ProgressBar';
import {
  addInstitution,
  addNewInstitution,
  UpdateInstitution,
  DeleteInstitution
} from '../actions'
import ContentLoadInstitutions from '../components/ContentLoaderInstitutions';
class Institutions extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:'',
      	password:'',
      	isLoaded: false,
      	code:'',
      	name:'',
      	sede:'',
      	typeSend:'',
      	indexInstitution:0,
      	id:0,
      	msg:'',
      	showAlert:false,
      	bgAlert:''

	  };

	  this.showing = false;
	  this.isMounted_ = false;
	}

	componentDidMount(){
		document.body.style.backgroundColor = "#ffffff"
		this.loadInstitutions();
	}

	componentWillUnmount() {
   		this.isMounted_ = false;
	}

	loadInstitutions(){
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

	getFormatTimeStamp(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('/');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[2]+"-"+(newdate[1] < 10 ? "0"+newdate[1] : newdate[1])+"-"+(newdate[0] < 10 ? "0"+newdate[0] : newdate[0])+seconds;
    	return formatdate;
	}

	getFormatDate(date_){
     let formatdate = date_.getDate()+"/"+(date_.getMonth()+1)+"/"+date_.getFullYear()+" "+date_.getHours()+":"+date_.getMinutes()+":"+date_.getSeconds();
     return formatdate;
    }

    sendData(data_){
    	const { code , name, sede, typeSend, indexInstitution, id } = this.state;
    	if(typeSend === "ADD"){
    		services.requestSet(routes.institutions.add,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	let res_ = res.split('-');
			      	if(res_[0] !== 'failed'){
			      		document.getElementById('#modalNewInstitution').className = 'modal fade';
				 		document.getElementById('#modalNewInstitution').style = "display: none; padding-right: 0px;";
			      		Swal.fire(
						  'Buen trabajo!',
						  'La institucion se ha creado correctamente!',
						  'success'
						);
						let date_ = this.getFormatTimeStamp(this.getFormatDate(new Date()));
						data_ = {i_institution_id:res_[1],c_code:code,i_name:name,sede:sede,created:date_,updated:date_};
						this.props.addNewInstitution(data_);
						//console.log(data_);
						
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

    	if(typeSend === "UPDATE"){
    		
    		services.requestSet(routes.institutions.update,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		document.getElementById('#modalNewInstitution').className = 'modal fade';
				 		document.getElementById('#modalNewInstitution').style = "display: none; padding-right: 0px;";
			      		Swal.fire(
						  'Buen trabajo!',
						  'La institucion se ha actualizado correctamente!',
						  'success'
						);
						let currentData = this.props.institutions.institutions;
						let date_ = this.getFormatTimeStamp(this.getFormatDate(new Date()));
					   	let newdata = {
					   		i_institution_id:id,
					   		c_code:code,
					   		i_name:name,
					   		sede:sede,
					   		created:currentData[indexInstitution].created,
					   		updated:date_
					   	};

					   	currentData[indexInstitution] = newdata;
						this.props.UpdateInstitution(currentData);
						console.log(currentData);
						
			      	}
			      }
			    },
		    (error) => {
		      this.setState({
		        isLoaded: false,
		        error
		      });
		    }).finally(() => {

		      this.setState({isLoaded:false,bgAlert:''});
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
	validateForm(e){
	    e.preventDefault();
	    const { code , name, sede, id } = this.state;
	    this.isMounted_ = true;
	    if(code === "" && name === ""){
	      this.setState({showAlert:true,msg:'Por favor completar todos los campos para iniciar sesion',bgAlert:'alert-danger'});
	    }else if(code === ""){
	      this.setState({showAlert:true,msg:'El campo codigo se encuentra vacio por favor diligencielo',bgAlert:'alert-danger'});
	    }else if(name === ""){
	      this.setState({showAlert:true,msg:'El campo del nombre de la institucion se encuentra vacio por favor diligencielo',bgAlert:'alert-danger'});
	    }else{
	     	this.setState({isLoaded:true});
	     	let data = '';
	     	if(this.typeSend === "ADD"){
	     		data = JSON.stringify({code:code,name:name,sede:sede});
	     	}else{
	     		data = JSON.stringify({code:code,name:name,sede:sede,i_institution_id:id});
	     	}
	     	
	    	this.sendData(data);
	    }

	    return false;
   }


   editData(index,id,idElement){
	  console.log('Your pess this button, do you want this information? '+ id);
	  let currentData = this.props.institutions.institutions;
	  this.setState({
	  	typeSend:'UPDATE',
	  	id:id,
	  	indexInstitution:index,
	  	code:currentData[index].c_code,
	  	name:currentData[index].i_name,
	  	sede:currentData[index].sede
	  });
	  console.log(currentData[index]);
	  this.showingModal(idElement);
   }
   deleteData(index,id,idElement){
   	let currentData = this.props.institutions.institutions;
	  this.setState({
	  	typeSend:'DELETE',
	  	id:id,
	  	indexInstitution:index,
	  	name:currentData[index].i_name
	  });
	  console.log(index);
   	  this.showingModal(idElement);
   }

   delete(){
   		const { indexInstitution , id } = this.state;
   		
	   	if(id === '0'){
	   		console.log('undefined id data');
	   	}else{
	   		let data_ = JSON.stringify({i_institution_id:id});
	   		//console.log('i am here');
	   		this.isMounted_ = true;
	   		this.setState({isLoaded:true});
	   		services.requestSet(routes.institutions.delete,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		this.hideModal('#modalQuestionForInstitution');
			      		Swal.fire(
						  'Buen trabajo!',
						  'La institucion se ha Eliminado correctamente!',
						  'success'
						);
						
						this.props.DeleteInstitution(indexInstitution);
						
						
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

	_addInstitution_(){
		this.setState({typeSend:'ADD'});
		this.showingModal('#modalNewInstitution');
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

	
	
	_renderItems_(item,index){
		if(item === "" || item === undefined || item === null){
			return <ContentLoadInstitutions countResult={5} count={6} key={index+1} />;
		}else{

			if(Object.values(item) === "empty"){

			}else{
				return(
					<tr key={index+1}>
						<th scope="row">{index+1}</th>
						<td className="font-weight-light">{item.c_code}</td>
						<td className="font-weight-light"><Link to="#">{item.i_name}</Link></td>
						<td className="font-weight-light">{item.sede}</td>
						<td className="font-weight-light">{item.created}</td>
						<td className="font-weight-light">{item.updated}</td>
						<td className="font-weight-light">
						<div className="input-group">
							<div className="input-button">
								<button type="button" className="btn btn-danger p-2" style={{width:'36px',height:'30px'}} onClick={() => this.deleteData(index,item.i_institution_id,'#modalQuestionForInstitution')}>
									<i className="fas fa-times" style={{position: 'relative',top:'-5px'}}></i>
								</button>
								<span className="tooltip_" style={{width:'145px'}}>Eliminar institucion</span>
							</div>
							<div className="input-button">
								<button type="button" className="btn ml-2 btn-warning p-2" style={{height:'30px'}} onClick={() => this.editData(index,item.i_institution_id,'#modalNewInstitution')}>
									<i className="fas fa-pen" style={{position: 'relative',top:'-5px'}}></i>
								</button>
								<span className="tooltip_" style={{width:'125px'}}>Editar institucion</span>
							</div>
						</div>
					</td>
				</tr>
				)
			}
		}
	}
		
	render(){
		const { isLoaded, code, name , sede, showAlert, msg, bgAlert } = this.state;

		return(
			<div>
			    <ProgressBar />
				<Header currentSection="institutions"/>
				<div className="container-fluid mt-3">
					  <section className="content">
					  		<div className="column col-md-9 ml-0">
								<h4>Listado de instituciones</h4>
					  			<h6 className="font-weight-normal ">Descripcion</h6>
					  			<p className="text-break font-weight-light ">Esta seccion permite agregar una nueva institucion y administrar cursos, tareas y actividades</p>
					  		</div>
					  </section>
					  <section className="content">
					  		<div className="card">
						  		<div className="card-header">
									<h5>Acciones para esta seccion</h5>
									<button className="btn btn-primary btnSubirDocumentoTarea" data-toggle="modal" data-target="#modalNewInstitution" onClick={() => this._addInstitution_()}>Agregar una nueva</button>
								</div>
								<div className="card-body">
									<table className="table">
										  <thead>
										    <tr>
										      <th scope="col" style={{fontSize:'14px'}}>#</th>
										      <th scope="col" style={{fontSize:'14px'}}>Codigo</th>
										      <th scope="col" style={{fontSize:'14px'}}>Nombre de la institucion</th>
										      <th scope="col" style={{fontSize:'14px'}}>Sede</th>
										      <th scope="col" style={{fontSize:'14px'}}>Fecha de creacion</th>
								      		  <th scope="col" style={{fontSize:'14px'}}>Fecha de actualizacion</th>
										      <th scope="col" style={{fontSize:'14px'}}>Opciones</th>
										    </tr>
										  </thead>
										  <tbody>
										  	{this.props.institutions.institutions.map((item,index) => {
										  		return this._renderItems_(item,index);
										  	})}
										  </tbody>
									</table>
								</div>
					  		</div>
					  </section>
						<div className="modal fade" id="#modalNewInstitution" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: 'none', paddingRight: '0px'}}>
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title" id="exampleModalLabel">Agregar Institucion</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() =>this.hideModal('#modalNewInstitution')}>
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						      	 {showAlert ? <div class={"mb-2 alert "+bgAlert} role="alert">{msg}</div> : null}
						        <form>
									  <div className="form-group">
									    <label htmlFor="exampleInputEmail1">Codigo</label>
									    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar codigo" value={code !== undefined ? code : '' } onChange={(code) => this.setState({code:code.target.value})}/>
									    <small id="emailHelp" className="form-text text-muted">El codigo puede ser alfanumerico Ej e5dsr.</small>
									  </div>
									  <div className="form-group">
									    <label htmlFor="exampleInputPassword1">Nombre de Institucion</label>
									    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Ej Codelines" value={name !== undefined ? name : ''} onChange={(name) => this.setState({name:name.target.value})}/>
									  </div>
									  <div className="form-group">
									    <label htmlFor="exampleInputPassword1">Sede</label>
									    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Ej Sur" value={sede !== undefined ? sede : ''} onChange={(sede) => this.setState({sede:sede.target.value})}/>
									  </div>
									  
								</form>
						      </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() =>this.hideModal('#modalNewInstitution')}>Cancelar</button>
						        <button type="button" className="btn btn-primary" onClick={(event) => this.validateForm(event)}>Guardar cambios</button>
						      </div>
						      {isLoaded ? <div className="container_circle_preloader">
			               <div className="child_container_">
			                 <div className="circle"><div className="child"></div></div>
			               </div>
			         </div> : null}
						    </div>
						  </div>
						</div>
						<div className="modal fade"  role="dialog" id="#modalQuestionForInstitution" style={{display: 'none', paddingRight: '0px'}}>
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title">Eliminar Instituccion</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						        <p>¿Se encuentra seguro/a  de eliminar la institucion <b>{name}</b> ?.</p>
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
			</div>
		)
	}
}


const mapStateToProps = state => {
  return {
    institutions: state.institutions
  }
}

const mapDispatchToProps = {
  addInstitution,
  addNewInstitution,
  UpdateInstitution,
  DeleteInstitution
};

export default connect( mapStateToProps , mapDispatchToProps )(Institutions)