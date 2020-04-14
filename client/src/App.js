import React, { Component } from 'react';
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

class App extends Component {
  state = {
    courses: [],
    user: {}
  };

  // async componentDidMount() {
  //   const courses = await axios.get('http://localhost:5000/api/courses');
  //   const courseTitles = courses.data.map(course => <li>{course.title}</li>);
  //   this.setState({ courses: courseTitles });
  // }

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
