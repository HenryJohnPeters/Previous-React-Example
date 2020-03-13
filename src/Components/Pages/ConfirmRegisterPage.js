import React from "react";

import "../bootstrap.min.css";
import Header from "../PageDetails/Headers/Header";
import ConfirmRegisterForm from "../PageDetails/ConfirmRegisterForm/ConfirmRegisterForm";
import { Fade } from "react-reveal";

function LoginPage() {
  return (
    <div className="App">
      <Header />
      <Fade bottom>
        <ConfirmRegisterForm />
      </Fade>
    </div>
  );
}

export default LoginPage;
