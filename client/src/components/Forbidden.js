import React from "react";
import { Link } from "react-router-dom";

/**
 * display user-friendly error message for forbidden path
 */
export default function Forbidden(props) {
  let from;
  if (props.location.state) {
    from = props.location.state.from;
  } else {
    from = "/";
  }

  return (
    <div className="not-found">
      <h1>To access this page, you must sign in</h1>
      <Link
        className="button"
        to={{
          pathname: "/signin",
          state: { from },
        }}
      >
        Go sign in
      </Link>
    </div>
  );
}
