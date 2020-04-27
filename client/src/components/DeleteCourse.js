import React, { useState, Component } from "react";
import axios from "axios";
import base64 from "base-64";
import { Redirect, withRouter } from "react-router-dom";

class DeleteCourse extends Component {
  state = {
    redirect: true,
  };

  async componentDidMount() {
    const { courseId } = this.props.match.params;
    const { user } = this.props;
    const getResponse = await axios.get(
      `http://localhost:5000/api/courses/${courseId}`
    );
    if (getResponse.status !== 404) {
      const course = getResponse.data;

      if (this.props.user.userId === course.User.id) {
        try {
          const deleteResponse = await axios({
            method: "delete",
            url: `http://localhost:5000/api/courses/${courseId}`,
            headers: {
              Authorization: `Basic ${base64.encode(
                `${user.emailAddress}:${user.password}`
              )}`,
            },
          });

          this.props.history.push("/courses");
        } catch (error) {
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
