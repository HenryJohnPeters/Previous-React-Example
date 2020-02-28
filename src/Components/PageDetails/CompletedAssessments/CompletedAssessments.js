import React from "react";
import moment from "moment";
class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      QuestionsAnswer: [],
      workstations: [],
      viewDetails: false
    };
    this.getQuestionByUniqueDate = this.getQuestionByUniqueDate.bind(this);
  }
  // sets the questions form sql into state for questions

  componentDidMount() {
    let User = window.localStorage.getItem("User");
    fetch(`/user-completed-questions/${User}`)
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ questions: results.recordset });
        console.log(this.state.questions);
      });
  }

  getQuestionByUniqueDate(questions) {
    var results = [];

    for (var i = 0; i < questions.length; i++) {
      if (
        !results.find(q => q.Date == questions[i].Date) ||
        !results.find(
          q => q.AssignedWorkStation == questions[i].AssignedWorkStation
        )
      ) {
        results.push(questions[i]);
      }
    }
    return results;
  }

  render() {
    let selectedWorkStation = window.localStorage.getItem("Workstation");

    console.log(this.state.questions);

    if (this.state.questions.length) {
      return (
        <div>
          <h3 style={{ textAlign: "center" }}></h3>

          <ul>
            <div>
              <h6></h6>
            </div>

            {this.state.questions &&
              this.getQuestionByUniqueDate(this.state.questions).map(function(
                questions,
                index
              ) {
                return (
                  <div className="jumbotron">
                    <Questions questions={questions}></Questions>
                  </div>
                );
              })}
          </ul>
        </div>
      );
    } else if (!this.state.questions.length) {
      return (
        <>
          {" "}
          <div>
            <h3 style={{ textAlign: "center" }}></h3>

            <ul>
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
                <li style={{ textAlign: "center" }}>
                  <b>
                    This account has not completed any Workstation
                    self-assessments
                  </b>{" "}
                </li>
              </div>
            </ul>
          </div>
        </>
      );
    }
  }
}

export default DisplayQuestions;

class Questions extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...props,
      questionsAccepted: [],
      questionsAcceptedCounter: "",
      selectedSet: []
    };
    this.checker = this.checker.bind(this);
  }

  checker() {
    if (!this.state.viewDetails) {
      this.setState({ viewDetails: true });
    } else if (this.state.viewDetails) {
      this.setState({ viewDetails: false });
    }

    let date = this.state.questions.Date;
    let email = window.localStorage.getItem("User");

    fetch(`/show-questions-answered/${date}/${email}`)
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ selectedSet: results.recordset });
        console.log(this.state.selectedSet);
      });
  }

  render() {
    console.log(
      `${this.state.previousDate} PREVIOUS DATE ${this.state.questions.Date}  DATE`
    );

    if (!this.state.viewDetails) {
      return (
        <div>
          <button
            onClick={this.checker}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            View Details
          </button>

          <br />
          <li>
            <b>Workstation: </b> {this.state.questions.AssignedWorkStation}
          </li>
          <li>
            <b>Date: </b>
            {moment(this.state.questions.Date).format("DD/MM/YYYY ")}
          </li>
          <li>
            <b>Status: </b>
            {this.state.questions.CompleteToken}
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.checker}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            View Details
          </button>

          <br />

          <li> {this.state.questions.Date}</li>

          {this.state.selectedSet &&
            this.state.selectedSet.map((item, index) => {
              return (
                <div>
                  <li>
                    {" "}
                    <b>{item.QuestionWhenAnswered}</b>{" "}
                  </li>
                  <li>{item.QuestionResponse}</li>
                  <li>{item.Accepted}</li>
                </div>
              );
            })}
        </div>
      );
    }
  }
}
