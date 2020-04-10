import React, { Component } from 'react';
import axios from 'axios';
import './global.css';

import { 
  BrowserRouter,
  Route,
  Switch,
  Redirect } from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Header from './components/Header';

class App extends Component {
  state = {
    courses: []
  };

  async componentDidMount() {
    const courses = await axios.get('http://localhost:5000/api/courses');
    const courseTitles = courses.data.map(course => <li>{course.title}</li>);
    this.setState({ courses: courseTitles });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/:courseId" 
              render={props => (
              <CourseDetails match={props.match}/>) } />
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
