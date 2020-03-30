import React from "react";
import logo from "./codestone logo.png";
import { Link } from "react-router-dom";
import ProfileButton from "../Buttons/ProfileButton/ProfileButton";
import LogOutButton from "../Buttons/LogOutButton/LogOutButton";
import {  Dropdown } from "react-bootstrap";

import "./bootstrap.min.css";

function Header(props) {
 
 
  return (
    <div className="jumbotron" style={{   borderBottomStyle: "solid", borderColor: "LightGray",  }}>
      <div style={{ textAlign: "right" }}>
       
        <Dropdown>
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">

⚙️
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1"><ProfileButton/></Dropdown.Item>
    <Dropdown.Item href="#/action-2"><LogOutButton /> </Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>
       
      </div>

      <div className="User-Menu" style ={{float: "left"}}></div>
      <img
        className="profile-image"
        alt="icon"
        src={logo}
        width="340"
        height="60"
      />
      <br/>
      <br/>
      {props.children}
      <br/>
       
     
    </div>
  );
}
 

export default Header;
