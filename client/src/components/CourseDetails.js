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
    const {data} = await axios.get(`http://localhost:5000/api/courses/${courseId}`)
    this.setState({course: data});
  }

  createList = (text) => {
    if (text) {
      let list = text.split('* ');
      const jsx = list.map(line => (line.length > 1 ? <li>{line}</li> : null));
      return jsx;
    } else {
      return text;
    }
  }


  render() {
    const course = this.state.course;
    console.log(course);
    if (course) {
      return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100"><span><a className="button" href={`/courses/${course.id}/update`}>Update Course</a><a className="button" href="#">Delete Course</a></span><a
                className="button button-secondary" href="/">Return to List</a></div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                {/* <p>By {course.User.firstName} {course.User.lastName}</p> */}
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
                    <p>{this.createList(course.materialsNeeded)}</p>
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