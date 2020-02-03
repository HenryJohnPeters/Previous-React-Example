import React from "react";

import "../bootstrap.min.css";
import Header from "../PageDetails/Headers/Header";
import ConfirmRegisterForm from "../PageDetails/ConfirmRegisterForm/ConfirmRegisterForm";

function LoginPage() {
  return (
    <div className="App">
      <Header />
      <ConfirmRegisterForm />
    </div>
  );
}

export default LoginPage;
