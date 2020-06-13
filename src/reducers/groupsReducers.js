
const initialState = {
	teachers:[''],
	groups: [''],
	selectedgroupId: [''],
};
//alter table g_group AUTO_INCREMENT = 1
export default function GroupsReducers(state = initialState, action) {
  switch (action.type) {
  	case 'ADD_TEACHERS':
      return {...state,teachers: action.payload}
    case 'ADD_GROUP':
      return {...state,groups: action.payload} 
    case 'SET_SELECTED_GROUP_ID':
      return {...state,selectedgroupId: action.payload}
	case 'ADD_NEW_GROUP':
	  state.groups.unshift(action.payload);
	  return {...state,groups: state.groups}
	case 'GROUP_TO_UPDATE':
	  return {...state,groups:action.payload}  
	case 'DELETE_GROUP_ID':
	  console.log('id_to_delete ',action.payload);
	  console.log(state.groups);
	  state.groups.splice(action.payload,1);
	   return {...state,groups:state.groups}
    default:
      //console.log('default:state',state)
      return state;
  }
}
