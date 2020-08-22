import React from 'react';
import {
 Redirect,
 Link
} from  'react-router-dom';
import SimpleCrypto from "simple-crypto-js";
import Header from '../components/header';
import { connect } from 'react-redux';
import routes from '../request/routes';
import services from '../request/services';
import {
  LoadTeachers,
  addNewGroup,
  UpdateGroup,
} from '../actions'

class AddQuestions extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	taskId: this.props.location.state === undefined ? '0' : (this.props.location.state.task !== undefined ? this.props.location.state.task.taskId : '0'),
	  	courseId: this.props.location.state === undefined ? '0' : (this.props.location.state.task !== undefined ? this.props.location.state.task.courseId : '0'),
      	title:this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? '' : 's'),
      	description:this.props.location.state === undefined ? '' : (this.props.location.state.task !== undefined ? '' : ''),
      	isLoaded:false,
      	typeclass:'',
      	msg:'',
      	showAlert:false,
      	action:this.props.location.state === undefined ? 'ADD' : (this.props.location.state.action !== undefined ? this.props.location.state.action : 'ADD'),
      	nameFile:'Selecciona un archivo',
      	showOtherOptions:false,
      	timelimit:'5',
      	showresult:false,
      	randomquestions:false,
      	kindofquestions:'1',
      	ansone:'',
      	anstwo:'',
      	ansthree:'',
      	ansfour:'',
      	ansfive:'',
      	questions:[
      		{
      			'Questions': [
	      			{
	      				'Letter': 'A',
	      				ans:'ansone'
	      			},
      				{
      					'Letter': 'B',
      					ans:'anstwo'
      				},
      				{
      					'Letter': 'C',
      					ans:'ansthree'
      				},
      				{
      					'Letter': 'D',
      					ans:'ansfour'
      				},
      				{
      					'Letter': 'E',
      					ans:'ansfive'
      				},      						    				
      			]
      		},
      		{
      			'Questions': [
	      			{
	      				'Letter': 'A',
	      				'boolean_':'VERDADERO',
	      				ans:'ansone'
	      			},
      				{
      					'Letter': 'B',
      					'boolean_':'FALSO',
      					 ans:'anstwo'
      				}     						    				
      			]
      		},
      	],
      	answers:'',
      	asks:[
      		{
      			questions:'Pregunta #1'
      		}
      	]
	  };

	  this.showing = false;
	  this.isMounted_ = false;

	}

	componentDidMount(){
		if(typeof file === 'object'){
	       this.setState({nameFile:this.state.file.name});
	    }else{

	        if(this.state.file != 'undefined' || this.state.file != undefined != null){
	        	if(this.state.file != '' && this.state.file != undefined && this.state.file != null){
	        		let file_ = this.state.file.split('#')[1];
	        		this.setState({nameFile:file_});
	        	}else{
	        		this.setState({nameFile:'Selecciona un archivo'});
	        	}
	        }else{
	        	this.setState({nameFile:'Selecciona un archivo'});
	        }
	    }
	}

	componentWillUnmount(){
		this.isMounted_ = false;
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

	validateAction(){
		return (this.props.location.state === undefined ? false : this.props.location.state.task !== undefined ? true : false)
	}

	getFormatDate(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('-');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[0]+"/"+ newdate[1]+"/"+ newdate[2];
    	return formatdate;
	}

	saveData(data){
		this.setState({isLoaded:true});
		let url = (this.state.action !== "ADD") ? routes.questions.add : routes.questions.add;
		services.requestUpload(url,data)
    	.then(res => {
			console.log(res);
		  	if(res !== "failed"){
		  		let text = (this.state.action !== "ADD") ? 'actualizado esta' : 'crear esta nueva';
		  		this.setState({showAlert:true,msg:'Felicidades ha '+text+' evaluacion correctamente',typeclass:'alert-success'});
		  	}else{
		  		let text = (this.state.action !== "ADD") ? 'actualizado esta' : 'crear esta nueva';
		  		this.setState({showAlert:true,msg:'Upps! Ah ocurrido un problema al intentar '+text+' evaluacion, vuelva a intentarlo mas tarde',typeclass:'alert-danger'});
		  	}
	    },
		(error) => {
		  this.setState({
		  	showAlert:true,
		  	msg:'Upps! Al parecer no tienes conexion a internet, vuelva a intentarlo luego para poder crear un nueva tarea',
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
	validateForm(ev){
		ev.preventDefault();
		const { kindofquestions, description, answers, ansone, anstwo, ansthree, ansfour, ansfive } = this.state;
		const { match } = this.props;
		console.log('sending... ' + ansone +  ' ' + anstwo);
		if(kindofquestions == 2){
			if(kindofquestions.length == 0 && description.length == 0 && answers.length == 0 ){
				this.setState({showAlert:true,msg:'Por favor ingrese un pregunta y sus debidas respuestas para continuar',typeclass:'alert-danger'});
			}else if(kindofquestions.length == 0){
				this.setState({showAlert:true,msg:'Por favor seleccione el tipo de pregunta primero',typeclass:'alert-danger'});
			}else if(description.length == 0){
				this.setState({showAlert:true,msg:'Por favor ingrese una pregunta para continuar',typeclass:'alert-danger'});
			}else if(answers.length == 0){
				this.setState({showAlert:true,msg:'Por favor ingrese una respuesta por lo menos',typeclass:'alert-danger'});
			}else{
				this.setState({showAlert:false,msg:'',typeclass:'',showOtherOptions:true});
				let data = new FormData();
				data.append('question',description);
		        data.append('ansone',ansone);
		        data.append('anstwo',anstwo);
		        data.append('ansthree',ansthree);
		        data.append('ansfour',ansfour);
		        data.append('ansfive',ansfive);
		        data.append('qtype',kindofquestions);
		        data.append('coans',answers);
		        data.append('evaId',match.params ? (match.params.ev) ? match.params.ev : '0' : '0');
				this.saveData(data);
			}
		}else{
			if(kindofquestions.length == 0 && description.length == 0 && ansone.length == 0 && anstwo == 0){
				this.setState({showAlert:true,msg:'Por favor ingrese un pregunta y sus debidas respuestas para continuar',typeclass:'alert-danger'});
			}else if(kindofquestions.length == 0){
				this.setState({showAlert:true,msg:'Por favor seleccione el tipo de pregunta primero',typeclass:'alert-danger'});
			}else if(description.length == 0){
				this.setState({showAlert:true,msg:'Por favor ingrese una pregunta para continuar',typeclass:'alert-danger'});
			}else if(ansone.length == 0){
				this.setState({showAlert:true,msg:'Por favor ingrese dos respuesta por lo menos',typeclass:'alert-danger'});
			}else if(anstwo.length == 0){
				this.setState({showAlert:true,msg:'Por favor ingrese dos respuesta por lo menos',typeclass:'alert-danger'});
			}else{
				this.setState({showAlert:false,msg:'',typeclass:'',showOtherOptions:true});
				let data = new FormData();
				data.append('question',description);
		        data.append('ansone',ansone);
		        data.append('anstwo',anstwo);
		        data.append('ansthree',ansthree);
		        data.append('ansfour',ansfour);
		        data.append('ansfive',ansfive);
		        data.append('qtype',kindofquestions);
		        data.append('coans',answers);
		        data.append('evaId',match.params ? (match.params.ev) ? match.params.ev : '0' : '0');
				this.saveData(data);
			}
		}
		
	}

	showOtherOptions(ev){
		ev.preventDefault();
		const { title, description, timelimit } = this.state;
		if(title.length == 0 && description.length == 0 && timelimit.length == 0){
			this.setState({showAlert:true,msg:'Por favor complete todos los campos para continuar',typeclass:'alert-danger'});
		}else if(title.length == 0){
			this.setState({showAlert:true,msg:'Por favor ingrese el titulo de la evaluacion',typeclass:'alert-danger'});
		}else if(description.length == 0){
			this.setState({showAlert:true,msg:'Por favor ingrese la descripccion de la evaluacion',typeclass:'alert-danger'});
		}else if(timelimit.length == 0 || timelimit == ''){
			this.setState({showAlert:true,msg:'Por favor ingrese el tiempo de duracion para la evaluacion',typeclass:'alert-danger'});
		}else{
			this.setState({showAlert:false,msg:'',typeclass:'',showOtherOptions:true});
		}
		
	}

	goBack(){
		this.setState({showOtherOptions:false});
	}

	handleChange(ev,item,index_){
		const { answers, kindofquestions } = this.state;
		let inputs = document.querySelectorAll('._radios_');
		let ans = inputs[index_].parentElement.children[0].value;
		let text = inputs[index_].parentElement.parentElement.parentElement.children[1].textContent;
		let state = inputs[index_].parentElement.children[0].dataset.question;
		[].forEach.call(inputs, (item , index) => {
			if(inputs[index_].parentElement.children[0].checked){
				if(index_ != index){
					inputs[index_].parentElement.children[0].checked = false;
					let obj ='[{"'+state+'":"'+text+'","answers":"'+ans+'"}]';					
					if(kindofquestions == 2){
						this.setState(JSON.parse(obj)[0]);
					}else{
						this.setState({answers:ans});
					}
				}
			}
		});
	}
	_handleChange_(ev,ans_){
		let obj ='[{"'+ans_+'":"'+ev.target.value+'"}]';
		this.setState(JSON.parse(obj)[0]);
	}
	_renderItems_(item,index){

		const { kindofquestions, answers } = this.state;
		let ans_ = item.ans;
		if(kindofquestions == 1){
			return(
				<li className="list-group-item d-flex p-0" key={index+1}>
					<p className="text-dark position-relative mr-2 ml-2" style={{top:'13px'}}>{item.Letter}</p>
					<div className="input-group mb-3 pr-5 position-relative" style={{top:'7px'}}>													  
						<div className="input-group-prepend bg-transparent border-0">
							<div className="input-check mr-2 mt-2 ml-2">
      							<input type="checkbox" aria-label="Checkbox for following text input" className="checkbox_" id={`randomquestions_${item.Letter}`} onChange={(ev) => this.setState({randomquestions:ev.target.checked})}/>
      							<label htmlFor={`randomquestions_${item.Letter}`} className="lcheckbox bg_primary"><i className="fas fa-check"></i></label>
    						</div>
						</div>
						<input type="text" className="form-control border-0 without-border" aria-label="Text input with checkbox" placeholder="Ingrese su respuesta" onChange={(ev) => this.setState({ans_:ev.target.value})} />
					</div>
				</li>
			);
		}else if(kindofquestions == 3 || kindofquestions == 2){
			return(
				<li className="list-group-item d-flex p-0" key={index+1}>
					<p className="text-dark position-relative mr-2 ml-2" style={{top:'13px'}}>{item.Letter}</p>
					<div className="input-group mb-3 pr-5 position-relative" style={{top:'7px'}}>													  
						<div className="input-group-prepend bg-transparent border-0">
							<div className="input-radio mr-2 mt-2 ml-2">
	      						<input type="radio" aria-label="Checkbox for following text input" className="radio_" id={`randomquestions_${index}`} value={item.Letter} data-question={item.ans} onChange={(ev) => this.handleChange(ev,item.Letter,index)}/>
	      						<label htmlFor={`randomquestions_${index}`} className={this.state.answers === item.Letter ? 'radio bg_primary _active_ _radios_' : 'radio bg_primary _radios_'}></label>
	    					</div>					
						</div>
						{kindofquestions == 3 ?
						<input type="text" className="form-control border-0 without-border" aria-label="Text input with checkbox" placeholder="Ingrese su respuesta" onChange={(ev) => this._handleChange_(ev,ans_)} />
						: <p className="text-dark position-relative font-weight-bold text-answer" style={{top:'6px',left:'2px'}}>{item.boolean_}</p>}
						
					</div>
				</li>
			);
		}else{
			return(
				<li className="list-group-item d-flex p-0" key={index+1}>
					<p className="text-dark position-relative mr-2 ml-2" style={{top:'13px'}}>{item.Letter}</p>
					<div className="input-group mb-3 pr-5 position-relative" style={{top:'7px'}}>													  
						<div className="input-group-prepend bg-transparent border-0">
							<div className="input-check mr-2 mt-2 ml-2">
      							<input type="checkbox" aria-label="Checkbox for following text input" className="checkbox_" id={`randomquestions_${item.Letter}`} onChange={(ev) => this.setState({randomquestions:ev.target.checked})}/>
      							<label htmlFor={`randomquestions_${item.Letter}`} className="lcheckbox bg_primary"><i className="fas fa-check"></i></label>
    						</div>
						</div>
						<input type="text" className="form-control border-0 without-border" aria-label="Text input with checkbox" placeholder="Ingrese su respuesta" onChange={(ev) => this.setState({ans_:ev.target.value})}/>
					</div>
				</li>
			);
		}
	}

	addQuestion(ev){
		ev.preventDefault();
		const { asks } = this.state;
		if(this.state.asks.length > 0){
			let questions  = asks;
			questions.push({questions:'Pregunta #'+(questions.length+1)});
			[].forEach.call(document.querySelectorAll('.link-question'), (item, index) => {
				if( index < questions.length-1 ){
					item.classList.remove('active');
				}
			});						
			this.setState({
				asks:questions,
				kindofquestions:'1', 
				description:'',
				ansone:'',
				anstwo:'',
				ansthree:'',
				ansfour:'',
				ansfive:''
			});
		}
	}
	//g_groups_ibfk_1 - c_courses_ibfk_1
	render(){
		const { teacherId, courseId, title, description, startdate,enddate, typeclass, msg, showAlert, isLoaded, showOtherOptions, timelimit,randomquestions, showresult, kindofquestions, asks } = this.state;
		return(
			<div>
				<Header currentSection="cursos"/>
				<div className="container-fluid mt-3 col-md-11">
					  <section className="content w-100">
					  		<div className="col d-flex w-100">
					  		 <div className="col col-md-3">
					  		 	<div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
								      <Link className="nav-link" id="v-pills-home-tab" data-toggle="pill" to="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Detalles del examen</Link>
								      {asks.map(( item, index ) => {
								      	console.log(item);
								      	return <Link className="nav-link active link-question" id="v-pills-profile-tab" data-toggle="pill" to="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false" key={index+1}>{item.questions}</Link>
								      })}								      
								      <button type="button" className="nav-link btn btn btn-outline-primary mb-2 mt-2" onClick={(ev) => this.addQuestion(ev)}>Agregar pregunta<i className="fas fa-plus ml-2"></i></button>
								      <button type="button" className="nav-link btn btn btn-primary" onClick={(ev) => this.validateForm(ev)}>Guardar Cambios</button>
    							 </div>
					  		 </div>
					  		 <div className="col">
					  		 	<div className="card mb-5">
							  		<div className="card-header">
										<h5>Agrega una nueva pregunta</h5>
									</div>
									<div className="card-body">
										{showAlert ? <div className={`alert ${typeclass}`}>{msg}</div> : null}
										<form>	
												<div className="form-group">
														<select className="custom-select" defaultValue={kindofquestions} onChange={(ev) => this.setState({kindofquestions:ev.target.value})}>
														  <option value="DEFAULT">Escoje el tipo de pregunta</option>
														  <option value="1">Seleccion multiple</option>
														  <option value="3">Respuesta unica</option>
														  <option value="2">Verdadero o falso</option>
														</select>
												</div>
												<div className="form-group">
												  <label htmlFor="exampleInputDescription">Pregunta</label>
												  <textarea className="form-control" id="exampleInputDescription" rows="2" placeholder="Ingrese el texto de la pregunta" value={description} onChange={(text) => this.setState({description:text.target.value})}></textarea>
												</div>
												<hr className="divider" />
												<div className="form-group">
													<div className="card p-0 border-0">
														<div className="card-header p-0 bg-transparent border-0">
															<div className="row p-0">
																<p className="text-dark position-relative ml-5" style={{top:'8px'}}>#</p>
																<p className="text-dark position-relative mr-3 ml-3" style={{top:'8px'}}>Correcta</p>
																<p className="text-dark position-relative" style={{top:'8px'}}>Pregunta</p>
															</div>
														</div>
														<div className="card-body">
															<ul className="list-group">
																{kindofquestions == 1 || kindofquestions == 3 || kindofquestions === 'DEFAULT'
																? this.state.questions[0].Questions.map(( item,index ) =>{
																	return this._renderItems_(item,index);
																})
																: this.state.questions[1].Questions.map(( item , index ) => {
																	return this._renderItems_(item,index);
																})														
															}																									
															</ul>														
														</div>
													</div>										
												</div>
										  </form>
									</div>
								{isLoaded ? <div className="container_circle_preloader">
			               <div className="child_container_">
			                 <div className="circle"><div className="child"></div></div>
			               </div>
			         </div> : null}
					  		</div>
					  		 </div>
					  		</div>
					  </section>
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
  LoadTeachers,
  addNewGroup,
  UpdateGroup,
};

export default connect( mapStateToProps , mapDispatchToProps )(AddQuestions)
