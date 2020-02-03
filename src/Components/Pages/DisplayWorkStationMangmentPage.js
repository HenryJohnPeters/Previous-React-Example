import React from "react";

import DisplayUserAccountDetails from "../PageDetails/UpdateProfileForm/DislplayUserAccountDetails";
import DisplayUserWorkStationDetails from "../PageDetails/UpdateProfileForm/DisplayUserWorkStationDetails";
import DisplayUserPasswordDetails from "../PageDetails/UpdateProfileForm/DisplayUserPasswordDetails";
import Header from "../PageDetails/Headers/Header";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <>
      <Header />

      <DisplayUserWorkStationDetails />
    </>
  );
}

export default ProfilePage;
