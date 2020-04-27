import React from "react";
import { Link } from "react-router-dom";

/**
 * display user-friendly message for 404
 */
export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Sorry, this page wasn't found</h1>
      <Link className="button" to="/courses">
        {"<— Go back home"}
      </Link>
    </div>
  );
}
