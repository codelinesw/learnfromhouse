import { combineReducers } from 'redux'
import UserReducers from './usersReducers'
import InstitutionsReducers from './institutionsReducers'
import GroupsReducers from './groupsReducers'
import TeachersReducers from './teachersReducers'
import CoursesReducers from './coursesReducers'
import TasksReducers from './tasksReducers'
import StudentsReducers from './studentsReducers'


export default combineReducers({
	users: UserReducers,
	institutions:InstitutionsReducers,
	groups:GroupsReducers,
	teachers: TeachersReducers,
	courses: CoursesReducers,
	tasks: TasksReducers,
	students:StudentsReducers
})
