import React from "react";

import DisplayUserAccountDetails from "../PageDetails/UpdateProfileForm/DislplayUserAccountDetails";

import DisplayUserPasswordDetails from "../PageDetails/UpdateProfileForm/DisplayUserPasswordDetails";
import Header from "../PageDetails/Headers/Header";

import { Link } from "react-router-dom";
function ProfilePage() {
  return (
    <>
      <Header />
      <h3 style={{ textAlign: "center" }}>
        <u> Account Details</u>
      </h3>

      <DisplayUserAccountDetails />
      <DisplayUserPasswordDetails />
    </>
  );
}

export default ProfilePage;
