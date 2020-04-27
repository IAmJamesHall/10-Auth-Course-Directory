import { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { getAuthHeaders } from "../bin/auth";

class DeleteCourse extends Component {
  state = {
    redirect: true,
  };

  async componentDidMount() {
    const { courseId } = this.props.match.params;
    const { user } = this.props;

    // get course to delete
    const getResponse = await axios.get(
      `http://localhost:5000/api/courses/${courseId}`
    );
    if (getResponse.status !== 404) {
      // if course exists
      const course = getResponse.data;

      // if user owns course
      if (this.props.user.userId === course.User.id) {
        try {
          // attempt deleting the course
          await axios({
            method: "delete",
            url: `http://localhost:5000/api/courses/${courseId}`,
            headers: getAuthHeaders(user.emailAddress, user.password),
          });
          // course successfully deleted
          this.props.history.push("/courses");
        } catch (error) {
          // if error, redirect to error path
          this.props.history.push("/error");
        }
      }
    }
  }

  render() {
    return null;
  }
}

export default withRouter(DeleteCourse);
