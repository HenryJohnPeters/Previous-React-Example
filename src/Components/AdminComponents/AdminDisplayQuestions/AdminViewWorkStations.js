import React from "react";
import moment from "moment";

import { Link } from "react-router-dom";

import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import ModalCompletedQuestions from "../AdminDisplayWorkstations/AdminViewWorkstationDetails";
import Slide from "react-reveal";
import Fade from "react-reveal";

var results = [];
class AdminWorkstations extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      viewDetails: false,

      currentPage: 1,
      todosPerPage: 10,
      pageNumbers: [],
      // FullDetailsPageToken: false,
      loadingToken: true
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

  componentWillMount = () => {
    fetch(`/admin-completed-workstations`)
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ questions: results.recordset });
        console.log(`QuestionResponses array ${this.state.questions}`);

        this.state.questions &&
          this.getQuestionByUniqueDate(this.state.questions);
      });
  };

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
    this.setState({ loadingToken: false });
  }

  render() {
    const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
    const currentTodos = results.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.amountOfWorkstations / this.state.todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    console.log(this.state.questions);

    if (this.state.questions.length && !this.state.loadingToken) {
      return (
        <div>
          <Fade left>
            <h3 style={{ textAlign: "center" }}>
              Completed Workstation Assessments
            </h3>
          </Fade>

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
            {currentTodos.map(function(r, index) {
              return (
                <div className="jumbotron">
                  <Slide>
                    <Questions
                      workStation={r.AssignedWorkstation}
                      date={r.Date}
                      completeToken={r.QuestionStatus}
                      RUId={r.RUId}
                      WSAId={r.WSAId}
                    ></Questions>
                  </Slide>
                </div>
              );
            })}
            <div
              style={{ userSelect: "none", cursor: "pointer" }}
              id="page-numbers"
            >
              {pageNumbers.map(number => {
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
              })}
            </div>
          </ul>
        </div>
      );
    } else if (!this.state.questions.length && !this.state.loadingToken) {
      return (
        <>
          {" "}
          <Fade left>
            <h3 style={{ textAlign: "center" }}>
              Completed Workstation Assessments
            </h3>
          </Fade>
          <div>
            <ul>
              <br />
              <br />{" "}
              <div>
                <h6> </h6>
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
    } else if (this.state.loadingToken) {
      return (
        <>
          <Fade left>
            <h3 style={{ textAlign: "center" }}>
              Completed Workstation Assessments
            </h3>
          </Fade>
          <div style={{ textAlign: "center" }}>LOADING</div>

          <div className="loader center">
            <i className="fa fa-cog fa-spin" />
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
      selectedSet: [],
      ViewActivityToken: false,
      noteToBeAdded: "",
      notesFromDB: [],
      addNoteToken: false,
      answeredQuestions: []
    };
  }

  render() {
    if (!this.state.ViewActivity) {
      if (!this.state.viewDetails && !this.state.ViewActivityToken) {
        console.log(moment.locale());
        return (
          <div>
            <ModalCompletedQuestions
              RUId={this.props.RUId}
              workStation={this.props.workStation}
              WSAId={this.props.WSAId}
            />

            <Link
              to={{
                pathname: "/admin-view-full-user-wsa-responses",
                state: {
                  WSAId: this.props.WSAId
                }
              }}
            >
              <button style={{ float: "right" }} className="btn btn-primary">
                View Full Details
              </button>
            </Link>

            <br />

            <li>
              <b>User Id: </b>
              {this.props.RUId}
            </li>
            <li>
              <b>Workstation: </b>
              {this.props.workStation}
            </li>
            <li>
              <b>Date: </b>

              {moment(this.props.date).format("L")}
            </li>
            <li>
              <b>Complete Token: </b>
              {this.props.completeToken}
            </li>
          </div>
        );
      } else if (this.state.viewDetails && !this.state.ViewActivityToken) {
        return (
          <div>
            <button
              style={{ float: "right" }}
              onClick={e =>
                this.setState({
                  ViewActivity: false,
                  viewDetails: false,
                  ViewActivityToken: false,
                  addNoteToken: false
                })
              }
              className="btn btn-secondary"
            >
              Revert
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
    } else if (this.state.ViewActivity && !this.state.addNoteToken) {
      return (
        <>
          <button
            style={{ float: "right" }}
            onClick={e =>
              this.setState({
                ViewActivity: false,
                viewDetails: false,
                ViewActivityToken: false,
                addNoteToken: false
              })
            }
            className="btn btn-secondary"
          >
            Revert
          </button>
          <br />
          <li>
            <b>User Id: </b>
            {this.props.RUId}
          </li>
          <li>
            <b>Workstation: </b>
            {this.props.workStation}
          </li>
          <li>
            <b>Date: </b>
            {moment(this.props.date).format("DD/MM/YYYY")}
          </li>
          <li>
            <b>Complete Token: </b>
            {this.props.completeToken}
          </li>

          {this.state.notesFromDB &&
            this.state.notesFromDB.map((item, index) => {
              return (
                <div
                  style={{
                    backgroundColor: "white",
                    border: "inset",
                    borderWidth: "0.2px"
                  }}
                >
                  <div style={{ float: "right" }}>
                    {moment(item.CreationTime).format("HH:MM  DD/MM/YYYY ")}
                  </div>
                  <div>
                    <b>{`${item.UserStatus} `}</b>
                  </div>

                  <div style={{ textAlign: "left" }}>{item.Notes}</div>
                </div>
              );
            })}

          <br />
          <button
            onClick={this.AddNoteBtn}
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Add Note
          </button>
        </>
      );
    }
  }
}
export default AdminWorkstations;
