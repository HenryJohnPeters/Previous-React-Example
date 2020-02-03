import React from "react";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";
import Header from "../PageDetails/Headers/Header";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = { confirmedUser: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ confirmedUser: true });
    alert(`Email Confirmed `);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <p>If you are real press the button. If you are a robot dont.</p>
        <button onClick={this.handleSubmit}>Confirm</button>{" "}
        <Link to="/">
          <button>Back to Login</button>
        </Link>
      </div>
    );
  }
}

export default LoginPage;
