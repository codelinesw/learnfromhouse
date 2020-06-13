import React from 'react';
import {
 Link,
 Redirect
} from  'react-router-dom';
import auth from '../screens/auth';
import SimpleCrypto from "simple-crypto-js";
import { connect } from 'react-redux';
import {
  login
} from '../actions'


class Header extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentDidMount(){
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


	logout(){
		auth.logout(() => {
		      sessionStorage.removeItem('duct');
		      this.props.login(false);
	     });
	}

	show(ev){
		ev.preventDefault();
		document.querySelector('.submenu-nav').classList.toggle('show');
	}

	ShowSubmenu(ev){
		ev.preventDefault();
		console.log(ev.target.parentElement.children[1]);
		ev.target.parentElement.children[1].classList.toggle('show');
	}

	render(){
		let roleCurrent = sessionStorage.getItem('duct');
		const { currentSection } = this.props;
		let validate = false;
		let role_id = 0;
		if(roleCurrent == undefined || roleCurrent == null || roleCurrent == ''){
			roleCurrent = false;
			validate = false;
			return <Redirect to="/" />;
		}else{
			if(this.IsJsonString(roleCurrent)){
				if(roleCurrent.length > 0){
					roleCurrent = JSON.parse(roleCurrent);
					validate = true;
					if(this.checkProperty(roleCurrent[0])){
						validate = true;
						role_id = roleCurrent[0].r_rol_id.substring(12,13) == 4 || roleCurrent[0].r_rol_id.substring(12,13) == 1 ? true : false;
					}else{
						roleCurrent = false;
						validate = false;
					}
				}else{
					roleCurrent = false;
					validate = false;
				}
			}else{
				roleCurrent = false;
				validate = false;
			}
		}

		return(
			<header className="main-navigation border-bottom">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					  <Link className="navbar-brand font-pacifico" to="#"><h3>Learnfromhouse</h3></Link>
					  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>
					  <ul className="nav">
						  <li className="nav-item">
						    <Link to="/portal" className={currentSection === 'portal' ? "nav-link active" : " nav-link normal-text"}>Inicio</Link>
						  </li>
						  {
						  	validate ? ( role_id ? <div className="d-flex"><li className="nav-item">
						    <Link to="/institutions/" className={currentSection === 'institutions' ? "nav-link active" : " nav-link normal-text"}>Instituciones</Link>
						  </li>
						  <li className="nav-item dropdown">
					        <Link to="/teachers/" className={currentSection === 'teachers' ? "nav-link dropdown-toggle active" : " nav-link dropdown-toggle normal-text"} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(ev) => this.ShowSubmenu(ev)}>Usuarios</Link>
					        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
					           <Link className="dropdown-item addhover" to="/teachers/">Profesores</Link>
					           <Link className="dropdown-item addhover" to="/students/">Estudiantes</Link>
					           <div className="dropdown-divider"></div>
					           <Link className="dropdown-item addhover" to="/addusers/">Crear usuarios</Link>
					        </div>
					      </li>
						  <li className="nav-item">
						    <Link to="/groups/" className={currentSection === 'grupos' ? "nav-link active" : " nav-link normal-text"}>Grupos</Link>
						  </li>
						  </div> 
						  : (roleCurrent[0].r_rol_id.substring(12,13) == 2) ? 						  <li className="nav-item">
						    <Link to="/groups/" className={currentSection === 'grupos' ? "nav-link active" : " nav-link normal-text"}>Grupos</Link>
						  </li> : null) : null
						  }
						  <li className="nav-item">
						    <Link to="/courses" className={currentSection === 'cursos' ? "nav-link active" : " nav-link normal-text"}>Cursos</Link></li>
						  <li className="nav-item">
						    <Link className={currentSection === 'evaluaciones' ? "nav-link active" : " nav-link normal-text"} to="#">Evaluaciones</Link>
						  </li>
					   </ul>
					  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					    <ul className="navbar-nav">
					      <li className="nav-item active">
					        <Link className="nav-link btn" to="index.php">Notificaciones <span className="badge badge-dark">4</span></Link>
					      </li>
					      <li className="nav-item dropdown">
					        <Link className="nav-link dropdown-toggle d-flex align-items-center" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(ev) => this.show(ev)}>
					        <img src="https://pngimage.net/wp-content/uploads/2018/06/user-png-image-5.png" width="30" height="30" className="d-inline-block align-top mr-2" alt="" />{roleCurrent[0].us_name}</Link>
					        <div className="dropdown-menu col-md-6 submenu-nav" aria-labelledby="navbarDropdown">
					          <Link className="dropdown-item addhover" to="#">Mi perfil</Link>
					          <Link className="dropdown-item addhover" to="#">Configuraciones</Link>
					          <div className="dropdown-divider"></div>
					          <button type="button" className="dropdown-item addhover" onClick={() => this.logout()}>Cerrar Sesión</button>
					        </div>
					      </li>
					    </ul>
					  </div>
				</nav>
			</header>
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

export default connect( mapStateToProps , mapDispatchToProps )(Header)