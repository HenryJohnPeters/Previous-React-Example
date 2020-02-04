import React from "react";
import { Link } from "react-router-dom";

class AdminButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Link to="/admin-center">
        <button type="button" className="btn btn-Primary">
          Admin
        </button>
      </Link>
    );
  }
}

export default AdminButton;
