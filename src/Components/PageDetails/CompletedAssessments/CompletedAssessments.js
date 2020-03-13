import React from "react";
import moment from "moment";

import { Link } from "react-router-dom";

import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import Fade from "react-reveal";
// import ModalCompletedQuestions from "../";

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
      FullDetailsPageToken: false
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
    // let User = window.localStorage.getItem("User");
    // fetch(`/user-completed-questions/${User}`)
    //   .then(recordset => recordset.json())
    //   .then(results => {
    //     this.setState({ questions: results.recordset });
    //     console.log(this.state.questions);
    //   });
    let user = window.localStorage.getItem("User");
    fetch(`/user-completed-WSA/${user}`)
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ questions: results.recordset });
        console.log(`QuestionResponses array ${this.state.questions}`);

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
  }

  render() {
    // Logic for displaying current todos
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

    if (!this.state.FullDetailsPageToken) {
      if (this.state.questions.length) {
        return (
          <div>
            <ul>
              {currentTodos.map(function(r, index) {
                return (
                  <div className="jumbotron">
                    <Questions
                      workStation={r.AssignedWorkstation}
                      date={r.Date}
                      completeToken={r.QuestionStatus}
                      RUId={r.RUId}
                      WSAId={r.WSAId}
                    ></Questions>
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
      } else if (!this.state.questions.length) {
        return (
          <>
            {" "}
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
      } else if (this.state.FullDetailsPageToken) {
        return <></>;
      }
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

class ModalCompletedQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      show: false,
      show1: false,
      answeredQuestions: []
    };
  }
  componentDidMount() {
    let data = {
      // RUId: this.props.RUId,
      // Workstation: this.props.workStation,
      WSAId: this.props.WSAId
    };
    fetch("/get-completed-questions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ answeredQuestions: results.recordset });
        console.log(this.state.answeredQuestions);
      });
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
      <>
        <div className="header-container">
          <button
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={this.handleShow}
          >
            Response Overview
          </button>
        </div>
        <div>
          <Modal
            size="lg"
            style={{ width: "100%" }}
            show={this.state.show}
            onHide={this.handleClose}
            animation={true}
          >
            <h3 style={{ textAlign: "center" }}>{this.props.workStation}</h3>
            {this.state.answeredQuestions &&
              this.state.answeredQuestions.map(function(question, index) {
                if (
                  question.QuestionResponse === "Y" ||
                  question.QuestionResponse === "N"
                ) {
                  return (
                    <>
                      <div
                        style={{
                          backgroundColor: "#E6E6E6",
                          padding: "1px"
                        }}
                      >
                        <ul>
                          {" "}
                          <b> Q :</b>
                          <div style={{ float: "right" }}>✔️</div>
                          {question.QuestionWhenAnswered}
                        </ul>
                      </div>
                    </>
                  );
                } else if (question.QuestionResponse === "P") {
                  return (
                    <>
                      <div
                        style={{
                          backgroundColor: "#BDBDBD",
                          padding: "1px"
                        }}
                      >
                        <ul>
                          <b> Q :</b>
                          {question.QuestionWhenAnswered}{" "}
                          <div style={{ float: "right" }}>❌</div>
                          {/* <br />
                          <b> S :</b>
                          {question.SuggestedSoloution} */}
                        </ul>
                      </div>
                    </>
                  );
                }
              })}
          </Modal>
        </div>
      </>
    );
  }
}
