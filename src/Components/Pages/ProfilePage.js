import React from "react";
import logo from "../codestone logo.png";
import DisplayUserAccountDetails from "../PageDetails/UpdateProfileForm/DislplayUserAccountDetails";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";
import DisplayUserPasswordDetails from "../PageDetails/UpdateProfileForm/DisplayUserPasswordDetails";
import Fade from "react-reveal";

import { Link } from "react-router-dom";
function ProfilePage() {
  return (
    <>
      <Header />
      <Fade right>
        <h3 style={{ textAlign: "center" }}>
          <u> Account Details</u>
        </h3>
      </Fade>
      <Fade left>
        <DisplayUserAccountDetails />
      </Fade>
      <Fade left>
        <DisplayUserPasswordDetails />
      </Fade>
    </>
  );
}

export default ProfilePage;

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
      <br />
      <Link to="./home">
        <button className="btn btn-secondary">Home</button>
      </Link>
    </div>
  );
}
