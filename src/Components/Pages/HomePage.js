import React from "react";
import logo from "../codestone logo.png";

import "../bootstrap.min.css";

import NavBar from "../PageDetails/Headers/NavBarUsers";
import LogOutButton from "../PageDetails/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/ProfileButton/ProfileButton";

function Home() {
  return (
    <div>
      <Header />
    </div>
  );
}

function Header() {
  return (
    <div className="jumbotron">
      <div style={{ textAlign: "right" }}>
        <ProfileButton />
        <LogOutButton />
      </div>

      <div className="User-Menu"></div>
      <img
        className="profile-image"
        alt="icon"
        src={logo}
        width="340"
        height="60"
      />

      <NavBar />
    </div>
  );
}

export default Home;
