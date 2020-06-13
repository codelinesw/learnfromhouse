const initialState = {
	balances:[""],
	selectBalanceId:0,
	isOptionVisible:false,
	IndexBalance:0,
	message:'',
	response:'',
	BalanceToUpdate:['']
};

export default function balanceClientReducers(state = initialState, action) {
  switch (action.type) {
    case 'GET_BALANCES':
      return {...state,balances: action.payload}
    case 'GET_SELECTED_BALANCE_ID':
      return {...state,selectBalanceId: action.payload}
		case 'SET_SELECT_BALANCE_INDEX':
			return {...state,IndexBalance:action.payload};
    case 'SET_BALANCE_ID':
    	return {...state,balances: action.payload}
		case 'ADD_BALANCE':
			state.balances.map((item,index) => {
				if(Object.values(item) == "empty"){
					state.balances.splice(index,1);
				}
			});
			state.balances.unshift(action.payload);
			//console.log(JSON.stringify(state.balances));
			return {...state,balances: state.balances}
		case 'DELETE_BALANCE_ID':
			console.log('index_to_delete ',action.payload);
			state.balances.splice(action.payload,1);
			return {...state,balances:state.balances}
		case 'BALANCE_TO_UPDATE':
		  return {...state,BalanceToUpdate:action.payload}
		case 'SET_MESSAGE':
			return {...state,message: action.payload}
	  case 'SET_RESPONSE':
			return {...state,response: action.payload}
		case 'SHOW_OPTIONS':
			console.log("showing menu to delete..." + action.payload);
			return {...state,isOptionVisible: action.payload}
    default:
      //console.log('default:state',state)
      return state;
  }
}
