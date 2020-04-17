import React from "react";

export default function validationErrors(props) {
  const { errors } = props;
  if (errors) {
    const errorMessages = errors.map((error) => <li>{error}</li>);
    return (
      <div className="validation-errors">
        <ul>{errorMessages}</ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}
