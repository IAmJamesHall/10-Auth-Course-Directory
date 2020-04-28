import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
// props.match.params.courseId

export default class CourseDetails extends Component {
  state = {
    course: {},
  };

  async componentDidMount() {
    const { courseId } = this.props.match.params;
    const { data } = await axios.get(
      `${this.props.serverLocation}/api/courses/${courseId}`
    );
    this.setState({ course: data });
  }

  /**
   * determine if user owns the current course to show the update/delete buttons
   */
  isUserOwner() {
    try {
      const user = this.state.course.User;

      const authenticatedUser = this.props.user.userId;
      const ownerUser = user.id;
      if (authenticatedUser === ownerUser) {
        return (
          <span>
            <Link
              className="button"
              to={`/courses/${this.state.course.id}/update`}
            >
              Update Course
            </Link>
            <Link
              className="button"
              to={`/courses/${this.state.course.id}/delete`}
            >
              Delete Course
            </Link>
          </span>
        );
      } else {
        return <span></span>;
      }
    } catch {
      return <span></span>;
    }
  }

  render() {
    const course = this.state.course;
    if (Object.keys(course).length > 0) {
      return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                {this.isUserOwner()}
                <Link className="button button-secondary" to="/">
                  Return to List
                </Link>
              </div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>
              </div>
              <div className="course--description">
                <ReactMarkdown source={course.description} />
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  {/* only show estimated time if it has been specified */}
                  {(() => {
                    if (course.estimatedTime) {
                      return (
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <h3>{course.estimatedTime}</h3>
                        </li>
                      );
                    }
                  })()}

                  {/* only show materials needed if they have been specified */}
                  {(() => {
                    if (course.materialsNeeded) {
                      return (
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <ReactMarkdown source={course.materialsNeeded} />
                        </li>
                      );
                    }
                  })()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
