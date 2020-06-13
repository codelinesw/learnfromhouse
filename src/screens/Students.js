import React from 'react';
import {
 Link,
 Redirect
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import { connect } from 'react-redux';
import routes from '../request/routes';
import services from '../request/services';
import Swal from 'sweetalert2';
import {
  LoadTeachers,
  DeleteTeacher
} from '../actions'
import ProgressBar from '../components/ProgressBar';
import user from '../images/user.png';
import ContentLoadTeacher from '../components/ContentLoaderTeacher';

class Students extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	name:'',
	  	isLoaded:false,
	  	id:'0',
	  	indexTeacher:'0',
	  	countResult:'5',
	  	data:['']
	  };

	  this.isMounted_ = false;
	}

	componentDidMount(){
		document.body.style.backgroundColor = "#ffffff"
		this.loadTeachers();
	}

	componentWillUnmount(){
		this.isMounted_ = false;
	}

	loadTeachers(){
		this.isMounted_ = true;
		if(this.isMounted_){
			this.setState({isLoaded:true});
		}
		services.requestGet(routes.teachers.list)
	    .then(res => {
	      if(this.isMounted_){
	      	 this.props.LoadTeachers(res);
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
   	let currentData = this.props.teachers.teachers;
	  this.setState({
	  	name:currentData[index].t_name,
	  	id:id,
	  	indexTeacher:index
	  });
	  //console.log(currentData);
   	  this.showingModal(idElement);
   }

   delete(){

   	const { id , indexTeacher } = this.state; 
   	  if(id === '0'){
   	  	console.log('undefined group for delete');
   	  }else{
   	  		let data_ = JSON.stringify({t_teacher_id:id});
	   		this.isMounted_ = true;
	   		this.setState({isLoaded:true});
	   		services.requestSet(routes.teachers.delete,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		this.hideModal('#modalQuestionForTeacher');
			      		Swal.fire(
						  'Buen trabajo!',
						  'El grupo se ha Eliminado correctamente!',
						  'success'
						);
						this.props.DeleteTeacher(indexTeacher);
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

	_renderItems_(data,index){
		//console.log(data.t_name);
		if(data === "" || data === undefined || data === null){
			return <ContentLoadTeacher countResult={5} key={index+1}/>;
		}else{

			if(Object.values(data) === "empty"){

			}else{
				
				return(
					<tr key={index}>
						<th scope="row">{index+1}</th>
						<td style={{padding:'6px'}}>
							<div className="row d-flex">
								<img src={user} width="34" height="34" alt="Error" />
								<p style={{position:'relative',top:'6px',marginLeft:'5px'}}>{data.us_name+' '+data.l_lastnames}</p>
							</div>
						</td>
						<td style={{padding:'6px'}}>
							<p style={{position:'relative',top:'6px'}}>{data.c_code}</p>
						</td>
						<td style={{padding:'6px'}}>
							<p style={{position:'relative',top:'6px'}}>Desarrollador de software</p>
						</td>
						<td style={{padding:'6px'}}>
							<p style={{position:'relative',top:'6px'}}>{data.birthdate}</p>
						</td>
						<td style={{padding:'5px'}}>
							<div className="form-input">
								<Link to={{
									pathname: "/addteachers/",
									state: {
										teacher:{institutionId:data.i_institution_id,nameinstitution:data.i_name,name:data.t_name,code:data.c_code,specialty:data.s_specialty_id,teacherId:data.t_teacher_id}
									}}
								} 
								className="btn btn-warning">Editar</Link>
								<button type="button" className="btn btn-danger ml-2" onClick={() => this.deleteData(index,data.t_teacher_id,'#modalQuestionForTeacher')}>Eliminar</button>
							</div>
						</td>
					</tr>
				);
			}
		}
	}

	render(){

		const { name, isLoaded  } = this.state;

		let auth = sessionStorage.getItem('duct');
		let roleid = false;
		if(auth === undefined || auth === null || auth === "undefined"){
			return (<Redirect to={'/'}/>)
		}else{
			if(auth !== undefined){
					if(this.IsJsonString(auth)){
						auth = JSON.parse(auth);
						if(auth.length > 0){
							if(this.checkProperty(auth[0])){
								if(auth[0].status === undefined){
									return (<Redirect to={'/'}/>)
								}else{
									let status = this._desenvolver_(auth[0].status);
									//console.log(status);
									if (status != 1){
								 	  return (<Redirect to={'/'}/>)
									}
									roleid = (auth[0].r_rol_id.substring(12,13) === 4 || auth[0].r_rol_id.substring(12,13) === 2) ? true : false;
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
				<Header currentSection="teachers"/>
				<div className="container-fluid mt-3">
					  <section className="content d-flex justify-content-center mb-3">
					  		<div className="card col-md-11 p-3 rounded-10 border-0">
					  			<div className="card-header bg-transparent border-0 d-flex justify-content-start">
						  			<div className="column col-md-7 ml-0">
										<h4>Listado de estudiantes</h4>
										<p className="text-break font-weight-light">Este es el catalogo de estudiantes</p>
						  			</div>
					  			</div>
					  			<div className="card-body">
					  				<div className="card">
					  					<div className="card-header">
					  						<h5>Estudiantes</h5>
					  						<div className="float-left">
					  							<div className="form-input">
					  								<button type="button" className="btn btn-primary mr-2"><i className="far fa-file-excel"></i> Exportar a CSV</button>
					  								<button type="button" className="btn btn-warning mr-2"><i className="fas fa-upload"></i> importar a CSV</button>
					  								<Link to="/addteachers/" className="btn btn-success"><i className="fas fa-plus"></i> Agregar uno nuevo</Link>
					  							</div>
					  						</div>
					  					</div>
					  					<div className="card-body">
					  						<div className="row">
					  							<div className="column d-flex align-items-center col-md-2">
					  								<p style={{position:'relative',top:'5px'}}>Mostrar</p>
					  								<select className="form-control ml-2" id="exampleFormControlSelect1" defaultValue="DEFAULT">
										    			<option value="DEFAULT">5</option>
										    		</select>
					  							</div>
					  							<div className="column col-md-10 d-flex justify-content-end align-items-center">
					  								<div className="table-filter">
															<div className="row">
											                    <div className="d-flex align-items-center justify-content-between">
											                    	<span className="filter-icon"><i className="fa fa-filter"></i></span>
																	<div className="filter-group d-flex ml-3 mr-3">
																		<label style={{position:'relative',marginRight:'10px',top:'5px'}}>Institucion:</label>
																		<select className="form-control col-md-7" defaultValue="DEFAULT" style={{position:'relative',top:'-2px'}}>
																			<option value="DEFAULT">All</option>
																			<option>Berlin</option>
																			<option>London</option>
																			<option>Madrid</option>
																			<option>New York</option>
																			<option>Paris</option>								
																		</select>
																	</div>
																	<div className="input-group mb-3 col-sm-6" style={{position:'relative',top:'5px'}}>
																	  <input type="text" className="form-control" placeholder="Buscar por nombre" aria-label="Recipient's username" aria-describedby="basic-addon2" />
																	  <div className="input-group-append">
																	    <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
																	  </div>
																	</div>
											                    </div>
											                </div>
													</div>
					  							</div>
					  						</div>
					  						<div className="row mt-3">
						  						<table className="table overflow-hidden">
							  						<thead>
							  							<tr>
									  						<th scope="col">#</th>
									  						<th scope="col">Estudiante</th>
									  						<th scope="col">Codigo</th>
									  						<th scope="col">Correo Electronico</th>
									  						<th scope="col">Fecha Nacimiento</th>
									  						<th scope="col">Acciones</th>
							  							</tr>
							  						</thead>
							  						<tbody className="overflow-hidden" style={{width:'1062px',overflowHidden:'hidden'}}>
								  						{this.props.teachers.teachers.map(( item, index ) => {
								  							return this._renderItems_( item, index);
								  						})
								  					}
							  						</tbody>
						  						</table>
					  						</div>
					  						<div className="row d-flex justify-content-between col-md-12" style={{position:'relative',top:'15px'}}>
					  							<div className="d-flex">
					  								<p>Visualizando</p> <b className="ml-2 mr-2">5</b> <p>de <b>100</b> resultados</p>
					  							</div>
					  							<nav aria-label="Page navigation example">
												  <ul className="pagination">
												    <li className="page-item"><Link className="page-link" href="#">Previous</Link></li>
												    <li className="page-item"><Link className="page-link" href="#">1</Link></li>
												    <li className="page-item"><Link className="page-link" href="#">2</Link></li>
												    <li className="page-item"><Link className="page-link" href="#">3</Link></li>
												    <li className="page-item"><Link className="page-link" href="#">Next</Link></li>
												  </ul>
												</nav>
					  						</div>
					  					</div>
					  				</div>
					  			</div>
					  		</div>
					  </section>
					  <section className="content d-flex justify-content-center mb-3">
					  		<div className="card bg-transparent border-0">
					  			
					  		</div>
					  </section>
					  <div className="modal fade"  role="dialog" id="#modalQuestionForTeacher" style={{display: 'none', paddingRight: '0px'}}>
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title">Eliminar Instituccion</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						        <p>¿Se encuentra seguro/a  de eliminar el maestro <b>{name}</b> ?.</p>
						      </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-primary" onClick={() => this.delete()}>Aceptar</button>
						        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() =>this.hideModal('#modalQuestionForTeacher')}>Cancelar</button>
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
    teachers: state.teachers
  }
}

const mapDispatchToProps = {
  LoadTeachers,
  DeleteTeacher
};

export default connect( mapStateToProps , mapDispatchToProps )(Students)