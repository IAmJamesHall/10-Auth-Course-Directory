/* Coded by James Hall
 * as part of the TeamTreehouse Full Stack JS final project
 * Apr 27, 2020
 */

import React, { Component } from "react";

import axios from "axios";
import base64 from "base-64";
import Cookies from "universal-cookie";

import "./global.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Import components
import Header from "./components/Header";

import Courses from "./components/Courses";
import DeleteCourse from "./components/DeleteCourse";
import CourseDetails from "./components/CourseDetails";
import EditCourseDetails from "./components/EditCourseDetails";

import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";

import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";

import { authSignUp, authSignIn, getAuthHeaders } from "./bin/auth";

const cookies = new Cookies();

class App extends Component {
  state = {
    user: {
      authenticated: false,
    },
    serverLocation: "https://treehouse-project9.glitch.me",
  };

  componentDidMount() {
    // get credentials from cookies, and attempt to sign in with them
    const emailAddress = cookies.get("emailAddress");
    const password = cookies.get("password");
    this.signIn({ emailAddress, password });
  }

  /**
   * sign up for user account
   */
  signUp = async (form) => {
    const result = await authSignUp(form, this.state.serverLocation);
    if (result) {
      this.signIn(form);
      return true;
    } else {
      return false;
    }
  };

  /**
   * sign in to existing user account
   */
  signIn = async (form) => {
    const result = await authSignIn(form, this.state.serverLocation);
    if (result) {
      this.setState(result);

      cookies.set("emailAddress", form.emailAddress, { path: "/" });
      cookies.set("password", form.password, { path: "/" });

      return true;
    } else {
      return false;
    }
  };

  /**
   * sign out of user account
   */
  signOut = () => {
    this.setState({
      user: {
        authenticated: false,
      },
    });
  };

  /**
   * create or update existing course
   */
  saveCourse = async (course, purpose) => {
    const { emailAddress, password } = this.state.user;
    const { title, description, estimatedTime, materialsNeeded } = course;
    let method, url;

    if (purpose === "create") {
      method = "post";
      url = `${this.state.serverLocation}/api/courses`;
    } else if (purpose === "update") {
      // check that user owns course
      if (course.User.emailAddress !== emailAddress) {
        return {
          status: 401,
          message: "User does not own this course",
        };
      } else {
        method = "put";
        url = `${this.state.serverLocation}/api/courses/${course.id}`;
      }
    }
    // send put/post request
    const response = await axios({
      method,
      url,
      headers: getAuthHeaders(emailAddress, password),
      data: {
        title,
        description,
        estimatedTime,
        materialsNeeded,
      },
    });

    return response;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header user={this.state.user} />
          <Switch>
            {/* view courses */}
            <Route
              exact
              path="/courses"
              render={() => (
                <Courses
                  user={this.state.user}
                  serverLocation={this.state.serverLocation}
                />
              )}
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
                  serverLocation={this.state.serverLocation}
                />
              )}
            />

            {/* view individual course details */}
            <Route
              exact
              path="/courses/:courseId"
              render={(props) => (
                <CourseDetails
                  match={props.match}
                  user={this.state.user}
                  serverLocation={this.state.serverLocation}
                />
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
                  serverLocation={this.state.serverLocation}
                />
              )}
            />

            {/* delete individual course */}
            <PrivateRoute
              exact
              path="/courses/:courseId/delete"
              user={this.state.user}
              render={(props) => (
                <DeleteCourse
                  match={props.match}
                  user={this.state.user}
                  serverLocation={this.state.serverLocation}
                />
              )}
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
                    {...props}
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
            <Route exact path="/" render={() => <Redirect to="/courses" />} />

            {/* forbidden */}
            <Route path="/forbidden" component={Forbidden} />

            {/*error route */}
            <Route path="/error" component={UnhandledError} />

            {/*catch all other routes */}
            <Route render={() => <NotFound />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
