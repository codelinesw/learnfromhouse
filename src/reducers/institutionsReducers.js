const initialState = {
	institutions: [""],
	selectedInstitutionId: [""],
};
//alter table i_institution AUTO_INCREMENT = 1
export default function InstitutionsReducers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_INSTITUTION':
      return {...state,institutions: action.payload} 
    case 'SET_SELECTED_INSTITUTION_ID':
      return {...state,selectedInstitutionId: action.payload}
	case 'ADD_NEW_INSTITUTION':
	  state.institutions.unshift(action.payload);
	  return {...state,institutions: state.institutions}
	case 'INSTITUTION_TO_UPDATE':
	  return {...state,institutions:action.payload}  
	case 'DELETE_INSTITUION_ID':
	  console.log('id_to_delete ',action.payload);
	  console.log(state.institutions);
	  state.institutions.splice(action.payload,1);
	   return {...state,institutions:state.institutions}
    default:
      //console.log('default:state',state)
      return state;
  }
}
