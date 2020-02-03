import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
//basic   token checker.

const resetToken = window.localStorage.getItem("resetToken");

const ResetAuthRoute = ({ component: Component }) => (
  <Route
    render={props =>
      resetToken && resetToken !== undefined ? (
        <Component />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default ResetAuthRoute;
