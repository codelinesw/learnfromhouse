const initialState = {
	users: [""],
  isauthenticated:false,
	selectedUserId: [""]
};

export default function UserReducers(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {...state,isauthenticated: action.payload}
    case 'GET_CLIENTS':
      return {...state,data: action.payload} 
    case 'SET_SELECTED_USER_ID':
      return {...state,selectedUserId: action.payload}
    case 'SET_USER_TO_ID':
    	 return {...state,data: action.payload}
		case 'ADD_USER':
			state.data.unshift(action.payload);
			//console.log(JSON.stringify(state.data));
			 return {...state,data: state.data}
		case 'DELETE_USER_ID':
			console.log('id_to_delete ',action.payload);
			state.data.splice(action.payload,1);
			return {...state,data:state.data}
    default:
      //console.log('default:state',state)
      return state;
  }
}
