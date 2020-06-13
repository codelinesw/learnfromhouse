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
  addGroup,
  addNewGroup,
  UpdateGroup,
  DeleteGroup
} from '../actions'
import ProgressBar from '../components/ProgressBar';
import ContentLoadGroups from '../components/ContentLoaderGroups';

class Groups extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	name:'',
	  	isLoaded:false,
	  	id:'0',
	  	indexGroup:'0'
	  };

	  this.isMounted_ = false;
	}

	componentDidMount(){
		document.body.style.backgroundColor = "#ffffff"
		this.loadGroups();
	}

	componentWillUnmount(){
		this.isMounted_ = false;
	}

	loadGroups(){
		this.isMounted_ = true;
		let auth = sessionStorage.getItem('duct');
		let roleid = false;
		let url = routes.groups.list;
		let id_ = '0';
		if(auth !== undefined && auth !== null){
				if(this.IsJsonString(auth)){
					auth = JSON.parse(auth);
					if(auth.length > 0){
						url = routes.groups.listforid;
						id_ = auth[0].us;
					}
				}
		}
		let data = JSON.stringify({Id:id_});
		if(this.isMounted_){
			this.setState({isLoaded:true});
		}
		console.log(url);
		services.requestGet(url,data)
	    .then(res => {
	      console.log(res);
	      if(this.isMounted_){
	      	 this.props.addGroup(res);
	      	 console.log(res);
	      }
	    },
	    (error) => {
	      if(this.isMounted_){
	      	this.setState({
	          isLoaded: false
	      	});
	      	this.isMounted_ = false;
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
   	let currentData = this.props.groups.groups;
	  this.setState({
	  	name:currentData[index].g_name,
	  	id:id,
	  	indexGroup:index
	  });
	  console.log(id);
   	  this.showingModal(idElement);
   }

   delete(){

   	const { id , indexGroup } = this.state; 
   	  if(id === '0'){
   	  	console.log('undefined group for delete');
   	  }else{
   	  		let data_ = JSON.stringify({Id:id});
	   		this.isMounted_ = true;
	   		this.setState({isLoaded:true});
	   		services.requestSet(routes.groups.delete,data_)
    		.then(res => {
			      if(this.isMounted_){
			      	console.log(res);
			      	if(res !== 'failed'){
			      		this.hideModal('#modalQuestionForGroup');
			      		Swal.fire(
						  'Buen trabajo!',
						  'El grupo se ha Eliminado correctamente!',
						  'success'
						);
						
						this.props.DeleteGroup(indexGroup);
						
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

	_renderItems_(item,index){
		if(item === "" || item === undefined || item === null){
			return <ContentLoadGroups countResult={5} count={5} key={index+1} />;
		}else{

			if(Object.values(item)[0] === "empty"){
				return <div key={index+1}><p className="text-muted">No hay grupos creados aun</p></div>;
			}else{
				return(
					<tr key={index+1}>
						<th scope="row">{index+1}</th>
						<td className="font-weight-light"><Link to="#">{item.i_name}</Link></td>												      
						<td className="font-weight-light">{item.g_name}</td>
						<td className="font-weight-light">{item.c_course_id}</td>
						<td className="font-weight-light">{item.t_name}</td>
						<td className="font-weight-light">
							<div className="input-group">
								<div className="input-button">
									<button type="button" className="btn btn-danger p-2" style={{width:'36px',height:'30px'}} onClick={() => this.deleteData(index,item.g_group_id,'#modalQuestionForGroup')}>
										<i className="fas fa-times" style={{position: 'relative',top:'-5px'}}></i>
									</button>
									<span className="tooltip_" style={{width:'145px'}}>Eliminar Grupo</span>
								</div>
							<div className="input-button">
								<Link to={{
									pathname: "/addgroup/",
									state: {
										course:{courseId:item.c_course_id,id:item.g_group_id,teacherId:item.us_user_information_id,code:item.c_course_id,name:item.g_name}
									}}
								} 
								className="btn ml-2 btn-warning p-2" style={{height:'30px'}}>
									<i className="fas fa-pen" style={{position: 'relative',top:'-5px'}}></i>
								</Link>
								<span className="tooltip_" style={{width:'125px'}}>Editar Grupo</span>
							</div>
						</div>
					</td>
				</tr>
			 );
			}
		}
	}

	render(){

		const { name, isLoaded } = this.state;

		return(
			<div>
			    <ProgressBar />
				<Header currentSection="grupos"/>
				<div className="container-fluid mt-3">
					  <section className="content">
					  		<div className="column col-md-9 ml-0">
								<h4>Listado de grupos</h4>
					  			<h6 className="font-weight-normal ">Descripcion</h6>
					  			<p className="text-break font-weight-light ">Esta seccion permite agregar un nuevo y aniadirle cursos a estos grupos,tambien puedes asignarle un profesor</p>
					  		</div>
					  </section>
					  <section className="content">
					  		<div className="card">
						  		<div className="card-header">
									<h5>Acciones para esta seccion</h5>
									<Link to={{pathname:"/addgroup/"}} className="btn btn-primary">Agregar uno nuevo</Link>
								</div>
								<div className="card-body">
									<table className="table">
										  <thead>
										    <tr>
										      <th scope="col" style={{fontSize:'14px'}}>#</th>
										      <th scope="col" style={{fontSize:'14px'}}>Institucion</th>										      
										      <th scope="col" style={{fontSize:'14px'}}>Nombre del grupo</th>
										      <th scope="col" style={{fontSize:'14px'}}>Codigo</th>
										      <th scope="col" style={{fontSize:'14px'}}>Profesor Asignado</th>
										      <th scope="col" style={{fontSize:'14px'}}>Opciones</th>
										    </tr>
										  </thead>
										  <tbody>
										  {/*<td class="font-weight-light">
								      	<div class="input-group">
								      		<a href="#" class="btn btn-info mr-2 p-2" style="height:30px"><i class="far fa-eye" style="position: relative;top:-5px;"></i></a>
								      		<a href="#" class="btn btn-success p-2" style="height:30px"><i class="fas fa-upload" style="position: relative;top:-5px;"></i></a>
								      	</div>
								      </td>*/}
										      {this.props.groups.groups.map((item, index) => {
										      	return this._renderItems_(item,index);
										      })}
										  </tbody>
									</table>
								</div>
					  		</div>
					  </section>
				</div>
				<div className="modal fade"  role="dialog" id="#modalQuestionForGroup" style={{display: 'none', paddingRight: '0px'}}>
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title">Eliminar Instituccion</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						        <p>¿Se encuentra seguro/a  de eliminar el grupo <b>{name}</b> ?.</p>
						      </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-primary" onClick={() => this.delete()}>Aceptar</button>
						        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() =>this.hideModal('#modalQuestionForGroup')}>Cancelar</button>
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
    groups: state.groups
  }
}

const mapDispatchToProps = {
  addGroup,
  addNewGroup,
  UpdateGroup,
  DeleteGroup
};

export default connect( mapStateToProps , mapDispatchToProps )(Groups)

