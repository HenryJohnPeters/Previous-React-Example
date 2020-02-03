import React from "react";
import logo from "../codestone logo.png";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";

import DisplayQuestions from "../PageDetails/DisplayQuestions/DisplayQuestions";

function Home() {
  return (
    <div>
      <Header />
      <DisplayQuestions />
    </div>
  );
}

function Header() {
  return (
    <div class="jumbotron">
      <div className="User-Menu">
        <Link>User details </Link>
      </div>
      <img
        className="profile-image"
        alt="icon"
        src={logo}
        width="340"
        height="60"
      />

      {/* <NavBar /> */}
    </div>
  );
}

export default Home;
