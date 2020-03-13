import React from "react";
import { Link } from "react-router-dom";

class LogoutButton extends React.Component {
  constructor() {
    super();

    this.LogOut = this.LogOut.bind(this);
  }

  LogOut(e) {
    window.localStorage.removeItem("myToken");
    window.localStorage.removeItem("User");
    window.localStorage.removeItem("adminToken");
  }

  render() {
    return (
      <Link to="/">
        <button type="button" class="btn btn-secondary" onClick={this.LogOut}>
          Log Out
        </button>
      </Link>
    );
  }
}

export default LogoutButton;
