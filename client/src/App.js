import React, { Component } from 'react';

import axios from 'axios';
import base64 from 'base-64';
import Cookies from 'universal-cookie';


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
import UserSignOut from './components/UserSignOut';


const cookies = new Cookies();




class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const emailAddress = cookies.get('emailAddress');
    const password = cookies.get('password');
    this.userSignIn({ emailAddress, password })
  }

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

  userSignIn = (form) => {
    const { emailAddress, password } = form;
    axios.get('http://localhost:5000/api/users', {
      headers: {
        'Authorization': `Basic ${base64.encode(`${emailAddress}:${password}`)}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log('logging in: ', response);
        response.data.user.password = password;
        this.setState({user: response.data.user});
        

        cookies.set('emailAddress', emailAddress, { path: '/' });
        cookies.set('password', password, { path: '/' })
        return true;
      }
    })
    .catch(error => {
      return false;
    })
  }

  userSignOut = () => {
    this.setState({user: {}}); 
  }

  saveCourse = (course, purpose) => {
    if (purpose === "create") {
      const { emailAddress, password } = this.state.user;
      const { 
        title, 
        description,
        estimatedTime,
        materialsNeeded } = course;
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/courses',
        headers: {
          'Authorization': `Basic ${base64.encode(`${emailAddress}:${password}`)}`
        },
        data: {
          title,
          description,
          estimatedTime,
          materialsNeeded
        }
      })


    } else if (purpose === "update") {
      console.log('going to update');
      const { emailAddress, password } = this.state.user;
      if (course.User.emailAddress === emailAddress) {
        const { 
          title, 
          description,
          estimatedTime,
          materialsNeeded } = course;

        axios({
          method: "put",
          url: `http://localhost:5000/api/courses/${course.id}`,
          headers: {
            'Authorization': `Basic ${base64.encode(`${emailAddress}:${password}`)}`
          },
          data: {
            title,
            description,
            estimatedTime,
            materialsNeeded
          }
        })
        .then(response => {
          return { response: {
            status: 204,
            message: "Update succeeded"
          }}
        })
      } else { //user does not have permission to update course
        return {response: {
          status: 401,
          message: "User does not own this course"
        }}
      }
    }
  }



  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header user={this.state.user} />
          <Switch>
            
            {/* view courses */}
            <Route exact path="/courses" render={() => <Courses user={this.state.user}/>} />

            {/* create new course */}
            <Route exact path="/courses/new" render={props => (
              <EditCourseDetails purpose="create" saveCourse={this.saveCourse} />
            )} />

            {/* view individual course details */}
            <Route exact path="/courses/:courseId" 
              render={props => (
                <CourseDetails match={props.match} 
                user={this.state.user} />)} />

            {/* update individual course details */}
            <Route exact path="/courses/:courseId/update"
              render={props => (
                <EditCourseDetails 
                  match={props.match} 
                  purpose="update" 
                  saveCourse={this.saveCourse}
                  user={this.state.user} />)} />

            {/* sign up for a user account */}
            <Route exact path="/signup" render={() => <UserSignUp userSignUp={this.userSignUp} />} />

            {/* sign in to an existing user account */}
            <Route exact path="/signin" render={(props) => <UserSignIn userSignIn={this.userSignIn} history={props.history} />} />

            {/* sign out user */}
            <Route exact path="/signout" render={() => <UserSignOut userSignOut={this.userSignOut} cookies={cookies} /> } />


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
