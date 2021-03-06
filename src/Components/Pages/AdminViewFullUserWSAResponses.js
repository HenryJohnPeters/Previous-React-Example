import React, { useState, useEffect } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import AdminHeader from "../PageDetails/Headers/HeaderAdmin";
// import Fade from "react-reveal";
import { Link } from "react-router-dom";
import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

        console.log(this.state.WSAHeader);
      });
  }

  componentDidMount() {
    this.getWSAHeader();
    this.getWSAAnsweredQuestions();

  }
  render() {
    console.log(this.state.WSAHeader);

    console.log(this.state.WSAHeader.QuestionStatus);

    return (
      <>
        <div style={{ border: "offset" }}>
          <AdminHeader>
             
          <div style ={{float : "left", paddingLeft : "5px"}}><Link to ="./admin-center"><button className = "btn btn-primary"> Go back</button></Link></div>
          </AdminHeader>
          <ToastContainer transition={Zoom} position="top-right" />

          {/* <Fade left> */}
            <DisplayWSAHeader WSAHeader={this.state.WSAHeader} />
          {/* </Fade>
          <Fade right> */}
            <WSAAnsweredQuestions
              WSAHeader={this.state.WSAHeader}
              workstation={this.state.workstation}
              userName={this.state.userName}
              answeredQuestions={this.state.answeredQuestions}
              amountOfQuestions={this.state.answeredQuestions.length}
              WSAId={this.props.location.state.WSAId}
            />
          {/* </Fade> */}
        </div>
      </>
    );
  }
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
        <ToastContainer transition={Zoom} position="top-right" />
        {this.props.answeredQuestions &&
          this.props.answeredQuestions.map((question, index) => {
            return (
              <ul>
                <div style={{ border: "100px" }}>
                  <DisplayWSAAnsweredQuestions
                    id={question.Id}
                    questionWhenAnswered={question.QuestionWhenAnswered}
                    questionResponse={question.QuestionResponse}
                    suggestedSoloution={question.SuggestedSoloution}
                    ResponseId={question.ResponseId}
                    amountOfQuestions={this.props.amountOfQuestions}
                    WSAHeader={this.props.WSAHeader}
                    userName={this.props.userName}
                    workstation={this.props.workstation}
                    WSAId={this.props.WSAId}
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
                {" "}
                <ToastContainer transition={Zoom} position="top-right" />
                <ul style={{ paddingBottom: "25px" }}>
                  <div   style={{  backgroundColor: "#E6E6E6", border: "solid", borderColor: "LightGray" }}>
                    <h3
                      style={{
                        textAlign: "center",
                        textDecoration: "underline"
                      }}
                    >
                      Workstation Self-Assessment
                    </h3>
                    <ul style={{}}>
                      <b>User: </b>
                      {header.NameOfUser}
                    </ul>
                    <ul>
                      <b>Workstation: </b> {header.AssignedWorkstation}
                    </ul>
                    <ul>
                      <b>Status: </b> {header.QuestionStatus}
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

  async submitNote() {
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
        name: this.state.name[0].NameOfUser,
        WSAId: this.props.WSAId
      };

      fetch("/submit-WSA-Response-Admin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      await toast.info("Added", {
        // className: "custom-toast",
        draggable: true,

        autoClose: 3500
      });

      window.location.reload();
    } else if (!this.state.noteToBeAdded.length < 5) {
      toast.error("A Response must consist of more than 5 characters", {
        // className: "custom-toast",
        draggable: true,

        autoClose: 1500
      });
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
          <ToastContainer transition={Zoom} position="top-right" />
          <div
             style={{  backgroundColor: "#E6E6E6", border: "solid", borderColor: "LightGray",paddingBottom: "40px" }}>
           
            
          
            {" "}
            <button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={e =>
                this.setState({ ViewCompletedResponsesToken: true })
              }
            >
              {" "}
              Reponses{" "}
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
          <ToastContainer transition={Zoom} position="top-right" />
          <div
            style={{  backgroundColor: "#E6E6E6", border: "solid", borderColor: "LightGray",paddingBottom: "40px" }}>
         
            {" "}
            <button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={e =>
                this.setState({ ViewCompletedResponsesToken: false })
              }
            >
              {" "}
              Hide{" "}
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
                    <>
                      <ToastContainer transition={Zoom} position="top-right" />
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
                    </>
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
          <ToastContainer transition={Zoom} position="top-right" />
          <div
             style={{  backgroundColor: "#E6E6E6", border: "solid", borderColor: "LightGray",paddingBottom: "40px" }}>
            
           
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
          <ToastContainer transition={Zoom} position="top-right" />
          <div
             style={{  backgroundColor: "#E6E6E6", border: "solid", borderColor: "LightGray",paddingBottom: "40px" }}>
          
            <ul>
              {" "}
              {this.props.questionWhenAnswered}
              <div style={{ float: "right" }}>✔️</div>
              <br />
              <b> Answer :</b> No, but not a problem
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
          <ToastContainer transition={Zoom} position="top-right" />
          <div
            
            style={{  backgroundColor: "#D3D3D3", border: "solid", borderColor: "DarkGray",  }}>

    <button
              style={{  textAlign: "center", float: "right" ,padding: "5px"}}
              className="btn btn-secondary"
              onClick={this.viewDetails}
            >
              Show
            </button> 
          
            <ul>
              {this.props.questionWhenAnswered}
              <div style={{ float: "right" }}>❌ </div> <br />
              <b>Answer : </b> No, and it is a problem <br />
              <b> Suggested Soloution :</b> {this.props.suggestedSoloution}
              {this.state.WSAResponses &&
                this.state.WSAResponses.map((r, index) => {
                  return (
                    <>
                    <div
                      style={{
                        backgroundColor: "white",
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
                    
                    </>
                  );
                })}
         </ul> <AcceptSolutionModal
              responseId={this.props.ResponseId}
              amountOfQuestions={this.props.amountOfQuestions}
              questionWhenAnswered={this.props.questionWhenAnswered}
              WSAHeader={this.props.WSAHeader}
              WSAId={this.props.WSAId}
              workstation={this.props.workstation}
              userName={this.props.userName}
            /><br/>
             
         
          </div>
        </>
      );
    } else if (
      !this.state.viewFullDetailsToken &&
      this.props.questionResponse === "P"
    ) {
      return (
        <>
          <ToastContainer transition={Zoom} position="top-right" />
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
              Hide
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
                      <b>
                        <>{r.UserName}: </>
                      </b>
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
  componentDidMount() {
  
  }

  acceptSoloution() {
    let email = window.localStorage.getItem("User");

    let data = {
      WSAId: this.props.WSAId,
      responseId: this.props.responseId,
     
      email: email,
      questionWhenAnswered: this.props.questionWhenAnswered,
      userName: this.props.WSAHeader[0].NameOfUser,
      workstation: this.props.WSAHeader[0].AssignedWorkstation
    };
    fetch("/update-response-to-confirmed", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    

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
    return (
      <div className="header-container">
        <ToastContainer transition={Zoom} position="top-right" />
        <ul>
          <br/>
        <button
          className="btn btn-primary"
          style={{ width: "100%", textAlign: "center"  }}
          onClick={this.handleShow}
        >
          <ul>Accept</ul>
        </button>
        </ul>

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
