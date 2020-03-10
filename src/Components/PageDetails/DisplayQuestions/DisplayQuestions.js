import React from "react";
import { Link } from "react-router-dom";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import Popup from "reactjs-popup";
import { ErrorMessage } from "formik";

var results = [];
var questionCounter = 0;

class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      QuestionsAnswer: [],
      workstations: [],
      selectedWorkStation: "",
      QuestionAndAnswer: {},
      AccountValidationMessage: ""
    };
    this.submitAnswers = this.submitAnswers.bind(this);
    this.pageRelocator = this.pageRelocator.bind(this);
  }
  // sets the questions form sql into state for questions
  getItems() {
    fetch("/user-questions")
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ questions: results.recordset });
      });
  }
  getWorkStations() {
    var user = window.localStorage.getItem("User");
    if (user) {
      fetch(`/profile-work-station-detailss/${user}`)
        .then(recordset => recordset.json())
        .then(results => {
          this.setState({ workstations: results.recordset });
          console.log(this.state.workstations);
        });
    }
  }
  componentDidMount() {
    this.setState({
      questions: this.getItems(),
      WorkStations: this.getWorkStations()
    });
  }
  pageRelocator(mssg) {
    if (mssg.length < 35) {
      window.location.href = "http://localhost:3000/completed-assessment";
    } else if (mssg.length > 35) {
      window.location.href = "http://localhost:3000/user-questions";
    }
  }
  submitAnswers() {
    let selectedWorkstation = window.localStorage.getItem("Workstation");
    let user = window.localStorage.getItem("User");

    let completeToken = "";
    let declinedCounter = 0;

    try {
      if (questionCounter == this.state.questions.length) {
        var today = new Date(),
          date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
            1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

        for (var i = 0; i < results.length; i++) {
          if (results[i].answer == "P") {
            declinedCounter++;
          } else {
          }
        }

        if (declinedCounter > 0) {
          completeToken = "In Progress";
        } else if (declinedCounter <= 0) {
          completeToken = "Complete";
        }

        console.log(completeToken);
        const data = {
          completeToken,
          results,
          selectedWorkstation,
          date,
          user: user
        };

        fetch("/post-question-answers/", {
          method: "POST", // or 'PUT'
          headers: {
            Accept: "application/json,",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(result => {
            result.json().then(({ AccountValidationMessage }) => {
              alert(AccountValidationMessage);
              this.pageRelocator(AccountValidationMessage);
            });
          })

          .catch(err => alert(err));
      } else {
        alert("Please enter all of The questions");
      }
    } catch (e) {
      console.info(e);
    }
  }

  render() {
    let selectedWorkStation = window.localStorage.getItem("Workstation");

    console.log(this.state.questions);
    if (this.state.workstations.length) {
      return (
        <div>
          <h3 style={{ textAlign: "center" }}>
            <u>Workstation Self-Assessment</u>
          </h3>
          <ul>
            <DropdownButton
              style={{ float: "right" }}
              id="dropdown-basic-button"
              title="Select Workstation Location"
            >
              {this.state.workstations &&
                this.state.workstations.map(function(workstations, index) {
                  return (
                    <div>
                      <WorkStationSelecter
                        workstations={workstations.AssignedWorkstation}
                      >
                        {" "}
                      </WorkStationSelecter>
                    </div>
                  );
                })}
            </DropdownButton>
            <br />
            <br />{" "}
            <div>
              <h6>
                {" "}
                <tr>
                  Desk Location Selected :{" "}
                  <u style={{ color: "grey" }}>{selectedWorkStation}</u>
                </tr>
              </h6>
            </div>
            {this.state.questions &&
              this.state.questions.map(function(questions, index) {
                return (
                  <div
                    className="jumbotron"
                    style={{ border: "solid", borderColor: "LightGray" }}
                  >
                    <Questions questions={questions}></Questions>
                  </div>
                );
              })}
            <br />
            <button
              onClick={this.submitAnswers}
              style={{ width: "100%" }}
              className="btn btn-primary"
            >
              Submit
            </button>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h3 style={{ textAlign: "center" }}>
            <u>Workstation Self-Assessment</u>
          </h3>

          <ul>
            <DropdownButton
              style={{ float: "right" }}
              id="dropdown-basic-button"
              title="Select Workstation Location"
            >
              {this.state.workstations &&
                this.state.workstations.map(function(workstations, index) {
                  return (
                    <div>
                      <WorkStationSelecter workstations={workstations}>
                        {" "}
                      </WorkStationSelecter>
                    </div>
                  );
                })}
            </DropdownButton>
            <br />
            <br />{" "}
            <div>
              <h6>
                {" "}
                <tr>
                  Desk Location Selected : <u style={{ color: "grey" }}>NULL</u>
                </tr>
              </h6>
              <div className="jumbotron">
                <li style={{ textAlign: "center" }}>
                  <b>
                    This account has no workstations assigned to it. Please
                    Navigate to the workstations segment of the profile page to
                    create one
                  </b>{" "}
                </li>
              </div>
            </div>
          </ul>
        </div>
      );
    }
  }
}

export default DisplayQuestions;

class WorkStationSelecter extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props };
    this.selectWorkStation = this.selectWorkStation.bind(this);
  }

  selectWorkStation(e) {
    e.preventDefault();

    window.localStorage.setItem("Workstation", this.props.workstations);
    window.location.reload();
  }
  render() {
    return (
      <>
        <Dropdown.Item onClick={this.selectWorkStation}>
          {this.props.workstations}
        </Dropdown.Item>
      </>
    );
  }
}
//
//
//
//
//
//
//
//
///
//
//
//
//
//
//
//
//
//
//
//

class Questions extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...props,
      QuestionAnswer: "",
      QuestionAccepted: false,
      problem: false,

      problemDefinition: "",
      completedQuestions: [],
      soloutionForDeclinedQuestion: ""
    };

    this.QuestionDecline = this.QuestionDecline.bind(this);
    this.QuestionOnChange = this.QuestionOnChange.bind(this);
    this.OnCommit = this.OnCommit.bind(this);

    this.RevertAcceptedAnswer = this.RevertAcceptedAnswer.bind(this);
    this.AdmitProblem = this.AdmitProblem.bind(this);
    this.AdmitNotProblem = this.AdmitNotProblem.bind(this);
    this.QuestionProblem = this.QuestionProblem.bind(this);
    this.SubmitProblemSoloution = this.SubmitProblemSoloution.bind(this);
    this.submitDeclinedQuestionSoloution = this.submitDeclinedQuestionSoloution.bind(
      this
    );

    this.AcceptAnswer = this.AcceptAnswer.bind(this);
  }
  submitDeclinedQuestionSoloution(e) {
    e.preventDefault();

    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

    // let answer = this.state.soloutionForDeclinedQuestion;
    let question = this.state.questions.Question;

    let email = window.localStorage.getItem("User");
    let questionId = this.state.questions.QuestionId;
    let workStation = window.localStorage.getItem("Workstation");
    let suggestedSoloution = this.state.soloutionForDeclinedQuestion;
    // let accepted = 1;

    let newItem = {
      answer: "P",
      question: question,
      // state: state,
      email: email,
      questionId: questionId,
      workStation: workStation,
      // accepted: accepted,
      date: date,
      suggestedSoloution: suggestedSoloution
    };

    questionCounter++;
    console.log(newItem);
    results.push(newItem);
    console.log(results);

    this.setState({
      QuestionComplete: true,
      QuestionAccepted: false,
      problem: true,
      questionProblem: true,
      problemSubmitted: false,
      declineSubmitted: true
    });
  }

  QuestionDecline(e) {
    e.preventDefault();

    if (this.state.ShowInput) {
      this.setState({ ShowInput: false });
    } else if (!this.state.ShowInput) {
      this.setState({ ShowInput: true });
    }
  }
  AdmitProblem(e) {
    e.preventDefault();

    this.setState({
      QuestionComplete: true,
      QuestionAccepted: true
    });
  }
  AdmitNotProblem(e) {
    e.preventDefault();
    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;
    let answer = "N";
    let question = this.state.questions.Question;
    // let state = "Accepted";
    let email = window.localStorage.getItem("User");
    let questionId = this.state.questions.QuestionId;
    let workStation = window.localStorage.getItem("Workstation");
    // let accepted = `1`;

    let newItem = {
      answer: answer,
      question: question,
      // state: state,
      email: email,
      questionId: questionId,
      workStation: workStation,
      // accepted: accepted,
      date: date
      // accepted: 1
    };
    questionCounter++;
    results.push(newItem);

    console.log(results);

    this.setState({
      QuestionComplete: true,
      QuestionAccepted: false,
      problem: true
    });
  }

  QuestionProblem(e) {
    e.preventDefault();

    this.setState({
      QuestionAccepted: false,
      problem: true,
      questionProblem: true,
      QuestionComplete: true
    });
  }

  AcceptAnswer(e) {
    e.preventDefault();

    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

    let answer = "Y";
    let question = this.state.questions.Question;
    // let state = "Accepted";
    let email = window.localStorage.getItem("User");
    let questionId = this.state.questions.QuestionId;
    let workStation = window.localStorage.getItem("Workstation");
    let accepted = `1`;

    let newItem = {
      answer: answer,
      question: question,
      // state: state,
      email: email,
      questionId: questionId,
      workStation: workStation,
      // accepted: accepted,
      date: date
    };

    questionCounter++;
    results.push(newItem);
    console.log(results);

    this.setState({
      QuestionAccepted: false,
      problem: false,
      questionProblem: false,
      QuestionComplete: true
    });

    console.log(this.state.QuestionAndAnswer);

    // fetch("Accept-question-answer", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     Accept: "application/json,",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // }).then(response => {
    //   console.log("response before it is broken down " + response);
  }

  RevertAcceptedAnswer(e) {
    e.preventDefault();

    questionCounter--;
    results.splice(
      results.findIndex(r => r.questionId === this.state.questionId),
      1
    );

    console.log(results);

    this.setState({
      completedQuestions: false,
      ShowInput: false,
      QuestionComplete: false,
      problem: false,
      QuestionAccepted: false,
      questionProblem: false,
      problemSubmitted: false,
      declineSubmitted: false
    });
  }

  QuestionOnChange(e) {
    this.setState({ QuestionAnswer: e.target.value });
  }

  ///////////////////////////////////////////
  OnCommit(e) {
    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

    let User = window.localStorage.getItem("User");
    let WorkStation = window.localStorage.getItem("Workstation");

    const data = {
      QuestionId: this.state.questions.QuestionId,
      QuestionAnswer: this.state.QuestionAnswer,
      date: date,
      User,
      WorkStation
    };

    fetch("/declined-question-response", {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json,",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      console.log("response before it is broken down " + response);

      // return response.json();
    });

    this.setState({ QuestionComplete: true, QuestionAccepted: true });
  }

  SubmitProblemSoloution(e) {
    e.preventDefault();

    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;
    let answer = "P";
    let question = this.state.questions.Question;
    let state = "problem specified";

    let email = window.localStorage.getItem("User");
    let questionId = this.state.questions.QuestionId;
    let workStation = window.localStorage.getItem("Workstation");

    let newItem = {
      answer: answer,
      question: question,
      state: state,
      email: email,
      questionId: questionId,
      workStation: workStation,

      date: date
      // accepted: 1
    };
    questionCounter++;
    results.push(newItem);
    console.log(results);

    this.setState({
      QuestionAccepted: false,
      problem: true,
      questionProblem: true,
      problemSubmitted: true
    });
  }

  render() {
    if (!this.state.QuestionComplete) {
      if (!this.state.ShowInput) {
        return (
          <div>
            <Popup
              trigger={
                <div style={{ float: "right" }}>
                  {" "}
                  <Link> ℹ️</Link>
                </div>
              }
              position="left center"
            >
              <div>{this.state.questions.GuidanceNotes}</div>
            </Popup>

            <li style={{ textAlign: "center" }}>
              <b
                style={{
                  textAlign: "center",

                  textDecoration: "underline"
                }}
              >
                {this.state.questions.Question}
              </b>
            </li>

            <button
              onClick={this.AcceptAnswer}
              className="btn btn-secondary"
              style={{
                width: "35%",
                marginLeft: "230px",
                marginRight: "2px",
                verticalAlign: "top"

                // float: "right"
              }}
            >
              Yes
            </button>
            <button
              style={{
                width: "35%",
                // float: "right",
                marginLeft: "2px",
                marginRight: "2px",
                verticalAlign: "top"
              }}
              onClick={this.QuestionDecline}
              className="btn btn-secondary"
            >
              No
            </button>
            <br />
          </div>
        );
      } else if (
        this.state.ShowInput &&
        !this.state.QuestionComplete &&
        !this.state.problem
      ) {
        return (
          <div>
            <Popup
              trigger={<div style={{ float: "right" }}> ℹ️</div>}
              position="left center"
            >
              <div>{this.state.questions.GuidanceNotes}</div>
            </Popup>

            <li style={{ textAlign: "center", color: "grey" }}>
              <b>{this.state.questions.Question}</b>
            </li>

            <li>
              <b>Your Answer</b>: No{" "}
              <Link
                style={{ float: "right" }}
                onClick={this.RevertAcceptedAnswer}
              >
                Change
              </Link>
            </li>

            <li style={{ textAlign: "center" }}>
              <b>Is it a problem?</b>
            </li>
            <li>
              {" "}
              <button
                className="btn btn-secondary"
                style={{
                  width: "35%",
                  marginLeft: "230px",
                  marginRight: "2px",
                  verticalAlign: "top"

                  // float: "right"
                }}
                onClick={this.AdmitProblem}
                className="btn btn-secondary"
                // style={{ float: "left" }}
              >
                Yes
              </button>
              <button
                style={{
                  width: "35%",
                  // float: "right",
                  marginLeft: "2px",
                  marginRight: "2px",
                  verticalAlign: "top"
                }}
                onClick={this.AdmitNotProblem}
                className="btn btn-secondary"
                // style={{ float: "left" }}
              >
                {" "}
                No
              </button>
            </li>
          </div>
        );
      }
    } else if (this.state.QuestionComplete) {
      if (
        this.state.QuestionAccepted &&
        !this.state.problem &&
        !this.state.questionProblem &&
        !this.state.problemSubmitted &&
        !this.state.declineSubmitted
      ) {
        return (
          <>
            <Popup
              trigger={<div style={{ float: "right" }}> ℹ️</div>}
              position="left center"
            >
              <div>{this.state.questions.GuidanceNotes}</div>
            </Popup>
            <h3>
              <li style={{ textAlign: "center", color: "grey" }}>
                <b>{this.state.questions.Question}</b>
              </li>

              <li>
                <b>Your Answer</b>: No, and it is a problem{" "}
                <Link
                  style={{ float: "right" }}
                  onClick={this.RevertAcceptedAnswer}
                >
                  Change
                </Link>
              </li>

              <br />
            </h3>
            <textarea
              placeholder="What would you suggest we do to solve this? "
              style={{ width: "100%" }}
              onChange={e =>
                this.setState({
                  soloutionForDeclinedQuestion: e.target.value
                })
              }
            />
            <button
              onClick={this.submitDeclinedQuestionSoloution}
              className="btn btn-secondary"
              style={{ width: "100%" }}
            >
              Submit suggestion
            </button>
          </>
        );
      } else if (
        !this.state.QuestionAccepted &&
        !this.state.problem &&
        !this.state.questionProblem &&
        !this.state.problemSubmitted &&
        !this.state.declineSubmitted
      ) {
        return (
          <>
            <Popup
              trigger={<div style={{ float: "right" }}> ℹ️</div>}
              position="left center"
            >
              <div>{this.state.questions.GuidanceNotes}</div>
            </Popup>
            <h3>
              <li style={{ textAlign: "center", color: "grey" }}>
                <b>{this.state.questions.Question}</b>
              </li>
              <li>
                <b>Your answer</b>: Yes
                <Link
                  style={{ float: "right" }}
                  onClick={this.RevertAcceptedAnswer}
                >
                  Change
                </Link>
              </li>
            </h3>
          </>
        );
      } else if (
        !this.state.QuestionAccepted &&
        this.state.problem &&
        !this.state.questionProblem &&
        !this.state.problemSubmitted &&
        !this.state.declineSubmitted
      ) {
        return (
          <>
            <Popup
              trigger={<div style={{ float: "right" }}> ℹ️</div>}
              position="left center"
            >
              <div>{this.state.questions.GuidanceNotes}</div>
            </Popup>
            <h3>
              <li style={{ textAlign: "center", color: "grey" }}>
                <b>{this.state.questions.Question}</b>
              </li>
              <li>
                <b>Your Answer</b>: No but not a problem
                <Link
                  style={{ float: "right" }}
                  onClick={this.RevertAcceptedAnswer}
                >
                  Change
                </Link>
              </li>
            </h3>
          </>
        );
      } else if (
        !this.state.QuestionAccepted &&
        this.state.problem &&
        this.state.questionProblem &&
        !this.state.problemSubmitted &&
        !this.state.declineSubmitted
      ) {
        return (
          <h3>
            <button
              onClick={this.RevertAcceptedAnswer}
              style={{ float: "right" }}
              className="btn btn-danger"
            >
              {" "}
              Revert Answer
            </button>
            <br />
            <li> {this.state.questions.Question} </li>

            <textarea
              style={{ width: "100%" }}
              onChange={e =>
                this.setState({ problemDefinition: e.target.value })
              }
              placeholder={`Please specify the problem`}
            />

            <button
              style={{ width: "100%" }}
              className="btn btn-primary"
              onClick={this.SubmitProblemSoloution}
            >
              Submit Solution{" "}
            </button>
          </h3>
        );
      } else if (
        !this.state.QuestionAccepted &&
        this.state.problem &&
        this.state.questionProblem &&
        !this.state.problemSubmitted &&
        this.state.declineSubmitted
      ) {
        return (
          <>
            <Popup
              trigger={<div style={{ float: "right" }}> ℹ️</div>}
              position="left center"
            >
              <div>{this.state.questions.GuidanceNotes}</div>
            </Popup>
            <h3>
              {/* <button
                onClick={this.RevertAcceptedAnswer}
                style={{ float: "right" }}
                className="btn btn-danger"
              >
                {" "}
                Revert Answer
              </button> */}
              <br />
              <li style={{ textAlign: "center", color: "grey" }}>
                {" "}
                <b>{this.state.questions.Question}</b>{" "}
              </li>{" "}
              <li>
                <b>Your Answer :</b> No, and its a problem
                <Link
                  style={{ float: "right" }}
                  onClick={this.RevertAcceptedAnswer}
                >
                  Change
                </Link>
              </li>
              <li>
                <b>Your suggested soloution: </b>
                {this.state.soloutionForDeclinedQuestion}
              </li>
              {/* <li>Complete : ✔️ </li> */}
            </h3>
          </>
        );
      }
    }
  }
}
