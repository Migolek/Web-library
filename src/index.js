import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './routes/privateRoute';
import 'firebase/auth';

import "assets/css/material-dashboard-react.css?v=1.3.0";

import LoginView from './layouts/LoginView/LoginView';
import Dashboard from './layouts/Dashboard/Dashboard';

const hist = createBrowserHistory();
const auth = Boolean(localStorage.getItem('auth'));
ReactDOM.render(
  <Router history={hist}>
    <Switch> 
      <PrivateRoute
        path="/dashboard"
        name="Dashboard"
        component={Dashboard}
        isAuthorized={auth}
      />
      <PrivateRoute
        path="/login"
        name="Login"
        component={LoginView}
        isAuthorized={auth}
      />
      <Route path="/login" component={LoginView} />
      <Route path='*' exact={true} component={LoginView} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
