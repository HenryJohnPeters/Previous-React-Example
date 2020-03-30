import React from "react";
import logo from "../codestone logo.png";
import DisplayUserAccountDetails from "../PageDetails/UpdateProfileForm/DislplayUserAccountDetails";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";
import DisplayUserPasswordDetails from "../PageDetails/UpdateProfileForm/DisplayUserPasswordDetails";
import Fade from "react-reveal";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
function ProfilePage() {
  return (
    <>
      <Header />
      {/* <Fade right> */}
        <h3 style={{ textAlign: "center" }}>
          <u> Account Details</u>
        </h3>
      {/* </Fade> */}
      {/* <Fade left> */}
        <DisplayUserAccountDetails />
      {/* </Fade>
      <Fade left> */}
        <DisplayUserPasswordDetails />
      {/* </Fade> */}
    </>
  );
}

export default ProfilePage;

function Header() {
  return (
    <div className="jumbotron" style={{   borderBottomStyle: "solid", borderColor: "LightGray",  }}>
      <div style={{ float: "right" }}>
        {/* <ProfileButton />
        <LogOutButton /> */}
        <Dropdown>
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">

⚙️
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1"><ProfileButton/></Dropdown.Item>
    <Dropdown.Item href="#/action-2"><LogOutButton /> </Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>
        {/* <AdminButton /> */}
      </div>

      <div className="User-Menu" style ={{float: "left"}}></div>
      <img
        className="profile-image"
        alt="icon"
        src={logo}
        width="340"
        height="60"
      />
      <br /><br />
    
      <Link to="./home">
        <button className="btn btn-secondary">Home</button>
      </Link>
    </div>
  );
}
