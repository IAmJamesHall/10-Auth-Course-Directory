import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Courses extends Component {
  state = {
    courseComponents: [],
  };

  async componentDidMount() {
    // get course list
    const courses = await axios.get(`${this.props.serverLocation}/api/courses`);

    // map courses to a list
    const courseComponents = courses.data.map((course) => (
      <div className="grid-33" key={course.id}>
        <Link
          className="course--module course--link"
          to={`/courses/${course.id}`}
        >
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      </div>
    ));

    // save courses in state
    this.setState(() => ({ courseComponents }));
  }

  // give the user the ability to create a course
  addCourseButton = () => {
    // only give the option to add a course if the user is signed in
    if (this.props.user.authenticated) {
      return (
        <div className="grid-33">
          <Link
            className="course--module course--add--module"
            to="/courses/new"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <div className="bounds">
        {this.state.courseComponents}
        {this.addCourseButton()}
      </div>
    );
  }
}
