import React from "react";
import logo from "../codestone logo.png";
import moment from "moment";
import NavBar from "../PageDetails/Headers/NavBarUsers";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import AdminButton from "../PageDetails/Buttons/AdminButton/AdminButton";
import { Modal } from "react-bootstrap";
import Fade from "react-reveal";
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
        this.setState({
          WSAHeader: results.recordset
        });
        this.setState({
          userName: this.state.WSAHeader[0].NameOfUser,
          workstation: this.state.WSAHeader[0].AssignedWorkstation
        });

        console.log(this.state.WSAHeader);
      });
  }

  componentDidMount() {
    this.getWSAHeader();
    this.getWSAAnsweredQuestions();
  }
  render() {
    // alert(this.state.WSAHeader.NameOfUser);
    console.log(this.state.WSAHeader);
    // console.log(this.state.WSAHeader[0].NameOfUser);
    console.log(this.state.WSAHeader.QuestionStatus);

    return (
      <>
        <div style={{ border: "offset" }}>
          <Header />
          {/* <h3 style={{ textAlign: "center" }}>Workstation Assessment</h3> */}
          {/* <button
          onClick={e =>
            alert(
              this.state.WSAHeader[0].AssignedWorkstation +
                this.state.WSAHeader[0].NameOfUser
            )
          }
        ></button> */}
          <Fade left>
            <DisplayWSAHeader WSAHeader={this.state.WSAHeader} />
          </Fade>
          <Fade right>
            <WSAAnsweredQuestions
              workstation={this.state.workstation}
              userName={this.state.userName}
              answeredQuestions={this.state.answeredQuestions}
              amountOfQuestions={this.state.answeredQuestions.length}
            />
          </Fade>
        </div>
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
              <ul>
                <div style={{ border: "100px" }}>
                  <DisplayWSAAnsweredQuestions
                    id={question.Id}
                    questionWhenAnswered={question.QuestionWhenAnswered}
                    questionResponse={question.QuestionResponse}
                    suggestedSoloution={question.SuggestedSoloution}
                    WSAId={question.WSAId}
                    ResponseId={question.ResponseId}
                    amountOfQuestions={this.props.amountOfQuestions}
                    WSAHeader={this.props.WSAHeader}
                    userName={this.props.userName}
                    workstation={this.props.workstation}
                  />
                </div>
                <br />
              </ul>
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
              <>
                <ul style={{ paddingBottom: "25px" }}>
                  <div style={{ backgroundColor: "lightGrey" }}>
                    <h3
                      style={{
                        textAlign: "center",
                        textDecoration: "underline"
                      }}
                    >
                      Workstation Assessment
                    </h3>
                    <ul style={{}}>
                      <b>User:</b>
                      {header.NameOfUser}
                    </ul>
                    <ul>
                      <b>Workstation :</b> {header.AssignedWorkstation}
                    </ul>
                    {/* <ul>
                      <b>Date: </b>
                      {moment(header.Date).format(" DD/MM/YYYY ")}
                    </ul> */}
                    <ul>
                      <b>Status :</b> {header.QuestionStatus}
                    </ul>
                    <ul>
                      <b> Email: </b>
                      {header.Email}
                    </ul>
                    <ul>
                      <b> Contact Number: </b>
                      {header.ContactNumber}
                    </ul>
                    <br />{" "}
                  </div>
                </ul>
              </>
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
      viewFullDetailsToken: true,
      noteToBeAdded: "",
      WSAResponses: [],
      ViewCompletedResponsesToken: false
    };
    this.submitNote = this.submitNote.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }

  viewDetails() {
    this.setState({ viewFullDetailsToken: false });
  }

  submitNote() {
    if (this.state.noteToBeAdded.length > 5) {
      var today = new Date(),
        date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
          1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;
      let email = window.localStorage.getItem("User");

      let data = {
        responseId: this.props.ResponseId,
        response: this.state.noteToBeAdded,
        date: date,
        seenStatus: 0,
        email: email,
        questionWhenAnswered: this.props.questionWhenAnswered,
        userName: this.props.userName,
        workstation: this.props.workstation,
        name: this.state.name[0].NameOfUser
      };

      fetch("/submit-WSA-Response-Admin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      window.location.reload();
      alert("Response Added");
    } else if (!this.state.noteToBeAdded.length < 5) {
      alert("A Response must consist of more than 5 characters");
    }
  }
  componentDidMount() {
    let responseId = this.props.ResponseId;

    let data = {
      responseId: responseId
    };
    fetch("/get-WSA-responses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ WSAResponses: results.recordset });
        console.log(this.state.WSAResponses);
        // alert(this.state.WSAResponses);
      });

    this.getUserName();

    this.setState({ viewFullDetailsToken: true });
  }

  getUserName() {
    let email = window.localStorage.getItem("User");
    let data = {
      email: email
    };
    fetch("/get-user-name-for-response", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ name: results.recordset });
        console.log(this.state.name);
        // alert(this.state.WSAResponses);
      });
  }

  render() {
    if (
      this.state.WSAResponses.length &&
      this.state.viewFullDetailsToken &&
      this.props.questionResponse === "Y" &&
      !this.state.ViewCompletedResponsesToken
    ) {
      return (
        <>
          <div
            style={{
              backgroundColor: "#E6E6E6",
              paddingBottom: "40px"
            }}
          >
            {" "}
            <button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={e =>
                this.setState({ ViewCompletedResponsesToken: true })
              }
            >
              {" "}
              View Responses{" "}
            </button>
            <ul>
              {" "}
              {this.props.questionWhenAnswered}
              <div style={{ float: "right" }}>✔️</div>
              <br />
              <b>Answer :</b> Yes
            </ul>{" "}
          </div>
        </>
      );
    } else if (
      this.state.WSAResponses.length &&
      this.state.viewFullDetailsToken &&
      this.props.questionResponse === "Y" &&
      this.state.ViewCompletedResponsesToken
    ) {
      return (
        <>
          <div
            style={{
              backgroundColor: "#E6E6E6",
              paddingBottom: "40px"
            }}
          >
            {" "}
            <button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={e =>
                this.setState({ ViewCompletedResponsesToken: false })
              }
            >
              {" "}
              View Responses{" "}
            </button>
            <ul>
              {" "}
              {this.props.questionWhenAnswered}
              <div style={{ float: "right" }}>✔️</div>
              <br />
              <b>Answer :</b> Yes{" "}
              {this.state.WSAResponses &&
                this.state.WSAResponses.map((r, index) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#E5E5E5",
                        border: "inset",
                        background: "white"
                      }}
                    >
                      <div style={{ float: "right" }}>
                        {moment(r.Date).format("HH:MM  DD/MM/YYYY ")}
                      </div>
                      {r.Response}
                    </div>
                  );
                })}{" "}
            </ul>
          </div>
        </>
      );
    } else if (
      !this.state.WSAResponses.length &&
      this.state.viewFullDetailsToken &&
      this.props.questionResponse === "Y" &&
      !this.state.ViewCompletedResponsesToken
    ) {
      return (
        <>
          <div
            style={{
              backgroundColor: "#E6E6E6",
              paddingBottom: "40px"
            }}
          >
            <ul>
              {" "}
              {this.props.questionWhenAnswered}
              <div style={{ float: "right" }}>✔️</div>
              <br />
              <b>Answer :</b> Yes
            </ul>{" "}
          </div>
        </>
      );
    } else if (
      this.state.viewFullDetailsToken &&
      this.props.questionResponse === "N"
    ) {
      return (
        <>
          <div
            style={{
              backgroundColor: "#E6E6E6",
              padding: "1px"
            }}
          >
            <ul>
              {" "}
              {this.props.questionWhenAnswered}
              <div style={{ float: "right" }}>✔️</div>
              <br />
              <b> Answer :</b> No, but not a problem
              {/* {this.props.questionWhenAnswered} <br /> */}
              {/* <b> Suggested Soloution :</b> {this.props.suggestedSoloution} */}
              {this.state.WSAResponses &&
                this.state.WSAResponses.map((r, index) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#E5E5E5",
                        border: "inset"
                      }}
                    >
                      <div style={{ float: "right" }}>
                        {moment(r.Date).format("HH:MM  DD/MM/YYYY ")}
                      </div>
                      {r.Response}
                    </div>
                  );
                })}
            </ul>{" "}
          </div>
        </>
      );
    } else if (
      this.state.viewFullDetailsToken &&
      this.props.questionResponse === "P"
    ) {
      return (
        <>
          <div
            style={{
              backgroundColor: "#BDBDBD",
              padding: "1px"
            }}
          >
            <ul>
              {this.props.questionWhenAnswered}
              <div style={{ float: "right" }}>❌ </div> <br />
              <b>Answer : </b> No, and it is a problem <br />
              <b> Suggested Soloution :</b> {this.props.suggestedSoloution}
              {this.state.WSAResponses &&
                this.state.WSAResponses.map((r, index) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#E5E5E5",
                        border: "inset"
                      }}
                    >
                      <div style={{ float: "right" }}>
                        {moment(r.Date).format("HH:MM  DD/MM/YYYY ")}
                      </div>
                      <b>
                        <>{r.UserName}: </>
                      </b>
                      {r.Response}
                    </div>
                  );
                })}
            </ul>
            <button
              style={{ width: "10%", textAlign: "center", float: "right" }}
              className="btn btn-primary"
              onClick={this.viewDetails}
            >
              Add Response
            </button>{" "}
            <br />
            <br />
            <AcceptSolutionModal
              responseId={this.props.ResponseId}
              amountOfQuestions={this.props.amountOfQuestions}
              questionWhenAnswered={this.props.questionWhenAnswered}
              WSAHeader={this.props.WSAHeader}
            />
            <br />
            <br />
            <br />
          </div>
        </>
      );
    } else if (
      !this.state.viewFullDetailsToken &&
      this.props.questionResponse === "P"
    ) {
      return (
        <>
          <div
            style={{
              backgroundColor: "#BDBDBD",
              padding: "1px"
            }}
          >
            <button
              onClick={e => this.setState({ viewFullDetailsToken: true })}
              style={{ float: "right" }}
              className="btn btn-secondary"
            >
              Go back
            </button>
            <ul>
              {this.props.questionWhenAnswered}{" "}
              <div style={{ float: "right" }}>❌ </div>
              <br />
              <b>Answer :</b> No, and it is a problem <br />
              <b> Suggested Soloution :</b> {this.props.suggestedSoloution}
              {this.state.WSAResponses &&
                this.state.WSAResponses.map((r, index) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#E5E5E5",
                        border: "inset"
                      }}
                    >
                      <div style={{ float: "right" }}>
                        {moment(r.Date).format("HH:MM  DD/MM/YYYY ")}
                      </div>
                      {r.Response}
                    </div>
                  );
                })}
            </ul>
            <ul>
              <br />

              <textarea
                style={{
                  width: "100%",
                  padding: "10px"
                }}
                onChange={e => this.setState({ noteToBeAdded: e.target.value })}
              />
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={this.submitNote}
              >
                {" "}
                Submit Response
              </button>
            </ul>

            <br />

            <AcceptSolutionModal
              responseId={this.props.ResponseId}
              amountOfQuestions={this.props.amountOfQuestions}
              questionWhenAnswered={this.props.questionWhenAnswered}
              noteToBeAdded={this.props.noteToBeAdded}
              WSAHeader={this.props.WSAHeader}
            />

            <br />
            <br />
            <br />
          </div>
        </>
      );
    }
  }
}

class AcceptSolutionModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);
    this.acceptSoloution = this.acceptSoloution.bind(this);

    this.state = {
      show: false
    };
  }

  acceptSoloution() {
    // alert(this.props.questionWhenAnswered);

    let email = window.localStorage.getItem("User");

    let data = {
      responseId: this.props.responseId,
      amountOfQuestions: this.props.amountOfQuestions,
      email: email,
      questionWhenAnswered: this.props.questionWhenAnswered
    };
    fetch("/update-response-to-confirmed", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    alert("Response Set to completed");
    this.handleClose();
    window.location.reload();
  }
  handleClose() {
    this.setState({
      show: false
    });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleRefresh() {
    window.location.reload();
  }

  render() {
    // alert(this.props.amountOfQuestions);
    // console.log(this.state);

    return (
      <div className="header-container">
        <button
          className="btn btn-primary"
          style={{ width: "10%", textAlign: "center", float: "right" }}
          onClick={this.handleShow}
        >
          <ul> Accept </ul>Soloution
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to accept this soloution? </h4>
            <br />
            <button
              onClick={this.acceptSoloution}
              className="btn btn-primary"
              style={{ width: "50%" }}
            >
              Yes
            </button>
            <button
              onClick={this.handleClose}
              className="btn btn-primary"
              style={{ width: "50%" }}
            >
              No
            </button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
