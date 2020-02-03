import React from "react";
import { Route, Redirect } from "react-router-dom";

//basic   token checker.
const token = window.localStorage.getItem("myToken");

const AuthRoute = ({ component: Component }) => (
  <Route
    render={props =>
      token && token !== undefined ? <Component /> : <Redirect to="/" />
    }
  />
);

export default AuthRoute;
