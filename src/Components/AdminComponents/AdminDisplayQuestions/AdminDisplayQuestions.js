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
          <div className="jumbotron">
            {this.state.questions &&
              this.state.questions.map(function(questions, index) {
                return (
                  <ul>
                    <WorkStations questions={questions}></WorkStations>
                  </ul>
                );
              })}
          </div>
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
    this.state = { ...props, show: false, QuestionUpdate: "" };
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.EditQuestion = this.EditQuestion.bind(this);
    this.QuestionOnChange = this.QuestionOnChange.bind(this);
    this.OnCommit = this.OnCommit.bind(this);
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
    let QuestionId = this.state.questions.QuestionId;
    if (this.state.ShowInput) {
      this.setState({ ShowInput: false });
      alert(this.state.ShowInput);
    } else if (!this.state.ShowInput) {
      this.setState({ ShowInput: true });
      alert(this.state.ShowInput);
    }

    this.state.ShowInput = true;

    alert(`${QuestionId}`);
  }

  QuestionOnChange(e) {
    this.setState({ QuestionUpdate: e.target.value });
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

  render() {
    if (!this.state.ShowInput) {
      return (
        <div className="jumbotron">
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
            Edit
          </button>
          <br />
          <li> Question ID: {this.state.questions.QuestionId}</li>
          <li> Question:{this.state.questions.Question}</li>
        </div>
      );
    } else {
      return (
        <div>
          <li>Question Id: {this.state.questions.QuestionId}</li>
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
