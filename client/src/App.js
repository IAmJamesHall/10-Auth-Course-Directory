import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

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
      <div className="App">
      <ul>{this.state.courses}</ul>
    </div>
    )
  }
}

export default App;
