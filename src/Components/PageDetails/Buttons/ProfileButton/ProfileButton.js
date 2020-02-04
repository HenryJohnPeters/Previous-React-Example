import React from "react";
import { Link } from "react-router-dom";

class ProfileButton extends React.Component {
  render() {
    return (
      <Link to="/profile">
        <button type="button" class="btn btn-secondary" onClick={this.LogOut}>
          Profile
        </button>
      </Link>
    );
  }
}

export default ProfileButton;
