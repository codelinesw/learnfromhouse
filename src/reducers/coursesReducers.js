const initialState = {
	courses: [""],
	selectedCoureId: [""],
};
//alter table i_institution AUTO_INCREMENT = 1
export default function CoursesReducers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COURSES':
      return {...state,courses: action.payload} 
    case 'SET_SELECTED_COURSE_ID':
      return {...state,selectedCoureId: action.payload}
	case 'ADD_NEW_COURSE':
	  state.courses.unshift(action.payload);
	  return {...state,courses: state.courses}
	case 'COURSE_TO_UPDATE':
	  return {...state,courses:action.payload}  
	case 'DELETE_COURSE_ID':
	  console.log('id_to_delete ',action.payload);
	  console.log(state.courses);
	  state.courses.splice(action.payload,1);
	   return {...state,courses:state.courses}
    default:
      //console.log('default:state',state)
      return state;
  }
}
