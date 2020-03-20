import React from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddWorkstation from "./UpdateUserWorkStationDetailsForm";

class ManageWorkstations extends React.Component {
  constructor() {
    super();

    this.state = { AccountDetails: [], exist: "" };
    this.getItems = this.getItems.bind(this);
  }

  getItems() {
    try {
      var user = window.localStorage.getItem("User");
      if (user) {
        fetch(`/profile-work-station-detailss/${user}`)
          .then(recordset => recordset.json())
          .then(results => {
            console.log(this.state.AccountDetails);
            this.setState({ AccountDetails: results.recordset });

            console.log(this.state.AccountDetails);
          });
      } else {
        alert("user not set");
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.getItems();

    console.log(this.state.AccountDetails);
  }
  render() {
    if (this.state.AccountDetails.length) {
      return (
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
            Manage Workstations
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
      );
    } else {
      return (
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
            Manage Workstations
          </button>

          <DisplayAddWorkstation />
          <br />
          <br />
          <div className="jumbotron">
            <li style={{ textAlign: "center" }}>
              <b>Please add a workplace using the blue + button.</b>{" "}
            </li>
          </div>
        </ul>
      );
    }
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
    let workstationId = this.state.AccountDetails.WSId;
     

    let data = { workstationId };

    fetch("/delete-work-station", {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    window.location.reload();
  }

  render() {
    return (
      <div className="jumbotron">
        <ToastContainer transition={Zoom} position="top-right" />
        <button
          onClick={this.deleteWorkStation}
          style={{ float: "right" }}
          className="btn btn-secondary"
        >
          x
        </button>
        

        <li key="Desk-Location">
          Desk Location : <b>{this.state.AccountDetails.AssignedWorkstation}</b>
        </li>

        <li key="Date-Added">
          Date Added :{" "}
          {moment(this.state.AccountDetails.DateAdded).format("LLL")}
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
      show: false
    };
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
      <div className="header-container">
        <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={this.handleShow}
        >
          +
        </button>

        {/* <button
          style={{ float: "right" }}
          className="btn btn-secondary"
          onClick={this.handleRefresh}
        >
          ⟲
        </button> */}

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
