import React from "react";

import { Link } from "react-router-dom";

import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
var results = [];
class AdminWorkstations extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      activePage: 15,

      workstations: [],
      viewDetails: false
    };
    this.getQuestionByUniqueDate = this.getQuestionByUniqueDate.bind(this);
  }
  // sets the questions form sql into state for questions

  componentDidMount() {
    fetch(`/admin-completed-workstations`)
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ questions: results.recordset });
        console.log(this.state.questions);
      });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  getQuestionByUniqueDate(questions) {
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
            <>
              <h2 style={{ textAlign: "center" }}>
                Completed Workstation Assessments
              </h2>
            </>

            <button disabled className="btn btn-secondary">
              Workstation Assessments
            </button>
            <Link to="./admin-center">
              <button className="btn btn-secondary">Edit Questions</button>
            </Link>
            <Link to="./admin-center-view-users">
              <button className="btn btn-secondary">View Users</button>
            </Link>

            <DropdownButton
              style={{ float: "right" }}
              id="dropdown-basic-button"
              title="Completed"
            >
              <Dropdown.Item>
                {" "}
                <Link to="admin-view-workstation-assessments-declined">
                  In Progress
                </Link>
              </Dropdown.Item>
            </DropdownButton>
          </ul>
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
          <button>prev</button>
          <button>next</button>
          <br />
          <br />
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
                  <b>no completed Workstation Self-Assessments</b>{" "}
                </li>
              </div>
            </ul>
          </div>
        </>
      );
    }
  }
}

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
    this.setState({ viewDetails: true });
    let workStation = window.localStorage.getItem("Workstation");
    let date = this.state.questions.Date;
    let email = window.localStorage.getItem("User");

    fetch(`/show-questions-answered/${date}/${workStation}/${email}`)
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ selectedSet: results.recordset });
        console.log(this.state.selectedSet);
      });
    let counter = 0;
    for (let i = 0; i < this.state.selectedSet.length; i++) {
      if (this.state.selectedSet.find(q => q.Accepted === true)) {
        counter++;
      }
      alert(counter);
    }

    alert(`${date} this is the boolena ${this.state.viewDetails}`);
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
            <b>Date: </b> {this.state.questions.Date}
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
export default AdminWorkstations;
