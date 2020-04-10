import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
// props.match.params.courseId

export default class CourseDetails extends Component {

  state = {
    course: {}
  }

  async componentDidMount() {
    const { courseId } = this.props.match.params;
    const course = await axios.get(`http://localhost:5000/api/courses/${courseId}`)
    this.setState({course});
  }


  render() {
    const course = this.state.course.data;
    console.log(course);
    if (course) {
      return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                className="button button-secondary" href="index.html">Return to List</a></div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>By {course.User.firstName} {course.User.lastName}</p>
              </div>
              <div className="course--description"><p>{course.description}</p></div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{course.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                      <li>1/2 x 3/4 inch parting strip</li>
                      <li>1 x 2 common pine</li>
                      <li>1 x 4 common pine</li>
                      <li>1 x 10 common pine</li>
                      <li>1/4 inch thick lauan plywood</li>
                      <li>Finishing Nails</li>
                      <li>Sandpaper</li>
                      <li>Wood Glue</li>
                      <li>Wood Filler</li>
                      <li>Minwax Oil Based Polyurethane</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
    
  }
}