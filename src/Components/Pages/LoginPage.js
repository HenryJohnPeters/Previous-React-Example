import React from "react";

import "../bootstrap.min.css";
import Header from "../PageDetails/Headers/Header";
import LoginForm from "../PageDetails/LoginForm/LoginForm";

function LoginPage() {
  return (
    <div className="App">
      <Header />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
