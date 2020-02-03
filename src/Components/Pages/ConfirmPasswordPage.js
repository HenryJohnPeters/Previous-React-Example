import React from "react";

import "../bootstrap.min.css";
import Header from "../PageDetails/Headers/Header";
import ConfirmResetPasswordForm from "../PageDetails/ConfirmResetPasswordForm/ConfirmResetPasswordForm";

function LoginPage() {
  return (
    <div className="App">
      <Header />
      <ConfirmResetPasswordForm />
    </div>
  );
}

export default LoginPage;
