import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import UpdateAccountDetailsForm from "./UpdateAccountDetailsForm";

class DisplayUserAcountDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { AccountDetails: [] };
  }
  // sets the questions form sql into state for questions
  getItems() {
    var user = window.localStorage.getItem("User");
    if (user) {
      fetch(`/profile-account-details/${user}`)
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

  handleRefresh() {
    window.location.reload();
  }

  render() {
    return (
      <ul>
        <button
          className="btn btn-secondary"
          style={{ float: "left " }}
          disabled
        >
          Account Details
        </button>

        <Link to="/profile-display-work-stations">
          <button className="btn btn-secondary" style={{ float: "left " }}>
            Manage Work stations
          </button>
        </Link>
        {/* <button
          style={{ float: "right" }}
          className="btn btn-secondary"
          onClick={this.handleRefresh}
        >
          ⟲
        </button> */}
        <br />
        <br />

        {this.state.AccountDetails &&
          this.state.AccountDetails.map(function(AccountDetails, index) {
            return (
              <div className="jumbotron">
                <UpdateAccountDetails email ={AccountDetails.Email}
                 name = {AccountDetails.NameOfUser}
                 number ={AccountDetails.ContactNumber} />
                <h3>Account Details</h3>
                <li> Email: {AccountDetails.Email}</li>
                <li> Name: {AccountDetails.NameOfUser}</li>
                <li> Contact Number: {AccountDetails.ContactNumber} </li>
                <li></li>
              </div>
            );
          })}
      </ul>
    );
  }
}

export default DisplayUserAcountDetails;

class UpdateAccountDetails extends React.Component {
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
          Update
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <UpdateAccountDetailsForm email ={this.props.email}
                 name = {this.props.name}
                 number ={this.props.number} />{" "}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
