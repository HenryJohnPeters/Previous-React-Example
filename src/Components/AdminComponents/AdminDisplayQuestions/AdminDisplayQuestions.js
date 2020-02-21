import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AddQuestion from "./AdminAddQuestion";
class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = { questions: [], QuestionsAnswer: [], QuestionsSeverity: [] };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  // sets the questions form sql into state for questions
  getItems() {
    fetch("/user-questions")
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ questions: results.recordset });
      });
  }
  //when the component mounts make the sql questions the s
  componentDidMount() {
    this.setState({
      questions: this.getItems()
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = {
      QuestionID: this.QuestionID,
      QuestionsAnswer: this.state.QuestionsAnswer,
      QuestionSeverity: this.state.QuestionsSeverity
    };

    try {
      fetch("/Question-Response", {
        method: "POST", // or 'PUT'
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } catch (error) {}
  }
  refresh() {
    window.location.reload();
  }

  render() {
    var self = this;
    console.log(this.state.questions);
    return (
      <>
        <h3 style={{ textAlign: "center" }}>
          <u>Edit Questions</u>
        </h3>

        <ul>
          <Link to="/admin-view-workstation-assessments">
            <button className="btn btn-secondary" style={{ float: "left " }}>
              Workstation Assessments
            </button>
          </Link>

          <button
            disabled
            className="btn btn-secondary"
            style={{ float: "left " }}
          >
            Edit Questions
          </button>

          <DisplayAddQuestion />

          <button
            onClick={this.refresh}
            style={{ float: "right" }}
            className="btn btn-secondary"
          >
            ⟳
          </button>
          <Link to="./admin-center-view-users">
            <button className="btn btn-secondary" style={{ float: "left " }}>
              View Users
            </button>
          </Link>
          <br />
          <br />

          {this.state.questions &&
            this.state.questions.map(function(questions, index) {
              return (
                <div className="jumbotron">
                  <WorkStations questions={questions}></WorkStations>
                </div>
              );
            })}
        </ul>
      </>
    );
  }
}

export default DisplayQuestions;

class WorkStations extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...props,
      show: false,
      QuestionUpdate: "",
      GuidanceNotesUpdate: ""
    };
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.EditQuestion = this.EditQuestion.bind(this);
    this.QuestionOnChange = this.QuestionOnChange.bind(this);
    this.OnCommit = this.OnCommit.bind(this);
    this.EditGuidanceNotes = this.EditGuidanceNotes.bind(this);
    this.OnCommitGuidanceNotes = this.OnCommitGuidanceNotes.bind(this);
    this.GuidanceNotesOnChange = this.GuidanceNotesOnChange.bind(this);
    this.RevertGuidanceNotes = this.RevertGuidanceNotes.bind(this);
  }
  deleteQuestion(e) {
    let QuestionId = this.state.questions.QuestionId;
    console.log(QuestionId);

    let data = { QuestionId };

    fetch("/delete-question", {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    alert("Item Deleted");
    window.location.reload();
  }
  EditQuestion(e) {
    e.preventDefault();
    if (
      (this.state.ShowInput && !this.state.showQuestion) ||
      (!this.state.ShowInput && this.state.showQuestion)
    )
      this.setState({ ShowInput: false, showQuestion: false });
    else if (!this.state.ShowInput) {
      this.setState({ ShowInput: true });
    }
  }

  RevertGuidanceNotes(e) {
    alert("t");
    e.preventDefault();
    this.setState({ ShowInput: false, showQuestion: true });
  }

  EditGuidanceNotes(e) {
    e.preventDefault();
    this.setState({ ShowInput: false, showQuestion: true });
  }

  QuestionOnChange(e) {
    this.setState({ QuestionUpdate: e.target.value });
  }

  GuidanceNotesOnChange(e) {
    this.setState({ GuidanceNotesUpdate: e.target.value });
  }

  OnCommit(e) {
    e.preventDefault();
    alert(this.state.QuestionUpdate);

    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

    const data = {
      QuestionId: this.state.questions.QuestionId,
      QuestionUpdate: this.state.QuestionUpdate
      //date
    };

    fetch("/admin-update-question", {
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

    window.location.reload();
  }

  OnCommitGuidanceNotes(e) {
    e.preventDefault();
    alert(this.state.QuestionUpdate);

    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

    const data = {
      QuestionId: this.state.questions.QuestionId,
      QuestionGuidanceNoteUpdate: this.state.GuidanceNotesUpdate
      //date
    };

    fetch("/admin-update-question-guidance-notes", {
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

    window.location.reload();
  }

  render() {
    if (!this.state.ShowInput && !this.state.showQuestion) {
      return (
        <div>
          <button
            onClick={this.deleteQuestion}
            className="btn btn-danger"
            style={{ float: "right" }}
          >
            X
          </button>
          <button
            onClick={this.EditQuestion}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Edit Question
          </button>
          <button
            onClick={this.EditGuidanceNotes}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Edit Guidance Notes
          </button>
          <br />

          <li>
            {" "}
            <b>Question: </b> {this.state.questions.Question}
          </li>
          <li>
            <b>Guidance Notes: </b>
            {this.state.questions.GuidanceNotes}{" "}
          </li>
        </div>
      );
    } else if (this.state.ShowInput && !this.state.showQuestion) {
      return (
        <div>
          <button
            onClick={this.deleteQuestion}
            className="btn btn-danger"
            style={{ float: "right" }}
          >
            X
          </button>
          <button
            disabled
            // onClick={this.EditQuestion}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Edit Question
          </button>
          <button
            disabled
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Edit Guidance Notess
          </button>
          <br />
          <li>
            {" "}
            <li>
              {" "}
              <b>Question: </b> {this.state.questions.Question} <b>(EDITING)</b>
            </li>
            <li>
              <b>Guidance Notes: </b>
              {this.state.questions.GuidanceNotes}{" "}
            </li>
          </li>

          <li>
            <textarea
              placeholder={this.state.questions.Question}
              style={{ width: "100%" }}
              onChange={this.QuestionOnChange}
            />
          </li>
          <button
            style={{ float: "right", padding: "2px" }}
            className="btn btn-primary"
            onClick={this.OnCommit}
          >
            Commit
          </button>

          <button
            onClick={this.EditQuestion}
            style={{ float: "right", padding: "2px" }}
            className="btn btn-secondary"
          >
            Revert
          </button>
          <br />
        </div>
      );
    } else if (!this.state.ShowInput && this.state.showQuestion) {
      return (
        <div>
          <button
            onClick={this.deleteQuestion}
            className="btn btn-danger"
            style={{ float: "right" }}
          >
            X
          </button>
          <button
            disabled
            // onClick={this.EditQuestion}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Edit Question
          </button>
          <button
            disabled
            // onClick={this.EditQuestions}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Edit Guidance Notes
          </button>
          <br />

          <li>
            <b>Question: </b> {this.state.questions.Question}
          </li>
          <li>
            <b>Guidance Notes: </b>
            {this.state.questions.GuidanceNotes} <b>(EDITING)</b>
          </li>

          <li>
            <textarea
              placeholder={this.state.questions.GuidanceNotes}
              style={{ width: "100%" }}
              onChange={this.GuidanceNotesOnChange}
            />
          </li>
          <button
            style={{ float: "right", padding: "2px" }}
            className="btn btn-primary"
            onClick={this.OnCommitGuidanceNotes}
          >
            Commit
          </button>

          <button
            onClick={this.EditQuestion}
            style={{ float: "right", padding: "2px" }}
            className="btn btn-secondary"
          >
            Revert
          </button>
          <br />
        </div>
      );
    }
  }
}

class DisplayAddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      show: false,
      show1: false
    };
  }

  handleClose() {
    this.setState({
      show: false,
      show1: false
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
    // console.log(this.state);

    return (
      <div className="header-container">
        <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={this.handleShow}
        >
          +
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {" "}
            <AddQuestion />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
