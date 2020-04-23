import React from "react";

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
