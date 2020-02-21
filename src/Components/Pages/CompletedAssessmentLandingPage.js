import React from "react";

import balloons from "../PageDetails/Pictures/balloons.png";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";

import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";

import logo from "../codestone logo.png";

class LandingPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <Header />

        {/* <img
          style={{ float: "left" }}
          className="profile-image"
          alt="icon"
          src={balloons}
          width="430"
          height="60"
        />
        <img
          style={{ float: "right" }}
          className="profile-image"
          alt="icon"
          src={balloons}
          width="340"
          height="60"
        /> */}
        <div className="jumbotron blue">
          <h2 style={{ textAlign: "center" }}>Congradulations</h2>
          <p style={{ textAlign: "center" }}>
            Your desk assessment has been completed. Return home to see this
          </p>
          <Link to="/home">
            <button style={{ width: "100%" }} className="btn btn-primary">
              {" "}
              Home
            </button>
          </Link>
        </div>
      </>
    );
  }
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
      <br />
      <br />
      <Link to="./home">
        <button className="btn btn-secondary">Home </button>
      </Link>
    </div>
  );
}

export default LandingPage;