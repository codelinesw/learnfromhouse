import React from 'react';
import {
 Link,
 Redirect,
 
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import SideBar from '../components/SideBar';
	
export default class ViewCourse extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:'',
      	password:'',
      	isLoaded:false
	  };
	}

	componentDidMount(){
		document.body.style.backgroundColor = '#f3f3f3';
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

	render(){

		const { location, isLoaded  } = this.props;
		
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
									<SideBar state_={this.props.location.state} current="Posts" path={{one:'/viewcourse/',two:'/tasks/',three:'/members/'}} />
								</div>
							</div>
						</div>
						<div className="col col-md-9">
							<div className="row mt-2 mb-2">
								<div className="card bg-white w-92 ml-4">
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
									<div className="col">
										<div className="card m-auto rounded-5 col-md-12 shadow-sm" style={{position:'relative',left:'16px'}}>
											<div className="card-header bg-white border-0 p-1 pt-3">
												<div className="row d-flex border-0 w-100">
													<img src="https://pngimage.net/wp-content/uploads/2018/06/user-png-image-5.png" width="42" height="42" className="d-inline-block align-top mr-2 ml-3" alt="" />
													<div className="column">
														<p className="card-text m-0 font-weight-bold">Jhon Murillo Mendez</p>
														<p className="card-text font-weight-light fs-12 small mb-1" style={{marginRop: '-2px'}}>Docente</p>
													</div>
												</div>
											</div>
											<div className="card-body p-1">
					    						<div className="widget-area no-padding blank">
					    							<textarea placeholder="Escribe tu publicacion Aqui!" rows="4" className="pb-cmnt-textarea w-100 border-0 textarestyle"></textarea>
													<div className="form-inline w-100 d-flex justify-content-between pb-2">
								                        <div className="btn-group">
								                            <button className="btn" type="button"><span className="far fa-image fa-lg"></span></button>
								                            <button className="btn" type="button"><span className="far fa-file-alt fa-lg"></span></button>
								                        </div>
                        								<button className="btn btn-primary float-xs-right" type="button">Publicar</button>
                    								</div>
												</div>										
											</div>
										</div>	
									</div>
									<div className="col col-md-5">
										<div className="card w-86 ml-2 bg-white shadow-sm">
											<div className="card-header bg-transparent p-0 pt-3">
												<p className="card-title ml-3">Recordatorios</p>
												<div className="input-group d-flex justify-content-between" style={{borderTop:'1px solid #dedede'}}>
													<button type="button" className="btn btn-transparent"><i className="fas fa-arrow-left"></i></button>
													<button type="button" className="btn btn-transparent"><i className="fas fa-arrow-right"></i></button>
												</div>
											</div>
											<div className="card-body">
												<div className="content-blank">
													<p className="text-muted text-center">No tienes recordatorios de examenes o de quizes para esta semana</p>
												</div>
											</div>
										</div>
										<div className="input-group w-86 bg-white p-2 rounded-5 mt-2 ml-2 shadow-sm">
											<button type="button" className="btn btn-outline-primary w-100">Invitar</button>
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
						        <p>¿Se encuentra seguro/a  de eliminar esta publicacion?.</p>
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