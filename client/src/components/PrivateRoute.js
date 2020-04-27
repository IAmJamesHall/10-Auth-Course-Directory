import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * allows access to private routes only if the user is authenticated
 */
const PrivateRoute = ({ render: RenderComponent, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      user = user || {};
      if (user.authenticated) {
        props.user = user; //pass authenticated user down to component
        return <RenderComponent {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/forbidden",
              state: { from: props.location }, // pass attempted path
            }}
          />
        );
      }
    }}
  />
);

export default PrivateRoute;
