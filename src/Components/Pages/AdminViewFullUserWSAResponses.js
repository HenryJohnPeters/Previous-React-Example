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
        console.log(this.state.answeredQuestions);
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
        <WSAAnsweredQuestions
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

class WSAAnsweredQuestions extends React.Component {
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
            // alert(question.SuggestedSoloution);
            return (
              <>
                <DisplayWSAAnsweredQuestions
                  id={question.Id}
                  questionWhenAnswered={question.QuestionWhenAnswered}
                  questionResponse={question.QuestionResponse}
                  suggestedSoloution={question.SuggestedSoloution}
                  WSAId={question.WSAId}
                  ResponseId={question.ResponseId}
                />
              </>
            );
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

class DisplayWSAAnsweredQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewFullDetailsToken: false,
      noteToBeAdded: ""
    };
    this.submitNote = this.submitNote.bind(this);
    this.getWSAResponses = this.getWSAResponses.bind(this);
  }
  submitNote() {
    // alert(this.props.ResponseId);
    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

    let data = {
      responseId: this.props.ResponseId,
      response: this.state.noteToBeAdded,
      date: date,
      seenStatus: 0
    };

    fetch("/submit-WSA-Response-Admin", {
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

  getWSAResponses() {
    let data = { ResponseId: this.props.ResponseId };

    fetch("/get-WSA-Responses", {
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

    this.setState({ viewFullDetailsToken: true });
  }

  render() {
    console.log(this.state.noteToBeAdded);
    if (
      !this.state.viewFullDetailsToken &&
      this.props.questionResponse === "Y"
    ) {
      return (
        <>
          <ul>
            <div
              style={{
                backgroundColor: "#E6E6E6",
                padding: "1px"
              }}
            >
              <button
                style={{ float: "right" }}
                className="btn btn-primary"
                onClick={e => this.setState({ viewFullDetailsToken: true })}
              >
                View Details{" "}
              </button>
              <ul>
                {" "}
                <div style={{ float: "right" }}>✔️</div>
                {this.props.questionWhenAnswered}
              </ul>{" "}
              <br />
            </div>
          </ul>
        </>
      );
    } else if (
      !this.state.viewFullDetailsToken &&
      this.props.questionResponse === "P"
    ) {
      return (
        <>
          <ul>
            <div
              style={{
                backgroundColor: "#BDBDBD",
                padding: "1px"
              }}
            >
              <button
                style={{ float: "right" }}
                className="btn btn-primary"
                onClick={this.getWSAResponses}
              >
                View Details
              </button>
              <ul>
                {this.props.questionWhenAnswered}{" "}
                <div style={{ float: "right" }}>❌</div>
              </ul>
              <br />
            </div>
          </ul>
        </>
      );
    } else if (
      !this.state.viewFullDetailsToken &&
      this.props.questionResponse === "N"
    ) {
      return (
        <>
          <ul>
            <div
              style={{
                backgroundColor: "#E6E6E6",
                padding: "1px"
              }}
            >
              <button
                style={{ float: "right" }}
                className="btn btn-primary"
                onClick={e => this.setState({ viewFullDetailsToken: true })}
              >
                View Details{" "}
              </button>
              <ul>
                {" "}
                <div style={{ float: "right" }}>✔️</div>
                {this.props.questionWhenAnswered}
              </ul>{" "}
              <br />
            </div>
          </ul>
        </>
      );
    } else if (
      this.state.viewFullDetailsToken &&
      this.props.questionResponse === "Y"
    ) {
      return (
        <>
          <ul>
            <div
              style={{
                backgroundColor: "#E6E6E6",
                padding: "1px"
              }}
            >
              <button
                style={{ float: "right" }}
                className="btn btn-secondary"
                onClick={e => this.setState({ viewFullDetailsToken: false })}
              >
                Revert{" "}
              </button>
              <ul>
                {" "}
                {this.props.questionWhenAnswered}
                <div style={{ float: "right" }}>✔️</div>
                <br />
                Answer : Yes
              </ul>{" "}
            </div>
          </ul>
        </>
      );
    } else if (
      this.state.viewFullDetailsToken &&
      this.props.questionResponse === "N"
    ) {
      return (
        <>
          <ul>
            <div
              style={{
                backgroundColor: "#E6E6E6",
                padding: "1px"
              }}
            >
              <button
                style={{ float: "right" }}
                className="btn btn-secondary"
                onClick={e => this.setState({ viewFullDetailsToken: false })}
              >
                Revert{" "}
              </button>
              <ul>
                {" "}
                {this.props.questionWhenAnswered}
                <div style={{ float: "right" }}>✔️</div>
                <br />
                Answer : No, but not a problem
              </ul>{" "}
            </div>
          </ul>
        </>
      );
    } else if (
      this.state.viewFullDetailsToken &&
      this.props.questionResponse === "P"
    ) {
      return (
        <>
          <ul>
            <div
              style={{
                backgroundColor: "#BDBDBD",
                padding: "1px"
              }}
            >
              <button
                style={{ float: "right" }}
                className="btn btn-primary"
                onClick={e => this.setState({ viewFullDetailsToken: false })}
              >
                View Details
              </button>
              <ul>
                {this.props.questionWhenAnswered} <br />
                <b> Suggested Soloution :</b> {this.props.suggestedSoloution}
                <div style={{ float: "right" }}>❌</div>
                <textarea
                  style={{ width: "100%" }}
                  onChange={e =>
                    this.setState({ noteToBeAdded: e.target.value })
                  }
                />
                <button
                  style={{ width: "100%", textAlign: "center" }}
                  className="btn btn-primary"
                  onClick={this.submitNote}
                >
                  Submit Note{" "}
                </button>
              </ul>

              <br />
            </div>
          </ul>
        </>
      );
    }
  }
}
