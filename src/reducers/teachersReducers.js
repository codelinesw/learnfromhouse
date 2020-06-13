const initialState = {
	institutions: [""],
	specialties:[""],
	selectedInstitutionId: [""],
	teachers: [""],
	selectedTeacherId: [""],
};
//alter table i_institution AUTO_INCREMENT = 1
export default function TeachersReducers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_INSTITUTION':
      return {...state,institutions: action.payload}
    case 'ADD_SPECIALTIES':
      return {...state,specialties:action.payload}
    case 'SET_SELECTED_INSTITUTION_ID':
    case 'ADD_TEACHERS':
      return {...state,teachers: action.payload} 
    case 'SET_SELECTED_TEACHER_ID':
      return {...state,selectedTeacherId: action.payload}
	case 'ADD_NEW_TEACHER':
	  state.teachers.unshift(action.payload);
	  return {...state,teachers: state.teachers}
	case 'TEACHER_TO_UPDATE':
	  return {...state,teachers:action.payload}  
	case 'DELETE_TEACHER':
	  console.log('id_to_delete ',action.payload);
	  console.log(state.teachers);
	  state.teachers.splice(action.payload,1);
	   return {...state,teachers:state.teachers}
    default:
      //console.log('default:state',state)
      return state;
  }
}
