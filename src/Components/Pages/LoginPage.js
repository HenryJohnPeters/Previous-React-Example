import React from "react";

import "../bootstrap.min.css";
import Header from "../PageDetails/Headers/Header";
import LoginForm from "../PageDetails/LoginForm/LoginForm";
import { Fade } from "react-reveal";

function LoginPage() {
  return (
    <div className="App">
      <Header />
      <Fade bottom>
        <LoginForm />
      </Fade>
    </div>
  );
}

export default LoginPage;
