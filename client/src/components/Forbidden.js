import React from "react";
import { Link } from "react-router-dom";

export default function Forbidden(props) {
  return (
    <div className="not-found">
      <h1>Forbidden</h1>
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
