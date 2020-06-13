import React from 'react';
import {
 Link
} from  'react-router-dom';
import auth from '../screens/auth';
import SimpleCrypto from "simple-crypto-js";
import { connect } from 'react-redux';
import imgposts from '../images/icons/posts.png';
import imghomework from '../images/icons/homework.png';
import imgmembers from '../images/icons/group.png';
import imgexams from '../images/icons/exams.png';
import {
  login
} from '../actions'


class SideBar extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}



	render(){
		
		const { path , state_, current } = this.props;

		return(
			<ul className="nav flex-column mt-2">
				<li className={(current === 'Posts') ? 'nav-item white d-flex mb-1' : 'nav-item d-flex mb-1'}>
					<Link to={{
						pathname:path.one+state_.course.c_name.replace(/\s/g,'-')+"/",
						course:state_.course.c_name.replace(/\s/g,'-'),
						state:{
							course:{courseId:state_.course.courseId,c_name:state_.course.c_name.replace(/\s/g,'-'),color:state_.course.color}
					}
					}} className={(current === 'Posts') ? 'nav-link text-dark font-weight-bold position-relative' : 'nav-link text-muted position-relative'} >Publicaciones</Link>
				</li>
				<li className={(current === 'Tasks') ? 'nav-item white d-flex mb-1' : 'nav-item d-flex mb-1'}>
					<Link to={{
						pathname:path.two+state_.course.c_name.replace(/\s/g,'-')+"/",
						course:state_.course.c_name.replace(/\s/g,'-'),
						state:{
							course:{courseId:state_.course.courseId,c_name:state_.course.c_name.replace(/\s/g,'-'),color:state_.course.color}
						}
					}} className={(current === 'Tasks') ? 'nav-link text-dark font-weight-bold position-relative' : 'nav-link text-muted position-relative'}>Tareas</Link>
				</li>
				<li className={(current === 'Members') ? 'nav-item white d-flex mb-1' : 'nav-item d-flex mb-1'}>
					<Link to={{
						pathname:path.three+state_.course.c_name.replace(/\s/g,'-')+"/",
						course:state_.course.c_name.replace(/\s/g,'-'),
						state: {
							course:{courseId:state_.course.courseId,c_name:state_.course.c_name.replace(/\s/g,'-'),color:state_.course.color}
						}
					}} className={(current === 'Members') ? 'nav-link text-dark font-weight-bold  position-relative' : 'nav-link text-muted position-relative'}>Miembros</Link>
				</li>
				<li className="nav-item">
					<a className="nav-link text-muted" href="#">Activades</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-muted" href="#">Examenes</a>
				</li>
			</ul>
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

export default connect( mapStateToProps , mapDispatchToProps )(SideBar)