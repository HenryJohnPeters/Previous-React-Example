import React from "react";
import { Route, Redirect } from "react-router-dom";

//basic   token checker.
const token = window.localStorage.getItem("myToken");
const adminToken = window.localStorage.getItem("adminToken");

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (token && token !== undefined) ||
      (adminToken && adminToken !== undefined) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default AuthRoute;
