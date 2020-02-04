import React from "react";
import { Link } from "react-router-dom";

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

          <button style={{ float: "right" }} className="btn btn-primary ">
            +
          </button>
          <button
            onClick={this.refresh}
            style={{ float: "right" }}
            className="btn btn-secondary"
          >
            ⟳
          </button>
          <Link>
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
    this.state = { ...props, show: false };
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.EditQuestion = this.EditQuestion.bind(this);
  }
  deleteQuestion(e) {
    e.preventDefault();
    let QuestionId = this.state.questions.QuestionId;
    alert(`${QuestionId}`);
    // fetch(`/NullifyQuestions/${QuestionId}`);
  }
  EditQuestion() {
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

  render() {
    if (!this.state.ShowInput) {
      return (
        <div className="jumbotron">
          <button
            onClick={this.EditQuestion}
            className="btn btn-secondary"
            style={{ float: "right" }}
          >
            Edit
          </button>
          <button
            onClick={this.deleteQuestion}
            className="btn btn-secondary"
            style={{ float: "right" }}
          >
            Delete
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
            />
          </li>
          <button
            style={{ float: "right", padding: "2px" }}
            className="btn btn-primary"
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
