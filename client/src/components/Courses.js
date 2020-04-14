import React, { Component } from 'react';
import axios from 'axios';

export default class Courses extends Component {

  state = {
    courseComponents: []
  }
  async componentDidMount() {
    const courses = await axios.get('http://localhost:5000/api/courses');
    const courseComponents = courses.data.map(course => (
      <div className="grid-33"><a class="course--module course--link" href={`/courses/${course.id}`}>
        <h4 class="course--label">Course</h4>
        <h3 class="course--title">{course.title}</h3>
      </a></div>
    ))

    this.setState(() => ({courseComponents}));
  }

  render() {
    return (
      <div class="bounds">
        {this.state.courseComponents}
      </div>
    )
  }
}