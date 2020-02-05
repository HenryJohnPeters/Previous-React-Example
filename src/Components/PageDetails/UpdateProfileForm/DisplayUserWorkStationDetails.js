import React from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { Modal, Button } from "react-bootstrap";

import AddWorkstation from "./UpdateUserWorkStationDetailsForm";
class ManageWorkstations extends React.Component {
  constructor() {
    super();

    this.state = { AccountDetails: [] };
  }

  // sets the questions form sql into state for questions
  getItems() {
    var user = window.localStorage.getItem("User");
    if (user) {
      fetch(`/profile-work-station-detailss/${user}`)
        .then(recordset => recordset.json())
        .then(results => {
          this.setState({ AccountDetails: results.recordset });
        });
    } else {
      alert("user not set");
    }
  }
  //when the component mounts make the sql questions the
  componentDidMount() {
    this.setState({
      AccountDetails: this.getItems()
    });
  }

  render() {
    var self = this;
    return (
      <>
        <h3 style={{ textAlign: "center" }}>
          {" "}
          <u>Manage Work Stations</u>
        </h3>
        {this.state.AccountDetails ? (
          <ul>
            <Link to="/profile">
              <button style={{ float: "left" }} className="btn btn-secondary">
                Account Details
              </button>
            </Link>
            <button
              style={{ float: "left" }}
              className="btn btn-secondary"
              disabled
            >
              Manage Work Stations
            </button>

            <DisplayAddWorkstation />

            <br />
            <br />

            {this.state.AccountDetails &&
              this.state.AccountDetails.map(function(AccountDetails, index) {
                return (
                  <WorkStations AccountDetails={AccountDetails}></WorkStations>
                );
              })}
          </ul>
        ) : (
          <ul>
            <DisplayAddWorkstation />
            <br />
            <br />
            <div className="jumbotron">
              <button className="btn btn-secondary" style={{ float: "right" }}>
                X
              </button>
              <h3>Work Station</h3>

              <li>
                <div>Desk Location:</div> Null
              </li>

              <li>
                <div>Additional Information:</div>
                Null
              </li>

              <li>
                <div> Date Added:</div> Null
              </li>
            </div>
          </ul>
        )}
      </>
    );
  }
}

export default ManageWorkstations;

class WorkStations extends React.Component {
  var;
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props };
    this.deleteWorkStation = this.deleteWorkStation.bind(this);
  }

  deleteWorkStation(e) {
    //console.log(`${this.state.AccountDetails.UDId}`);
    let QuestionId = this.state.AccountDetails.UDId;
    console.log(QuestionId);

    let data = { QuestionId };

    fetch("/delete-work-station", {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    alert("Item Deleted");
    window.location.reload();
  }

  render() {
    return (
      <div className="jumbotron">
        <button
          onClick={this.deleteWorkStation}
          style={{ float: "right" }}
          className="btn btn-secondary"
        >
          x
        </button>
        <h3>Work Station</h3>

        <li key="Desk-Location">
          Desk Location:
          {this.state.AccountDetails.DeskLocation}
        </li>

        <li key="Additional-Information">
          Additional Information:
          {this.state.AccountDetails.ExtraInformation}
        </li>

        <li key="Date-Added">
          Date Added:
          {this.state.AccountDetails.DateAdded}
        </li>
      </div>
    );
  }
}

class DisplayAddWorkstation extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      show: false,
      show1: false
    };
  }

  handleClose() {
    this.setState({
      show: false,
      show1: false
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
    // console.log(this.state);

    return (
      <div className="header-container">
        <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={this.handleShow}
        >
          +
        </button>

        <button
          style={{ float: "right" }}
          className="btn btn-secondary"
          onClick={this.handleRefresh}
        >
          ⟲
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <AddWorkstation />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
