import React from "react";
import logo from "../codestone logo.png";

import NavBar from "../PageDetails/Headers/NavBarUsers";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";

import { Link } from "react-router-dom";
import { get } from "http";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answeredQuestions: [],
      WSAHeader: []
    };
    this.getWSAAnsweredQuestions = this.getWSAAnsweredQuestions.bind(this);
    this.getWSAHeader = this.getWSAHeader.bind(this);
  }

  getWSAAnsweredQuestions() {
    let data = {
      WSAId: this.props.location.state.WSAId
    };
    fetch("/get-completed-questions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ answeredQuestions: results.recordset });
      });
  }

  getWSAHeader() {
    let data = {
      WSAId: this.props.location.state.WSAId
    };
    fetch("/get-WSA-header", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ WSAHeader: results.recordset });
        console.log(this.state.WSAHeader);
      });
  }

  componentDidMount() {
    this.getWSAHeader();
    this.getWSAAnsweredQuestions();
  }
  render() {
    return (
      <>
        <Header />
        <h3 style={{ textAlign: "center" }}>Workstation Assessment</h3>

        <DisplayWSAHeader WSAHeader={this.state.WSAHeader} />
        <DisplayWSAAnsweredQuestions
          answeredQuestions={this.state.answeredQuestions}
        />
      </>
    );
  }
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
    </div>
  );
}

export default Home;

class DisplayWSAAnsweredQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMoreToken: false
    };
  }
  render() {
    return (
      <>
        {this.props.answeredQuestions &&
          this.props.answeredQuestions.map((question, index) => {
            if (
              (!this.state.viewMoreToken &&
                question.QuestionResponse === "Y") ||
              question.QuestionResponse === "N"
            ) {
              return (
                <ul>
                  <div
                    style={{
                      backgroundColor: "#E6E6E6",
                      padding: "1px"
                    }}
                  >
                    <button
                      className="btn btn-secondary"
                      style={{ float: "right" }}
                      onClick={e => this.setState({ viewMoreToken: true })}
                    >
                      View Details
                    </button>
                    <ul>
                      {question.QuestionWhenAnswered} <div>✔️</div>
                    </ul>
                  </div>
                </ul>
              );
            } else if (
              !this.state.viewMoreToken &&
              question.QuestionResponse === "P"
            ) {
              return (
                <ul>
                  <div
                    style={{
                      backgroundColor: "#BDBDBD",
                      padding: "1px"
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      style={{ float: "right" }}
                      onClick={e => this.setState({ viewMoreToken: true })}
                    >
                      View Details
                    </button>
                    <ul>
                      <u>{question.QuestionWhenAnswered} </u>
                      <div>❌</div>{" "}
                    </ul>
                  </div>
                </ul>
              );
            } else if (
              (!this.state.viewMoreToken &&
                question.QuestionResponse === "Y") ||
              question.QuestionResponse === "N"
            ) {
              return <>tester</>;
            } else if (
              (!this.state.viewMoreToken &&
                question.QuestionResponse === "Y") ||
              question.QuestionResponse === "N"
            ) {
              return <>test</>;
            }
          })}
      </>
    );
  }
}

class DisplayWSAHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        {this.props.WSAHeader &&
          this.props.WSAHeader.map(function(header, index) {
            return (
              <div className="grid-container">
                <ul>
                  <div className="grid-item" style={{ float: "left" }}>
                    <b>User :</b>
                  </div>
                  <div className="grid-item">
                    <b>Workstation :</b> {header.AssignedWorkstation}
                  </div>
                </ul>
                <ul>
                  <div className="grid-item" style={{ float: "left" }}>
                    <b>Date :</b> {header.Date}
                  </div>
                  <div className="grid-item">
                    <b>Status :</b> {header.QuestionStatus}
                  </div>
                </ul>
                <br />
              </div>
            );
          })}
      </>
    );
  }
}
