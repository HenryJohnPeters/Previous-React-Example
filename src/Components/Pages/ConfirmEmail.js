import React from "react";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";
import Header from "../PageDetails/Headers/Header";
// import Fade from "react-reveal";
import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = { confirmedUser: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ confirmedUser: true });

    toast.info("Email Confirmed", {
      draggable: true,
      autoClose: 1500
    });
  }

  render() {
    return (
      <div className="App">
        <ToastContainer transition={Zoom} position="top-right" />
        <Header />
        {/* <Fade left> */}
          <p>If you are real press the button. If you are a robot dont.</p>
        {/* </Fade>
        <Fade right> */}
          <button onClick={this.handleSubmit}>Confirm</button>{" "}
        {/* </Fade>
        <Fade> */}
          <Link to="/">
            <button>Back to Login</button>
          </Link>
        {/* </Fade> */}
      </div>
    );
  }
}

export default LoginPage;
