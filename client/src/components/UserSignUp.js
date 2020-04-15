import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';

export default class UserSignUp extends Component {
  state = {
    validationErrors: [],
    form: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: ""
    }
  }

  onChange = (e) => {
    const form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({form});
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log("UserSignUp's submitForm()")
    const { form } = this.state

    //delete current form validation errors
    this.setState({validationErrors: []});

    // validate data
    Object.keys(form).forEach(formElement => {
      if (this.state.form[formElement] === "") {
        //convert camelCase to caps case
        var result = formElement.replace( /([A-Z])/g, " $1" );
        var prettyFormElement = result.charAt(0).toUpperCase() + result.slice(1);

        console.log(formElement);

        this.setState((prevState) => ({
          validationErrors: [...prevState.validationErrors, prettyFormElement]
        }))
      }
    })

    if (this.state.validationErrors.length === 0) {
      console.log('About to send it');
      this.props.userSignUp(this.state.form);
    }
  }

  render() {
    const { form } = this.state;
    return (
      <div class="bounds">
        <div class="grid-33 centered signin">
          <h1>Sign Up</h1>
          <ValidationErrors errors={this.state.validationErrors} />
          <div>
            <form onSubmit={this.submitForm}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.onChange} value={form.firstName} /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.onChange} value={form.lastName} /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.onChange} value={form.emailAddress} /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.onChange} value={form.password} /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.onChange} value={form.confirmPassword} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    )
  }
}