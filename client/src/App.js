import React, { Component } from "react";

import axios from "axios";
import base64 from "base-64";
import Cookies from "universal-cookie";
import auth from "./bin/auth";

import "./global.css";

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

// Import components
import Header from "./components/Header";

import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import EditCourseDetails from "./components/EditCourseDetails";

import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";
import DeleteCourse from "./components/DeleteCourse";

import {
  getAuthHeaders,
  userSignUp,
  userSignIn,
  userSignOut,
} from "./bin/auth";

const cookies = new Cookies();

class App extends Component {
  state = {
    user: {
      authenticated: false,
    },
    redirect: "",
  };

  componentDidMount() {
    const emailAddress = cookies.get("emailAddress");
    const password = cookies.get("password");
    this.signIn({ emailAddress, password });
  }

  signUp = async (form) => {
    const result = await userSignUp(form);
    console.log(result);
    if (result) {
      this.signIn(form);
    }
  };

  signIn = async (form) => {
    const result = await userSignIn(form);
    console.log("result: ", result);
    if (result) {
      this.setState(result);

      cookies.set("emailAddress", form.emailAddress, { path: "/" });
      cookies.set("password", form.password, { path: "/" });
    } else {
      console.log("User not authenticated properly");
    }
  };

  signOut = () => {
    this.setState({
      user: {
        authenticated: false,
      },
    });
  };

  saveCourse = async (course, purpose) => {
    if (purpose === "create") {
      const { emailAddress, password } = this.state.user;
      const { title, description, estimatedTime, materialsNeeded } = course;
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/courses",
        headers: {
          Authorization: `Basic ${base64.encode(
            `${emailAddress}:${password}`
          )}`,
        },
        data: {
          title,
          description,
          estimatedTime,
          materialsNeeded,
        },
      });
      console.log("received response: ", response);
      return response;
    } else if (purpose === "update") {
      console.log("going to update");
      const { emailAddress, password } = this.state.user;
      if (course.User.emailAddress === emailAddress) {
        const { title, description, estimatedTime, materialsNeeded } = course;

        const response = await axios({
          method: "put",
          url: `http://localhost:5000/api/courses/${course.id}`,
          headers: {
            Authorization: `Basic ${base64.encode(
              `${emailAddress}:${password}`
            )}`,
          },
          data: {
            title,
            description,
            estimatedTime,
            materialsNeeded,
          },
        });
        console.log("received response: ", response);
        return response;
      } else {
        //user does not have permission to update course
        return {
          status: 401,
          message: "User does not own this course",
        };
      }
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Header user={this.state.user} />
          <Switch>
            {/* view courses */}
            <Route
              exact
              path="/courses"
              render={() => <Courses user={this.state.user} />}
            />

            {/* create new course */}
            <PrivateRoute
              exact
              path="/courses/new"
              user={this.state.user}
              render={(props) => (
                <EditCourseDetails
                  purpose="create"
                  saveCourse={this.saveCourse}
                  history={props.history}
                  user={this.state.user}
                />
              )}
            />

            {/* view individual course details */}
            <Route
              exact
              path="/courses/:courseId"
              render={(props) => (
                <CourseDetails match={props.match} user={this.state.user} />
              )}
            />

            {/* update individual course details */}
            <PrivateRoute
              exact
              path="/courses/:courseId/update"
              user={this.state.user}
              render={(props) => (
                <EditCourseDetails
                  match={props.match}
                  purpose="update"
                  saveCourse={this.saveCourse}
                  user={this.state.user}
                />
              )}
            />

            {/* delete individual course */}
            <PrivateRoute
              exact
              path="/courses/:courseId/delete"
              user={this.state.user}
              render={(props) => {
                console.log(this.state.user);
                return (
                  <DeleteCourse match={props.match} user={this.state.user} />
                );
              }}
            />

            {/* sign up for a user account */}
            <Route
              exact
              path="/signup"
              render={() => <UserSignUp userSignUp={this.signUp} />}
            />

            {/* sign in to an existing user account */}
            <Route
              exact
              path="/signin"
              render={(props) => {
                return (
                  <UserSignIn
                    userSignIn={this.signIn}
                    history={props.history}
                    user={this.state.user}
                  />
                );
              }}
            />

            {/* sign out user */}
            <Route
              exact
              path="/signout"
              render={() => (
                <UserSignOut userSignOut={this.signOut} cookies={cookies} />
              )}
            />

            {/* redirect '/' route to /courses */}
            <Route path="/" render={() => <Redirect to="/courses" />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
