import React from 'react';
import { Route, Redirect } from 'react-router-dom';

 const PrivateRoute = ({ render: RenderComponent, user, ...rest }) => (
  <Route {...rest} 
    render={props => {
      console.log('PrivateRoute: ', user);
      user = user || {};
      if (user.authenticated) {
        props.user = user; //pass authenticated user down to component
        console.log('passing props: ', props)
        return <RenderComponent {...props} />
      } else {
        return < Redirect to={{
          pathname: '/signin',
          state: { from: props.location }}
        } />
      }
    }} />
);

export default PrivateRoute;