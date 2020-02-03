import React from "react";
import logo from "../codestone logo.png";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";
import { Button } from "react";

function NavBarAdmin() {
  return (
    <div>
      <br />
      <Link to="/home">
        <button type="button" class="btn btn-light">
          Home
        </button>
      </Link>
      <Link to="/admin-question-editor">
        <button type="button" class="btn btn-light">
          Edit Questions(Admin)
        </button>
      </Link>
      <Link to="/admin-view-users">
        <button type="button" class="btn btn-light">
          View Users(Admin)
        </button>
      </Link>
    </div>
  );
}

export default NavBarAdmin;
