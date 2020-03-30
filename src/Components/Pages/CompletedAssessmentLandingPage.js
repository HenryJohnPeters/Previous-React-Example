import React from "react";

import { Link } from "react-router-dom";
import "../bootstrap.min.css";
import AdminHeader from "../PageDetails/Headers/HeaderAdmin";
import { Dropdown } from "react-bootstrap";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";

import logo from "../codestone logo.png";
import Zoom from "react-reveal";

class LandingPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <AdminHeader />

       
        <Zoom left>
          <div className="jumbotron blue" style={{   borderBottomStyle: "solid", borderColor: "LightGray",  }}>
            <h2 style={{ textAlign: "center" }}>Congratulations</h2>
            <p style={{ textAlign: "center" }}>
              Your workstation self-assessment has been completed. Return home to see this.
            </p>
            <Link to="/home">
              <button style={{ width: "100%" }} className="btn btn-primary">
                {" "}
                Home
              </button>
            </Link>
          </div>
        </Zoom>
      </>
    );
  }
}



export default LandingPage;
