import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBarUsers() {
  return (
    <div>
      <br />
      <Link to="/user-questions">
        <button type="button" className="btn btn-secondary">
          Questions
        </button>
      </Link>
       
    </div>
  );
}

export default NavBarUsers;
