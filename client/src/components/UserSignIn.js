import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import ValidationErrors from './ValidationErrors';

export default class UserSignIn extends Component {
  state = {
    user: {
      emailAddress: "",
      password: ""
    },
    validationErrors: []
  }

  onChange = e => {
    const {user} = this.state;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }

  submitForm = e => {
    e.preventDefault();
    const response = this.props.userSignIn(this.state.user)
    if (response === false) {
      this.setState({ validationErrors: ['email or password'] })
    } else {
      this.props.history.push('/courses');
    }
  }


  render() {
    const { user } = this.state;
    if (this.props.user.authenticated) {
      return (
        <Redirect to="/courses" />
      )
    } else {
      return (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              <ValidationErrors errors={this.state.validationErrors} />
              <form onSubmit={this.submitForm}>
                <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={user.emailAddress} onChange={this.onChange} /></div>
                <div><input id="password" name="password" type="password" className="" placeholder="Password" value={user.password} onChange={this.onChange} /></div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Sign In</button>
                  <button className="button button-secondary">Cancel</button>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
          </div>
        </div>
      )
    }
  }
}