import React from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route
} from  'react-router-dom';
import { ProtectedRoute } from './screens/protectedRoute';
import Login from './screens/Login';
import Portal from './screens/Portal';
import Courses from './screens/Courses';
import ViewCourse from './screens/ViewCourse';
import Tasks from './screens/Tasks';
import ViewTask from './screens/ViewTask';
import Institutions from './screens/Institutions';
import Groups from './screens/Groups';
import AddGroup from './screens/AddGroup';
import Teachers from './screens/Teachers';
import Students from './screens/Students';
import AddUsers from './screens/AddUsers';
import AddTasks from './screens/AddTasks';
import Members from './screens/Members';
import AddMembers from './screens/AddMembers';
import { connect } from 'react-redux';
import {
  login
} from './actions'


class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
 
    }
  }

  render(){
    let auth = sessionStorage.getItem('duct');
    return (
      <Router>
        <Switch>
          <Route exact 
            path="/"
            component={Login}
           >
          </Route>
          <Route 
            path="/portal/"
            component={Portal}
          />
         <ProtectedRoute
            path="/courses"
            isAuth={auth}
            component={Courses}
          />
          <ProtectedRoute
            path="/viewcourse"
            isAuth={auth}
            component={ViewCourse}
          />
         <ProtectedRoute
            path="/tasks"
            isAuth={auth}
            component={Tasks}
          />
          <ProtectedRoute
            path="/viewtask"
            isAuth={auth}
            component={ViewTask}
          />
          <ProtectedRoute
            path="/institutions"
            isAuth={auth}
            component={Institutions}
          />
          <Route
            path="/teachers"
            isauthenticated={this.props.users.isauthenticated}
            component={Teachers}
          />
          <Route
            path="/students"
            isauthenticated={this.props.users.isauthenticated}
            component={Students}
          />
          <ProtectedRoute
            path="/groups"
            isAuth={auth}
            component={Groups}
          />
          <ProtectedRoute
            path="/addgroup/"
            isAuth={auth}
            component={AddGroup}
          />
          <ProtectedRoute
            path="/addusers/"
            isAuth={auth}
            component={AddUsers}
          />
          <ProtectedRoute
            path="/addtask/"
            isAuth={auth}
            component={AddTasks}
          />
          <ProtectedRoute
            path="/members/"
            isAuth={auth}
            component={Members}
          />
        </Switch>
      </Router>
  );
  }
}


const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  login
};

export default connect( mapStateToProps , mapDispatchToProps )(App)
