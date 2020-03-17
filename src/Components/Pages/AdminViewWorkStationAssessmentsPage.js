import React from "react";
import logo from "../codestone logo.png";

import "../bootstrap.min.css";

import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";

import AdminWorkstations from "../AdminComponents/AdminDisplayQuestions/AdminViewWorkStations";
import Fade from "react-reveal";

function AdminViewWorkstations() {
  return (
    <div>
      <Header />

      <Fade right>
        <AdminWorkstations />
      </Fade>
    </div>
  );
}
export default AdminViewWorkstations;

function Header() {
  return (
    <div className="jumbotron">
      <div style={{ textAlign: "right" }}>
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
      <br />
      <br />
    </div>
  );
}
