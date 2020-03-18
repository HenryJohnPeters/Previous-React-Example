import React from "react";
import logo from "../codestone logo.png";

import "../bootstrap.min.css";

import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";

import CompletedAssessments from "../PageDetails/CompletedAssessments/CompletedAssessments";
import Fade from "react-reveal";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Header />
      <PageTitle />
      <Fade left>
        <CompletedAssessments />
      </Fade>
    </div>
  );
}
class PageTitle extends React.Component {
  render() {
    return (
      <div>
        <Fade right>
          <h2 style={{ textAlign: "center" }}>Workstation Assessments</h2>
        </Fade>
      </div>
    );
  }
}

function Header() {
  return (
    <div className="jumbotron">
      <div style={{ textAlign: "right" }}>
        <ProfileButton />
        <LogOutButton />
        {/* <AdminButton /> */}
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
      <Link to="/user-questions">
        <button className="btn btn-secondary">
          Perform Workstation Self-Assessment
        </button>
      </Link>
    </div>
  );
}

export default Home;
