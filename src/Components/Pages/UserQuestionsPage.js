import React from "react";
import logo from "../codestone logo.png";
import { Link } from "react-router-dom";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import "../bootstrap.min.css";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
// import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";
import DisplayQuestions from "../PageDetails/DisplayQuestions/DisplayQuestions";
import Fade from "react-reveal";
function Home() {
  return (
    <div>
      <Header /> <PageTitle />
      {/* <Fade left> */}
        <DisplayQuestions />
      {/* </Fade> */}
    </div>
  );
}

class PageTitle extends React.Component {
  render() {
    return (
      <div>
        {/* <Fade right> */}
          <h2 style={{ textAlign: "center" }}>
            <u>Workstation Self-Assessment</u>
          </h2>
        {/* </Fade> */}
      </div>
    );
  }
}

function Header() {
  return (
    <div className="jumbotron" style={{   borderBottomStyle: "solid", borderColor: "LightGray",  }}>
      <div style={{ textAlign: "right" }}>
        {/* <ProfileButton />
        <LogOutButton /> */}
        <Dropdown id={`dropdown-button-drop-left`}>
  <Dropdown.Toggle variant="secondary" id="dropdown-left">

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

export default Home;
