import React from "react";

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
      QuestionID: this.state.QuestionID,
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
      <ul>
        <h2 style={{ textAlign: "center" }}>User Questions</h2>
        {this.state.questions &&
          this.state.questions.map(function(questions, index) {
            return (
              // <div className="jumbotron">
              //   <li> Question ID: {question.QuestionId}</li>
              //   <li> Question:{question.Question}</li>
              //   <li>
              //     <div>
              //       <button onClick={self.onSubmit} className="btn btn-primary">
              //         Accept
              //       </button>
              //       <button className="btn btn-primary">Decline</button>
              //     </div>
              //   </li>
              // </div>
              <li>
                <Question questions={questions}></Question>
              </li>
            );
          })}
      </ul>
    );
  }
}

export default DisplayQuestions;

class Question extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props, show: false };
  }

  render() {
    // if (!this.state.ShowInput) {
    return (
      <div className="jumbotron">
        <button className="btn btn-danger" style={{ float: "right" }}>
          X
        </button>
        <button className="btn btn-primary" style={{ float: "right" }}>
          Edit
        </button>
        <br />
        <li> Question ID: {this.state.questions.QuestionId}</li>
        <li> Question:{this.state.questions.Question}</li>
      </div>
    );
    // } else {
    //   return (
    //     <div>
    //       <li>Question Id: {this.state.questions.QuestionId}</li>
    //       <li>
    //         <textarea
    //           placeholder={this.state.questions.Question}
    //           style={{ width: "100%" }}
    //           onChange={this.QuestionOnChange}
    //         />
    //       </li>
    //       <button
    //         style={{ float: "right", padding: "2px" }}
    //         className="btn btn-primary"
    //         onClick={this.OnCommit}
    //       >
    //         Commit
    //       </button>

    //       <button
    //         onClick={this.EditQuestion}
    //         style={{ float: "right", padding: "2px" }}
    //         className="btn btn-secondary"
    //       >
    //         Revert
    //       </button>
    //       <br />
    //     </div>
    //   );
    // }
  }
}
