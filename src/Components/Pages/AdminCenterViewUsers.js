import React from "react";
import logo from "../codestone logo.png";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";

import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";

function Home() {
  return (
    <div>
      <Header />
      <DisplayUsers />

      <p>Admin section of the webpage </p>
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
      <ul>
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
                <li> Unique ID: {user.RUId}</li>
                <li> User Email:{user.Email}</li>
                <li>User Name: {user.NameOfUser}</li>
                <li>Contact Number: {user.ContactNumber}</li>
                <li>Last Login {user.LastLogin}</li>
                <li>Last Password Update {user.LastLogin}</li>
                <button className="btn btn-secondary">See Details</button>
              </div>
            );
          })}
      </ul>
    );
  }
}
