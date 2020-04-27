import React from "react";

/**
 * displays list of validation errors
 * @param {array} param0 error messages to display
 */
export default function ValidationErrors({ errors }) {
  if (errors) {
    const errorMessages = errors.map((error, index) => {
      return <li key={index}>{error}</li>;
    });
    return (
      <div className="validation-errors">
        <ul>{errorMessages}</ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}
