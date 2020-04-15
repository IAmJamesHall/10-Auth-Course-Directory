import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
// props.match.params.courseId

export default class CourseDetails extends Component {

  state = {
    course: {}
  }

  async componentDidMount() {
    const { courseId } = this.props.match.params;
    const {data} = await axios.get(`http://localhost:5000/api/courses/${courseId}`)
    this.setState({course: data});
  }

  render() {
    const course = this.state.course;
    console.log(course);
    if (course) {
      return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                  <Link className="button" to="#">Delete Course</Link>
                </span>
                <Link className="button button-secondary" to="/">Return to List</Link></div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                {/* <p>By {course.User.firstName} {course.User.lastName}</p> */}
              </div>
              <div className="course--description"><p><ReactMarkdown source={course.description} /></p></div>
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
                    <ReactMarkdown source={course.materialsNeeded} />
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