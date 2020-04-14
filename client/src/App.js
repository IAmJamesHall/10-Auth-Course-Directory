import React, { Component } from 'react';
import axios from 'axios';
// const axios = require('axios');
import './global.css';

import { 
  BrowserRouter,
  Route,
  Switch,
  Redirect } from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Header from './components/Header';
import EditCourseDetails from './components/EditCourseDetails';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';

class App extends Component {
  state = {
    user: {}
  };

  userSignUp = (form) => {
    debugger;
    axios.post('http://localhost:5000/api/users', { ...form })
      .then((response) => {
        console.log(response);
      }, (error) => {
        debugger;
        console.log(error);
      });
  }

  userSignIn = () => {

  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            
            {/* view courses */}
            <Route exact path="/courses" component={Courses} />

            {/* create new course */}
            <Route exact path="/courses/new" render={props => (
              <EditCourseDetails purpose="create" />
            )} />

            {/* view individual course details */}
            <Route exact path="/courses/:courseId" 
              render={props => (
                <CourseDetails match={props.match} />)} />

            {/* update individual course details */}
            <Route exact path="/courses/:courseId/update"
              render={props => (
                <EditCourseDetails match={props.match} purpose="update"/>)} />

            {/* sign up for a user account */}
            <Route exact path="/signup" render={() => <UserSignUp userSignUp={this.userSignUp} />} />

            {/* sign in to an existing user account */}
            <Route exact path="/signin" component={UserSignIn} />



            {/* redirect '/' route to /courses */}
            <Route path="/" render={() => (
              <Redirect to="/courses" />
              )} />
            
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
