import React from "react";
import logo from "./codestone logo.png";
import { Link } from "react-router-dom";

import "./bootstrap.min.css";

function Header() {
  return (
    <div className="jumbotron">
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
      <Link to="/home">
        <button className="btn btn-secondary"> Home</button>
      </Link>
    </div>
  );
}

export default Header;
