import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component, isAuthorized, path,
}) => {
  console.log(isAuthorized);
  return (
    isAuthorized ? <Route path={path} component={Component} /> : window.location.replace('/')
  );
};


export default PrivateRoute;
