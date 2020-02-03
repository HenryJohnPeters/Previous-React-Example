import React from "react";

import Header from "../PageDetails/Headers/Header";

import ResetPasswordForm from "../PageDetails/ResetPasswordForm/ResetPasswordForm";

import "./Login.css";

function ResetPasswordPage() {
  return (
    <div className="App">
      <Header />
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPasswordPage;
