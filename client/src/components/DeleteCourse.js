import React, { useState } from "react";
import axios from "axios";
import base64 from "base-64";
import { Redirect } from "react-router-dom";

const DeleteCourse = async ({ match, user, ...props }) => {
  const [redirect, setRedirect] = useState(false);

  const { courseId } = match.params;
  console.log("DeleteCourse user: ", props.user);

  const getResponse = await axios.get(
    `http://localhost:5000/api/courses/${courseId}`
  );
  if (getResponse.status !== 404) {
    const course = getResponse.data;
    console.log("course to delete: ", course);
    if (user.userId === course.User.id) {
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
        console.log("props", props);
        setRedirect(true);
      } catch (error) {
        // TODO: display user friendly message
        console.log("unable to delete", error);
      }
    } else {
      //course not found
      setRedirect(true);
    }
  }

  console.log("redirect: ", redirect);
  if (redirect === true) {
    return <Redirect to="/courses" />;
  } else {
    return <div></div>;
  }
};

export default DeleteCourse;
