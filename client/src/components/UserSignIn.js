import React, { Component } from 'react';

export default class UserSignIn extends Component {
  state = {
    user: {
      emailAddress: "",
      password: ""
    }
  }

  onChange = (e) => {
    const {user} = this.state;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }
  

  render() {
    return (
      <div className="bounds">
        <div class="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" onChange={this.onChange} /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value="" onChange={this.onChange} /></div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button class="button button-secondary">Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="#">Click here</a> to sign up!</p>
        </div>
      </div>
    )
  }
}