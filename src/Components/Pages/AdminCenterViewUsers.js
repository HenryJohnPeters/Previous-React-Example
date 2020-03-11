import React from "react";
import logo from "../codestone logo.png";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";

import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";
import Fade from "react-reveal";

function Home() {
  return (
    <div>
      <Header />

      <DisplayUsers />
    </div>
  );
}

function Header() {
  return (
    <div className="jumbotron">
      <div style={{ textAlign: "right" }}>
        <ProfileButton />
        <LogOutButton />
        <AdminButton />
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
      <Link to="./home">
        <button className="btn btn-secondary">Home </button>
      </Link>
    </div>
  );
}

export default Home;

class DisplayUsers extends React.Component {
  constructor() {
    super();

    this.state = { users: [] };
  }
  componentDidMount() {
    this.setState({
      users: this.getItems()
    });
  }

  getItems() {
    try {
      fetch("/admin-view-users")
        .then(recordset => recordset.json())
        .then(results => {
          console.log(results.recordset);
          this.setState({ users: results.recordset });
        });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log(this.state.users);
    return (
      <>
        <Fade left>
          <ul>
            <h2 style={{ textAlign: "center" }}>Registered Users</h2>
          </ul>
        </Fade>
        <Fade right>
          <ul>
            <Link to="./admin-view-workstation-assessments">
              <button className="btn btn-secondary">
                Workstation Assessments
              </button>
            </Link>
            <Link to="./admin-center">
              <button className="btn btn-secondary">Edit Questions</button>
            </Link>
            <button disabled className="btn btn-secondary">
              View Users
            </button>

            {this.state.users &&
              this.state.users.map(function(user, index) {
                return (
                  <div className="jumbotron">
                    <li>
                      <b>User Name: </b>
                      {user.NameOfUser}
                    </li>{" "}
                    <li>
                      {" "}
                      <b>Unique ID: </b>
                      {user.RUId}
                    </li>
                    <li>
                      {" "}
                      <b>User Email: </b>
                      {user.Email}
                    </li>
                    <li>
                      <b>Contact Number: </b>
                      {user.ContactNumber}
                    </li>
                    <li>
                      <b>Last Login: </b>
                      {user.LastLogin}
                    </li>
                    <li>
                      <b>Last Password Update: </b> {user.LastLogin}
                    </li>
                  </div>
                );
              })}
          </ul>{" "}
        </Fade>
      </>
    );
  }
}
