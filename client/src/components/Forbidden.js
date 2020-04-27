import React from "react";
import { Link } from "react-router-dom";

/**
 * display user-friendly error message for forbidden path
 */
export default function Forbidden(props) {
  return (
    <div className="not-found">
      <h1>To access this page, you must sign in</h1>
      <Link
        className="button"
        to={{
          pathname: "/signin",
          state: { from: props.location.state.from.pathname },
        }}
      >
        Go sign in
      </Link>
    </div>
  );
}
