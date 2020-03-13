import React from "react";

import "../bootstrap.min.css";
import Header from "../PageDetails/Headers/Header";
import ConfirmResetPasswordForm from "../PageDetails/ConfirmResetPasswordForm/ConfirmResetPasswordForm";
import { Fade } from "react-reveal";

function LoginPage() {
  return (
    <div className="App">
      <Header />
      <Fade left>
        <ConfirmResetPasswordForm />
      </Fade>
    </div>
  );
}

export default LoginPage;
