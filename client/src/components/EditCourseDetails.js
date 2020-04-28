import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ValidationErrors from "./ValidationErrors";

const axios = require("axios");

class EditCourseDetails extends Component {
  state = {
    validationErrors: [],
    course: {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
    },
    user: {
      firstName: "",
      lastName: "",
      id: "",
      emailAddress: "",
    },
  };

  async componentDidMount() {
    // download current course
    if (this.props.purpose === "update") {
      const { courseId } = this.props.match.params;
      const course = await axios.get(
        `${this.props.serverLocation}/api/courses/${courseId}`
      );
      this.setState({ course: course.data });
      this.setState({ user: course.data.User });
    } else {
      this.setState({
        course: {
          title: "",
          description: "",
          materialsNeeded: "",
          estimatedTime: "",
        },
        user: this.props.user,
      });
    }

    // capitalize purpose for display
    const purpose =
      this.props.purpose.charAt(0).toUpperCase() + this.props.purpose.slice(1);
    this.setState({ purpose });
  }

  // update state to reflect form
  onChange = (e) => {
    const course = this.state.course;
    course[e.target.name] = e.target.value;
    this.setState({ course });
  };

  cancelForm = (e) => {
    let url;
    if (this.props.purpose === "create") {
      url = "/courses";
    } else {
      url = `/courses/${this.state.course.id}`;
    }
    this.props.history.push(url);
  };

  submitForm = async (e) => {
    e.preventDefault();
    const { title, description } = this.state.course;
    const validationErrors = [];

    // check for required fields
    if (title === "") validationErrors.push("Title cannot be empty");
    if (description === "")
      validationErrors.push("Description cannot be empty");

    // check for validation errors
    if (validationErrors.length === 0) {
      const response = await this.props.saveCourse(
        this.state.course,
        this.props.purpose
      );
      // if good response
      if (response.status === 200) {
        this.props.history.push(`/courses/${response.data.id}`);
      } else {
        this.setState({
          validationErrors: ["Error saving course. Please try again."],
        });
      }
    } else {
      this.setState({ validationErrors });
    }
  };

  render() {
    const { course } = this.state;
    const user = this.state.user || {};
    return (
      <div className="bounds course--detail">
        <h1>{this.state.purpose} Course</h1>
        <div>
          <ValidationErrors errors={this.state.validationErrors} />
          <form onSubmit={this.submitForm}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title (required)"
                    value={course.title}
                    onChange={this.onChange}
                  />
                </div>
                <p>
                  By {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description (required)"
                    onChange={this.onChange}
                    value={course.description}
                  />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        value={course.estimatedTime}
                        onChange={this.onChange}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        value={course.materialsNeeded}
                        onChange={this.onChange}
                      ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                {this.state.purpose} Course
              </button>
              <button
                className="button button-secondary"
                onClick={this.cancelForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditCourseDetails);
