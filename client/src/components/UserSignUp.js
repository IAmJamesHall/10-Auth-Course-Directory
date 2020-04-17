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
      confirmPassword: "",
    },
  };

  onChange = (e) => {
    const form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form });
  };

  addValidationError = async (error) => {
    this.setState((prevState) => ({
      validationErrors: [...prevState.validationErrors, error],
    }));
  };

  submitForm = async (e) => {
    e.preventDefault();
    console.log("UserSignUp's submitForm()");
    const { form } = this.state;

    //delete current form validation errors
    this.setState({ validationErrors: [] });

    // check that password was correctly entered twice
    if (form.password !== form.confirmPassword) {
      console.log("form.password:", form.password);
      console.log("form.confirmPassword", form.confirmPassword);
      await this.addValidationError("Passwords do not match");
    }

    // validate data
    Object.keys(form).forEach(async (formElement) => {
      if (this.state.form[formElement] === "") {
        //convert camelCase to caps case
        var result = formElement.replace(/([A-Z])/g, " $1");
        var prettyFormElement =
          result.charAt(0).toUpperCase() + result.slice(1);

        await this.addValidationError(`${prettyFormElement} cannot be empty`);
      }
    });

    if (this.state.validationErrors.length === 0) {
      console.log(
        "About to send it. (Val errors:",
        this.state.validationErrors
      );
      const { form } = this.state;
      form.emailAddress = form.emailAddress.toLowerCase();
      await this.props.userSignUp(form);
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
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                  value={form.confirmPassword}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
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
