import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ValidationErrors from "./ValidationErrors";

class UserSignUp extends Component {
  state = {
    validationErrors: [],
    form: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    },
  };

  onChange = (e) => {
    const form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form });
  };

  onCancel = () => {
    this.props.history.push("/courses");
  };

  submitForm = async (e) => {
    e.preventDefault();
    const { form } = this.state;

    //delete current form validation errors
    this.setState({ validationErrors: [] });

    let validationErrors = [];

    // check that password was correctly entered twice
    if (form.password !== form.confirmPassword) {
      validationErrors.push("Passwords do not match");
    }

    //clean up email
    form.emailAddress = form.emailAddress.toLowerCase();

    const response = await this.props.userSignUp(form);
    console.log("response from UserSignUp", response);
    if (response.status === 400) {
      console.log("response", response);
      validationErrors = [...validationErrors, ...response.errors];
      this.setState({
        validationErrors: response.errors,
      });
    } else {
      //redirect to main page
      this.props.history.push("/courses");
    }
  };

  render() {
    const { form } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <ValidationErrors errors={this.state.validationErrors} />
          <div>
            <p>*All fields required</p>
            <form onSubmit={this.submitForm}>
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className=""
                  placeholder="First Name"
                  onChange={this.onChange}
                  value={form.firstName}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className=""
                  placeholder="Last Name"
                  onChange={this.onChange}
                  value={form.lastName}
                />
              </div>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  onChange={this.onChange}
                  value={form.emailAddress}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  onChange={this.onChange}
                  value={form.password}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <button
                  className="button button-secondary"
                  onClick={this.onCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserSignUp);
