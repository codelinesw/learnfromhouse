import routes from '../request/routes';
const initialState = {
	students: [""],
	selectedStudentId: [""],
  	route:routes.inscriptions.listforinstitution
};
//alter table i_institution AUTO_INCREMENT = 1
export default function StudentsReducers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_STUDENTS':
      return {...state,students: action.payload}
    case 'SET_SELECTED_STUDENT_ID':
	case 'CHANGE_RUTE':
	  return {...state,route: state.students}
	case 'ADD_NEW_STUDENT':
	  state.students.unshift(action.payload);
	  return {...state,students: state.students} 
	case 'DELETE_STUDENT':
	  console.log('id_to_delete ',action.payload);
	  console.log(state.students);
	  state.students.splice(action.payload,1);
	   return {...state,students:state.students}
    default:
      //console.log('default:state',state)
      return state;
  }
}
