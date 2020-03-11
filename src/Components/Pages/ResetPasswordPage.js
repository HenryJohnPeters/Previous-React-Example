import React from "react";

import Header from "../PageDetails/Headers/Header";

import ResetPasswordForm from "../PageDetails/ResetPasswordForm/ResetPasswordForm";

import "./Login.css";
import { Fade } from "react-reveal";

function ResetPasswordPage() {
  return (
    <div className="App">
      <Header />
      <Fade bottom>
        <ResetPasswordForm />
      </Fade>
    </div>
  );
}

export default ResetPasswordPage;
