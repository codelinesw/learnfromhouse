

export function login(user){
  console.log("ACTIONS::LOGIN",user);
  return {
    type: 'LOGIN',
    payload:user
  }
}

//Get all data to user selected
export function getSelectedUserId(UserId) {
  console.log("ACTIONS::GET_SELECTED_USER_ID",UserId)
  return {
    type: 'GET_SELECTED_USER_ID',
    payload: UserId
  }
}


export function addInstitution(institution){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'ADD_INSTITUTION',
    payload: institution
  }
}

export function addNewInstitution(institution){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'ADD_NEW_INSTITUTION',
    payload: institution
  }
}


export function UpdateInstitution(institution){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'INSTITUTION_TO_UPDATE',
    payload: institution
  }
}

export function DeleteInstitution(institution){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'DELETE_INSTITUION_ID',
    payload: institution
  }
}

//Actions for groups
export function addGroup(group){
  //console.log("ACTIONS::ADD_GROUP",group)
  return {
    type: 'ADD_GROUP',
    payload: group
  }
}

export function addNewGroup(group){
  //console.log("ACTIONS::ADD_NEW_GROUP",group)
  return {
    type: 'ADD_NEW_GROUP',
    payload: group
  }
}


export function UpdateGroup(group){
  //console.log("ACTIONS::GROUP_TO_UPDATE",group)
  return {
    type: 'GROUP_TO_UPDATE',
    payload: group
  }
}

export function DeleteGroup(group){
  //console.log("ACTIONS::DELETE_GROUP_ID",group)
  return {
    type: 'DELETE_GROUP_ID',
    payload: group
  }
}

export function LoadTeachers(group){
  //console.log("ACTIONS::ADD_GROUP",group)
  return {
    type: 'ADD_TEACHERS',
    payload: group
  }
}


export function AddNewTeacher(teacher){
  //console.log("ACTIONS::ADD_GROUP",teacher)
  return {
    type: 'ADD_NEW_TEACHER',
    payload: teacher
  }
}

export function UpdateTeacher(teacher){
  //console.log("ACTIONS::ADD_GROUP",teacher)
  return {
    type: 'UPDATE_TEACHER',
    payload: teacher
  }
}

export function DeleteTeacher(teacher){
  //console.log("ACTIONS::ADD_GROUP",teacher)
  return {
    type: 'DELETE_TEACHER',
    payload: teacher
  }
}


export function addSpecialties(spe){
  return {
    type: 'ADD_SPECIALTIES',
    payload: spe
  }
}

/**
 * This methods are for courses manager
 */

export function addCourses(courses){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'ADD_COURSES',
    payload: courses
  }
}

export function addNewCourse(course){
  console.log("ACTIONS::ADD_COURSE",course)
  return {
    type: 'ADD_NEW_COURSE',
    payload: course
  }
}


export function UpdateCourse(course){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'COURSE_TO_UPDATE',
    payload: course
  }
}

export function DeleteCourse(course){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'DELETE_COURSE_ID',
    payload: course
  }
}

/**
 * This methods are for tasks manager
 */

export function addTasks(task){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'ADD_TASKS',
    payload: task
  }
}

export function addNewTask(task){
  console.log("ACTIONS::ADD_TASK",task)
  return {
    type: 'ADD_NEW_TASK',
    payload: task
  }
}


export function UpdateTask(task){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'TASK_TO_UPDATE',
    payload: task
  }
}

export function DeleteTask(task){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'DELETE_TASK_ID',
    payload: task
  }
}


export function addStudents(student){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'ADD_STUDENTS',
    payload: student
  }
}

export function ChangeRute(route){
  console.log("CHANGE_RUTE::",route);
  return {
    type: 'CHANGE_RUTE',
    payload: route
  }
}

export function DeleteStudent(student){
  //console.log("ACTIONS::ADD_INSTITUTION",institution)
  return {
    type: 'DELETE_STUDENT',
    payload: student
  }
}
