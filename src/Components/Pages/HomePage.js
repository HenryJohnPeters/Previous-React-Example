 
import logo from "../codestone logo.png";
import React, { useState, useEffect } from 'react';

import "../bootstrap.min.css";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";

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
          <h2 style={{ textAlign: "center" }}>Workstation Self-Assessments</h2>
        </Fade>
      </div>
    );
  }
}

function Header(props) {

  const[workstations, setWorkstations] = useState([{}])

  useEffect(() => {
    var user = window.localStorage.getItem("User");
    if (user) {
      fetch(`/profile-work-station-detailss/${user}`)
        .then(recordset => recordset.json())
        .then(results => {
          console.log(results.recordset) 
          setWorkstations(results.recordset)
             console.log(workstations)    
          
        
        });
    }
    
  },[]);
   
  return (
    <div className="jumbotron" style={{   borderBottomStyle: "solid", borderColor: "LightGray",  }}>
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
      </Link>  <DisplayAddWorkstation workstations={workstations}/>
      
    
    </div>
  );
}



class DisplayAddWorkstation extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      show: false
    };
  }


componentDidMount(){
  console.log(this.props.workstations)
}



  handleClose() {
    this.setState({
      show: false
    });
  }
  handleShow() {
    this.setState({
      show: true
    });
  }
  handleRefresh() {
    window.location.reload();
  }
  render() {
    return (
      <>
        <button
          className="btn btn-primary"
          style={{ float: "left" }}
          onClick={this.handleShow}
        >
          +
        </button>


        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton> Select Workstation</Modal.Header>
          <Modal.Body>

          {this.props.workstations.map(number => (
                <button
                
                >
                  {number.DateAdded}
                  {number.WSId}
                </button>
              ))}
{/* 
          {this.props.workstations.map(number => (
                <button
                 
                >
                  {number}
                </button>
              ))} */}
          
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default Home;
