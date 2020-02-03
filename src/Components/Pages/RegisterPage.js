import React from "react";

import "../bootstrap.min.css";

import Header from "../PageDetails/Headers/Header";

import RegisterForm from "../PageDetails/RegisterForm/RegisterForm";

function Register() {
  return (
    <div className="App">
      <Header />
      <RegisterForm />
    </div>
  );
}

export default Register;
