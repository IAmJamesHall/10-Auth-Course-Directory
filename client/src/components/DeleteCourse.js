import React, { useState, Component } from "react";
import axios from "axios";
import base64 from "base-64";
import { Redirect, withRouter } from "react-router-dom";

class DeleteCourse extends Component {
  state = {
    redirect: true,
  };

  async componentDidMount() {
    console.log("PROPS: ", this.props);
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
          // change to history.push
          console.log("error deleting course: ", error);
        }
      }
    }
  }

  render() {
    return null;
  }
}

export default withRouter(DeleteCourse);

// const DeleteCourse = async ({ match, user, ...props }) => {
//   const [redirect, setRedirect] = useState(false);

//   const history = useHistory();

//   const { courseId } = match.params;
//   console.log("DeleteCourse user: ", props.user);

//   const getResponse = await axios.get(
//     `http://localhost:5000/api/courses/${courseId}`
//   );
//   if (getResponse.status !== 404) {
//     const course = getResponse.data;
//     if (user.userId === course.User.id) {
//       console.log("user ids match");
//       try {
//         const deleteResponse = await axios({
//           method: "delete",
//           url: `http://localhost:5000/api/courses/${courseId}`,
//           headers: {
//             Authorization: `Basic ${base64.encode(
//               `${user.emailAddress}:${user.password}`
//             )}`,
//           },
//         });
//         console.log("PROPS.match", match);
//         history.push("/courses");
//       } catch (error) {
//         // TODO: display user friendly message
//         console.log("unable to delete", error);
//       }
//     } else {
//       //course not found
//       setRedirect(true);
//     }
//   }

//   console.log("redirect: ", redirect);
//   if (redirect === true) {
//     return <Redirect to="/courses" />;
//   } else {
//     return <div></div>;
//   }
// };
