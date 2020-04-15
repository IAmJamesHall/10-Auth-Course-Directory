import React from 'react';
import { Redirect } from 'react-router-dom';


export default function UserSignOut(props) {
  const { cookies, userSignOut } = props;
  cookies.remove('emailAddress', { path: '/' });
  cookies.remove('password', { path: '/' });
  userSignOut();
  return (
    <Redirect to="/" />
  )
}