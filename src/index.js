import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'firebase/auth';

import "assets/css/material-dashboard-react.css?v=1.3.0";

import LoginView from './layouts/LoginView/LoginView';
import Dashboard from './layouts/Dashboard/Dashboard';
import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();
const auth = Boolean(localStorage.getItem('auth'));
console.log('to jest', auth);
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {auth 
        ? indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })
        :
          <Route component={LoginView} /> 
      }
    </Switch>
  </Router>,
  document.getElementById("root")
);
