import React from 'react';
import {
 Link,
 Redirect
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';

export default class ViewTask extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	username:'',
      	password:''
	  };
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

		return(
			<div>
				<Header currentSection="cursos"/>
				<div className="container-fluid mt-3">
					<div className="row">
						    <div className="col">
							      <nav aria-label="breadcrumb">
									  <ol className="breadcrumb w-100">
									    <li className="breadcrumb-item"><Link to="#">Matematicas</Link></li>
									    <li className="breadcrumb-item"><Link to="#">Tareas</Link></li>
									    <li className="breadcrumb-item active" aria-current="page">Tarea de biomateriales para sanacion de las plaquetas</li>
									  </ol>
								   </nav>
						    </div>
					  </div>
					  <section className="content">
					  		<div className="column col-md-9 ml-0">
								<h4>Tarea de biomateriales para sanacion de las plaquetas</h4>
					  			<h6 className="font-weight-normal ">Descripcion</h6>
					  			<p className="text-break font-weight-light ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam soluta, velit obcaecati aspernatur optio nemo quaerat, architecto sequi illo, voluptatibus dolor sint similique adipisci eius. Numquam ad vitae ut.</p>
					  		</div>
					  </section>
					  <section className="content">
					  		<div className="card">
						  		<div className="card-header">
									<h5>Mis Documentos subidos</h5>
									<button className="btn btn-primary btnSubirDocumentoTarea" data-toggle="modal" data-target="#modalNuevoDocumentoTarea" data-event="upload">Mis documentos subidos</button>
								</div>
								<div className="card-body">
									<table className="table">
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
										  {/*<td class="font-weight-light">
								      	<div className="input-group">
								      		<Link to="#" className="btn btn-info mr-2 p-2" style="height:30px"><i className="far fa-eye" style="position: relative;top:-5px;"></i></Link>
								      		<Link to="#" className="btn btn-success p-2" style="height:30px"><i className="fas fa-upload" style="position: relative;top:-5px;"></i></Link>
								      	</div>
								      </td>*/}
										      <tr>
											      <th scope="row">1</th>
											      <td className="font-weight-light">Jhon Denver Murillo Mendez</td>
											      <td className="font-weight-light"><Link to="#">Tarea de biomateriales para sanacion de las plaquetas</Link></td>
											      <td className="font-weight-light">30/05/2020</td>
											      <td className="font-weight-light"><span className="badge badge-primary p-2">4/5</span></td>
											      <td className="font-weight-light">
											      	<div className="input-group">
											      		<div className="input-button">
											      			<Link to="#" className="btn btn-info mr-2 p-2 btntooltip" style={{height:'30px'}} data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
												      			<i className="far fa-eye" style={{position: 'relative',top:'-5px'}}></i>
											      			</Link>
											      			<span className="tooltip_">Ver tarea</span>
											      		</div>
											      		<div className="input-button">
											      			<button type="button" className="btn btn-danger p-2" style={{height:'30px'}}>
												      			<i className="fas fa-times" style={{position: 'relative',top:'-5px'}}></i>
											      			</button>
											      			<span className="tooltip_" style={{width:'105px'}}>Eliminar tarea</span>
											      		</div>
											      		<div className="input-button"><Link to="#" className="btn ml-2 btn-success p-2" style={{height:'30px'}}><i className="fas fa-pen" style={{position: 'relative',top:'-5px'}}></i></Link><span className="tooltip_" style={{width:'92px'}}>Editar tarea</span></div>
											      	</div>
											      </td>
										      </tr>
										  </tbody>
									</table>
								</div>
					  		</div>
					  </section>
				</div>
			</div>
		)
	}
}

