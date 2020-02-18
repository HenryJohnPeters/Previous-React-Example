import React from "react";
import { Link } from "react-router-dom";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import { Container, Checkbox } from "semantic-ui-react";

var results = [];

class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      QuestionsAnswer: [],
      workstations: [],
      selectedWorkStation: "",
      QuestionAndAnswer: {}
    };
    this.submitAnswers = this.submitAnswers.bind(this);
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

  submitAnswers() {
    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

    const data = {
      results,
      date
    };

    fetch("/post-question-answers/", {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json,",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      console.log("response before it is broken down " + response);

      return response.json();
    });
  }

  render() {
    let selectedWorkStation = window.localStorage.getItem("Workstation");
    var self = this;
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
                  Desk Location Selected :{" "}
                  <u style={{ color: "grey" }}>{selectedWorkStation}</u>
                </tr>
              </h6>
            </div>
            <div className="jumbotron">
              {this.state.questions &&
                this.state.questions.map(function(questions, index) {
                  return <Questions questions={questions}></Questions>;
                })}

              <br />
              <button
                onClick={this.submitAnswers}
                style={{ width: "100%" }}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
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

    window.localStorage.setItem(
      "Workstation",
      this.state.workstations.DeskLocation
    );
    window.location.reload();
  }
  render() {
    return (
      <>
        <Dropdown.Item onClick={this.selectWorkStation}>
          {this.state.workstations.DeskLocation}{" "}
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
    this.RevertDeclinedAnswer = this.RevertDeclinedAnswer.bind(this);
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

    let answer = this.state.soloutionForDeclinedQuestion;
    let question = this.state.questions.Question;
    let state = "Declined with soloution defined";
    let email = window.localStorage.getItem("User");
    let questionId = this.state.questions.QuestionId;
    let workStation = window.localStorage.getItem("Workstation");
    let accepted = `0`;

    let newItem = {
      answer: answer,
      question: question,
      state: state,
      email: email,
      questionId: questionId,
      workStation: workStation,
      accepted: accepted,
      date: date
    };

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
      alert(this.state.ShowInput);
    } else if (!this.state.ShowInput) {
      this.setState({ ShowInput: true });
      alert(this.state.ShowInput);
    }
  }
  AdmitProblem(e) {
    e.preventDefault();
    alert("clicked");

    this.setState({
      QuestionComplete: true,
      QuestionAccepted: true
    });
  }
  AdmitNotProblem(e) {
    e.preventDefault();

    let answer = "Question declined But not a problem";
    let question = this.state.questions.Question;
    let state = "Accepted";

    let newItem = {
      answer: answer,
      question: question,
      state: state
    };

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
    alert("problem clicked");

    this.setState({
      QuestionAccepted: false,
      problem: true,
      questionProblem: true,
      QuestionComplete: true
    });
  }

  AcceptAnswer(e) {
    e.preventDefault();
    let answer = "yes";
    let question = this.state.questions.Question;
    let state = "Accepted";

    let newItem = {
      answer: answer,
      question: question,
      state: state
    };

    results.push(newItem);
    console.log(results);

    // this.setState(state => ({
    //   completedQuestions: state.completedQuestions.concat(newItem)
    // }));

    // this.setState({
    //   completedQuestions: [...this.state.completedQuestions, newItem]
    // });

    this.setState({
      QuestionAccepted: false,
      problem: false,
      questionProblem: false,
      QuestionComplete: true
    });

    console.log(this.state.QuestionAndAnswer);

    // var today = new Date(),
    //   date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
    //     1}-${today.getUTCDate()}  `;
    // alert(date);

    // let User = window.localStorage.getItem("User");
    // let WorkStation = window.localStorage.getItem("Workstation");

    // const data = {
    //   QuestionId: this.state.questions.QuestionId,
    //   date,
    //   User,
    //   WorkStation
    // };

    // fetch("Accept-question-answer", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     Accept: "application/json,",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // }).then(response => {
    //   console.log("response before it is broken down " + response);

    // return response.json();
    // });
  }

  RevertAcceptedAnswer(e) {
    e.preventDefault();
    // alert("revert clciked answer declined");
    // let Email = window.localStorage.getItem("User");
    // let WorkStation = window.localStorage.getItem("Workstation");
    // const data = {
    //   QuestionId: this.state.questions.QuestionId,
    //   QuestionAnswer: this.state.QuestionAnswer,
    //   Email,
    //   WorkStation
    // };

    // fetch("revert-accepted-question-answer", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     Accept: "application/json,",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // }).then(response => {
    //   console.log("response before it is broken down " + response);

    // return response.json();
    // });
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
    alert("you answer has been deleted from the database");
  }

  RevertDeclinedAnswer(e) {
    e.preventDefault();
    alert("revert clciked answer declined");
    // let Email = window.localStorage.getItem("User");
    // let WorkStation = window.localStorage.getItem("Workstation");
    // const data = {
    //   QuestionId: this.state.questions.QuestionId,
    //   QuestionAnswer: this.state.QuestionAnswer,
    //   Email,
    //   WorkStation
    // };
    // fetch("revert-declined-question-answer", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     Accept: "application/json,",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // }).then(response => {
    //   console.log("response before it is broken down " + response);

    //   // return response.json();
    // });
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
    alert("you answer has been deleted from the database");
  }

  QuestionOnChange(e) {
    this.setState({ QuestionAnswer: e.target.value });
  }

  ///////////////////////////////////////////
  OnCommit(e) {
    alert(this.state.QuestionAnswer);

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
    let answer = this.state.problemDefinition;
    let question = this.state.questions.Question;
    let state = "problem specified";

    let newItem = {
      answer: answer,
      question: question,
      state: state
    };

    results.push(newItem);
    console.log(results);

    this.setState({
      QuestionAccepted: false,
      problem: true,
      questionProblem: true,
      problemSubmitted: true
    });
  }

  ////////////////////////////////////////////////
  render() {
    console.log(this.state.completedQuestions);
    ////////////////////////////////////////
    if (!this.state.QuestionComplete) {
      if (!this.state.ShowInput) {
        return (
          <div>
            <div style={{ float: "right" }}>
              <label>{"   "}Problem</label>
              <input
                type="checkbox"
                onClick={this.QuestionProblem}
                className="btn btn-danger"
                style={{ float: "right" }}
              />
            </div>
            <div style={{ float: "right" }}>
              <label>{"   "}No</label>
              <input
                type="checkbox"
                onClick={this.QuestionDecline}
                className="btn btn-danger"
                style={{ float: "right" }}
              />
            </div>

            <div style={{ float: "right" }}>
              <label> {"   "}Yes</label>
              <input
                type="checkbox"
                onClick={this.AcceptAnswer}
                className="btn btn-danger"
                style={{ float: "right" }}
              />
            </div>

            <br />
            <li>{this.state.questions.Question}</li>

            <br />
          </div>
          // </div>
        );
      } else if (
        this.state.ShowInput &&
        !this.state.QuestionComplete &&
        !this.state.problem
      ) {
        return (
          <div>
            <button
              onClick={this.RevertDeclinedAnswer}
              style={{ float: "right" }}
              className="btn btn-danger"
            >
              {" "}
              Revert Answer
            </button>
            <br />
            <li> Question : {this.state.questions.Question}</li>
            <li>Answer: No</li>

            <li>
              Is this causing you a Problem?
              <div style={{ float: "right" }}>
                <label>
                  <b>No</b>
                </label>
                <input
                  type="checkbox"
                  onClick={this.AdmitNotProblem}
                  className="btn btn-danger"
                  // style={{ float: "left" }}
                />
              </div>
              <div style={{ float: "right" }}>
                <label>
                  <b>Yes</b>
                </label>
                <input
                  type="checkbox"
                  onClick={this.AdmitProblem}
                  className="btn btn-danger"
                  // style={{ float: "left" }}
                />
              </div>
            </li>
            <br />
            <br />
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
          <h3>
            <button
              onClick={this.RevertDeclinedAnswer}
              style={{ float: "right" }}
              className="btn btn-danger"
            >
              {" "}
              Revert Answer
            </button>
            <br />

            <li style={{ textAlign: "center", color: "grey" }}>
              <b>{this.state.questions.Question}</b>
            </li>

            <textarea
              placeholder="What would you suggest we do to solve this? "
              style={{ width: "100%" }}
              onChange={e =>
                this.setState({ soloutionForDeclinedQuestion: e.target.value })
              }
            />
            <button
              onClick={this.submitDeclinedQuestionSoloution}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Submit suggestion
            </button>
          </h3>
        );
      } else if (
        !this.state.QuestionAccepted &&
        !this.state.problem &&
        !this.state.questionProblem &&
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

            <li style={{ textAlign: "center", color: "grey" }}>
              <b>{this.state.questions.Question}</b>
            </li>
            <li>
              <b>Status</b>: Yes
            </li>
            <li>Complete : ✔️ </li>
          </h3>
        );
      } else if (
        !this.state.QuestionAccepted &&
        this.state.problem &&
        !this.state.questionProblem &&
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
            <li style={{ textAlign: "center", color: "grey" }}>
              <b>{this.state.questions.Question}</b>
            </li>
            <li>
              <b>Status</b>: No but not a problem
            </li>
            <li>Complete : ✔️ </li>
          </h3>
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
        this.state.problemSubmitted &&
        !this.state.declineSubmitted
      ) {
        return (
          <>
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
              <li style={{ textAlign: "center", color: "grey" }}>
                {" "}
                <b>{this.state.questions.Question}</b>{" "}
              </li>{" "}
              <li>
                <b>Status</b>: Problem with soloution submitted
              </li>
              <li>
                <b>Soloution: </b>
                {this.state.problemDefinition}
              </li>
              <li>Complete : ✔️ </li>
            </h3>
          </>
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
              <li style={{ textAlign: "center", color: "grey" }}>
                {" "}
                <b>{this.state.questions.Question}</b>{" "}
              </li>{" "}
              <li>
                <b>Status</b>: Declined with soloution defined
              </li>
              <li>
                <b>Soloution: </b>
                {this.state.soloutionForDeclinedQuestion}
              </li>
              <li>Complete : ✔️ </li>
            </h3>
          </>
        );
      }
    }
  }
}
