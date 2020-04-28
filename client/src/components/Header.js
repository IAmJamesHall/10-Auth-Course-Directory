import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  let loginForm;
  // if user is not logged in
  if (!user.emailAddress) {
    loginForm = (
      <nav>
        <Link className="signup" to="/signup">
          Sign Up
        </Link>
        <Link className="signin" to="/signin">
          Sign In
        </Link>
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
