import React from "react";
import logo from "../codestone logo.png";
import DisplayUserAccountDetails from "../PageDetails/UpdateProfileForm/DislplayUserAccountDetails";
import DisplayUserWorkStationDetails from "../PageDetails/UpdateProfileForm/DisplayUserWorkStationDetails";
import DisplayUserPasswordDetails from "../PageDetails/UpdateProfileForm/DisplayUserPasswordDetails";

import NavBar from "../PageDetails/Headers/NavBarUsers";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";

import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";

function ProfilePage() {
  return (
    <>
      <Header />

      <Fade right>
        <h3 style={{ textAlign: "center" }}>My Workstations</h3>
      </Fade>
      <Fade left>
        <DisplayUserWorkStationDetails />
      </Fade>
    </>
  );
}

function Header() {
  return (
    <div className="jumbotron">
      <div style={{ textAlign: "right" }}>
        <ProfileButton />
        <LogOutButton />
        <AdminButton />
      </div>

      <div className="User-Menu"></div>
      <img
        className="profile-image"
        alt="icon"
        src={logo}
        width="340"
        height="60"
      />
      <br />

      <Link to="./home">
        <button className=" btn btn-secondary">Home</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
