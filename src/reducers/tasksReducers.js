const initialState = {
	tasks: [""],
	selectedTasksId: [""],
};
//alter table i_institution AUTO_INCREMENT = 1
export default function TasksReducers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASKS':
      return {...state,tasks: action.payload} 
    case 'SET_SELECTED_TASK_ID':
      return {...state,selectedTasksId: action.payload}
	case 'ADD_NEW_TASK':
	  state.tasks.unshift(action.payload);
	  return {...state,tasks: state.tasks}
	case 'TASK_TO_UPDATE':
	  return {...state,tasks:action.payload}  
	case 'DELETE_TASK_ID':
	  console.log('id_to_delete ',action.payload);
	  console.log(state.tasks);
	  state.tasks.splice(action.payload,1);
	   return {...state,tasks:state.tasks}
    default:
      //console.log('default:state',state)
      return state;
  }
}
