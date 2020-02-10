import React from "react";
import logo from "../codestone logo.png";

import "../bootstrap.min.css";

import NavBar from "../PageDetails/Headers/NavBarUsers";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";
import { Link } from "react-router-dom";
import DisplayHistory from "../PageDetails/DisplayQuestions/DisplayHistory";

function Home() {
  return (
    <div>
      <Header />
      <DisplayHistory/>
    </div>
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
<br/><br/>
     <Link to = "./home"><button className = "btn btn-secondary"> Home </button></Link>
    </div>
  );
}

export default Home;
