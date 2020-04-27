import React from "react";
import { Link } from "react-router-dom";

/**
 * displays user-friendly message for unhandled errors
 */
export default function UnhandledError() {
  return (
    <div className="not-found">
      <h1>500 Server Error</h1>
      <Link className="button" to="/courses">
        {"<— Go back home"}
      </Link>
    </div>
  );
}
