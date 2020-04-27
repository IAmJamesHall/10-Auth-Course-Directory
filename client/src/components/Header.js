import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  let loginForm;
  // if user is not logged in
  if (!user.emailAddress) {
    loginForm = (
      <nav>
        <a className="signup" href="/signup">
          Sign Up
        </a>
        <a className="signin" href="/signin">
          Sign In
        </a>
      </nav>
    );
  } else {
    // if user is logged in
    loginForm = (
      <nav>
        <span>
          Welcome {user.firstName} {user.lastName}!
        </span>
        <Link className="signout" to="/signout">
          Sign Out
        </Link>
      </nav>
    );
  }
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        {loginForm}
      </div>
    </div>
  );
};

export default Header;
