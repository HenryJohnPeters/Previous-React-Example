import React from "react";

import { Link } from "react-router-dom";

import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
var goToken = false;
var results = [];
class AdminWorkstations extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      viewDetails: false,

      currentPage: 1,
      todosPerPage: 5
    };
    this.getQuestionByUniqueDate = this.getQuestionByUniqueDate.bind(this);
    // this.test = this.test.bind(this);
  }
  // sets the questions form sql into state for questions
  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  componentDidMount() {
    fetch(`/admin-completed-workstations`)
      .then(recordset => recordset.json())
      .then(results => {
        var myQs = results.recordset.map(q => ({
          ...q,
          doAlert: () => {
            alert(q.AssignedWorkStation);
          }
        }));
        this.setState({ questions: myQs });
        console.log(this.state.questions);

        this.state.questions &&
          this.getQuestionByUniqueDate(this.state.questions);
      });
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
        this.setState({ amountOfWorkstations: results.length });
      }
    }
    return results;
  }

  render() {
    const { currentPage, todosPerPage } = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = results.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.amountOfWorkstations / todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderTodos = currentTodos.map(r => {
      return (
        <>
          <div className="jumbotron">
            <Questions
              workStation={r.AssignedWorkStation}
              date={r.Date}
              completeToken={r.CompleteToken}
            >
              {" "}
            </Questions>
          </div>
        </>
      );
    });

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
          className="btn btn-primary"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </button>
      );
    });

    let selectedWorkStation = window.localStorage.getItem("Workstation");

    console.log(this.state.questions);

    if (this.state.questions.length) {
      return (
        <div>
          <h2 style={{ textAlign: "center" }}>
            Completed Workstation Assessments
          </h2>
          <ul>
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
            </DropdownButton>{" "}
          </ul>

          <ul>
            {renderTodos}{" "}
            <div
              style={{ userSelect: "none", cursor: "pointer" }}
              id="page-numbers"
            >
              {renderPageNumbers}
            </div>
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
    debugger;
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
    let workStation = window.localStorage.getItem("Workstation");
    let date = this.props.date;
    let email = window.localStorage.getItem("User");

    fetch(`/show-questions-answered/${date}/${workStation}/${email}`)
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ selectedSet: results.recordset });
        console.log(this.state.selectedSet);
      });
  }

  render() {
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
          <li>{this.props.workStation}</li>
          <li>{this.props.date}</li>
          <li>{this.props.completeToken}</li>
          {/* <li>
            <b>Workstation: </b> {this.state.results.AssignedWorkStation}
          </li>
          <li>
            <b>Date: </b> {this.state.results.Date}
          </li>
          <li>
            <b>Status: </b>
            {this.state.results.CompleteToken}
          </li> */}
        </div>
      );
    } else if (this.state.viewDetails) {
      return (
        <div>
          <button
            onClick={this.checker}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            View Details
          </button>
          <button style={{ float: "right" }} className="btn btn-primary">
            Email User
          </button>

          <br />
          <br />

          <li> {results.Date}</li>

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
