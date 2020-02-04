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
    this.state = { ...props };
  }

  render() {
    return (
      <div className="jumbotron">
        <button className="btn btn-primary" style={{ float: "right" }}>
          Edit
        </button>
        <button className="btn btn-primary" style={{ float: "right" }}>
          Delete
        </button>
        <br />
        <li> Question ID: {this.state.questions.QuestionId}</li>
        <li> Question:{this.state.questions.Question}</li>
      </div>
    );
  }
}
