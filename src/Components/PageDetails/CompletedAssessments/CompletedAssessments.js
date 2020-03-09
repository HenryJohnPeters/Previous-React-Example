// import React from "react";
// import moment from "moment";
// class DisplayQuestions extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       CompletedAssessments: [],
//       QuestionsAnswer: [],
//       workstations: [],
//       viewDetails: false
//     };
//     // this.getQuestionByUniqueDate = this.getQuestionByUniqueDate.bind(this);
//   }
//   // sets the questions form sql into state for questions

//   componentDidMount() {
//     let User = window.localStorage.getItem("User");
//     fetch(`/user-completed-questions/${User}`)
//       .then(recordset => recordset.json())
//       .then(results => {
//         this.setState({ CompletedAssessments: results.recordset });
//         console.log(this.state.questions);
//       });
//   }

//   // getQuestionByUniqueDate(questions) {
//   //   var results = [];

//   //   for (var i = 0; i < questions.length; i++) {
//   //     if (
//   //       !results.find(q => q.Date == questions[i].Date) ||
//   //       !results.find(
//   //         q => q.AssignedWorkStation == questions[i].AssignedWorkStation
//   //       )
//   //     ) {
//   //       results.push(questions[i]);
//   //     }
//   //   }
//   //   return results;
//   // }

//   render() {
//     let selectedWorkStation = window.localStorage.getItem("Workstation");

//     console.log(this.state.questions);

//     if (this.state.CompletedAssessments.length) {
//       return (
//         <div>
//           <h3 style={{ textAlign: "center" }}></h3>

//           <ul>
//             <div>
//               <h6></h6>
//             </div>

//             {this.state.CompletedAssessments &&
//               this.state.CompletedAssessments.map(function(questions, index) {
//                 return (
//                   <div className="jumbotron">
//                     <Questions questions={questions}></Questions>
//                   </div>
//                 );
//               })}
//           </ul>
//         </div>
//       );
//     } else if (!this.state.CompletedAssessments.length) {
//       return (
//         <>
//           {" "}
//           <div>
//             <h3 style={{ textAlign: "center" }}></h3>

//             <ul>
//               <br />
//               <br />{" "}
//               <div>
//                 <h6>
//                   {" "}
//                   <tr>
//                     Desk Location Selected :{" "}
//                     <u style={{ color: "grey" }}>{selectedWorkStation}</u>
//                   </tr>
//                 </h6>
//               </div>
//               <div className="jumbotron">
//                 <li style={{ textAlign: "center" }}>
//                   <b>
//                     This account has not completed any Workstation
//                     self-assessments
//                   </b>{" "}
//                 </li>
//               </div>
//             </ul>
//           </div>
//         </>
//       );
//     }
//   }
// }

// export default DisplayQuestions;

// class Questions extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(props);
//     this.state = {
//       ...props,
//       questionsAccepted: [],
//       questionsAcceptedCounter: "",
//       selectedSet: []
//     };
//     this.checker = this.checker.bind(this);
//   }

//   checker() {
//     if (!this.state.viewDetails) {
//       this.setState({ viewDetails: true });
//     } else if (this.state.viewDetails) {
//       this.setState({ viewDetails: false });
//     }

//     let date = this.state.questions.Date;
//     let email = window.localStorage.getItem("User");

//     fetch(`/show-questions-answered/${date}/${email}`)
//       .then(recordset => recordset.json())
//       .then(results => {
//         this.setState({ selectedSet: results.recordset });
//         console.log(this.state.selectedSet);
//       });
//   }

//   render() {
//     console.log(
//       `${this.state.previousDate} PREVIOUS DATE ${this.state.questions.Date}  DATE`
//     );

//     if (!this.state.viewDetails) {
//       return (
//         <div>
//           <button
//             onClick={this.checker}
//             className="btn btn-primary"
//             style={{ float: "right" }}
//           >
//             View Details
//           </button>

//           <br />
//           <li>
//             <b>Workstation ID : </b> {this.props.questions.AssignedWorkstation}
//           </li>
//           <li>
//             <b>Status </b> {this.props.questions.QuestionStatus}
//           </li>
//           <li>
//             <b>Date: </b>
//             {moment(this.props.questions.Date).format("DD/MM/YYYY ")}
//           </li>
//         </div>
//       );
//     } else {
//       console.log(this.state.selectedSet);
//       return (
//         <div>
//           <button
//             onClick={this.checker}
//             className="btn btn-primary"
//             style={{ float: "right" }}
//           >
//             View Details
//           </button>
//           {moment(this.props.questions.Date).format("DD/MM/YYYY ")}
//           <br />
//           <li>
//             <b style={{ textAlign: "center" }}>
//               {this.props.questions.AssignedWorkstation}{" "}
//             </b>
//           </li>{" "}
//           <br />
//           {this.state.selectedSet &&
//             this.state.selectedSet.map((item, index) => {
//               if (item.QuestionResponse == "no") {
//                 return (
//                   <div style={{ color: "red" }}>
//                     <li> Question When Answered {item.QuestionWhenAnswered}</li>
//                     <li>Question Response{item.QuestionResponse}</li>
//                     <li>Status {item.QuestionSetStatus}</li>
//                     <li>{item.SuggestedSoloution}</li>
//                   </div>
//                 );
//               } else {
//                 return (
//                   <div style={{ color: "green" }}>
//                     <li> Question When Answered {item.QuestionWhenAnswered}</li>
//                     <li>Question Response{item.QuestionResponse}</li>
//                     <li>Status {item.QuestionSetStatus}</li>
//                     <li>{item.SuggestedSoloution}</li>
//                   </div>
//                 );
//               }
//             })}
//         </div>
//       );
//     }
//   }
// }
import React from "react";
import moment from "moment";

import { Link } from "react-router-dom";

import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import ModalCompletedQuestions from ".../AdminComponents";

moment.locale(window.navigator.language);

console.log(window.navigator.language);

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
    fetch(`/admin-completed-workstations`)
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

    console.log(this.state.questions);
    if (!this.state.FullDetailsPageToken) {
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
              <h2 style={{ textAlign: "center" }}>
                Completed Workstation Assessments
              </h2>

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
    // this.checker = this.checker.bind(this);
    // this.ViewActivity = this.ViewActivity.bind(this);
    // this.SubmitNote = this.SubmitNote.bind(this);
    // this.AddNoteBtn = this.AddNoteBtn.bind(this);
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
            {/* <button
              onClick={this.checker}
              className="btn btn-primary"
              style={{ float: "right" }}
            >
              Question Responses
            </button> */}
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
      // } else if (this.state.ViewActivity && this.state.addNoteToken) {
      //   return (
      //     <>
      //       {" "}
      //       <>
      //         <button
      //           style={{ float: "right" }}
      //           onClick={e =>
      //             this.setState({
      //               ViewActivity: false,
      //               viewDetails: false,
      //               ViewActivityToken: false,
      //               addNoteToken: false
      //             })
      //           }
      //           className="btn btn-secondary"
      //         >
      //           Revert
      //         </button>
      //         <br />
      //         <li>
      //           <b>User Id: </b>
      //           {this.props.RUId}
      //         </li>
      //         <li>
      //           <b>Workstation: </b>
      //           {this.props.workStation}
      //         </li>
      //         <li>
      //           <b>Date: </b>
      //           {moment(this.props.date).format("DD/MM/YYYY")}
      //         </li>
      //         <li>
      //           <b>Complete Token: </b>
      //           {this.props.completeToken}
      //         </li>

      //         {this.state.notesFromDB &&
      //           this.state.notesFromDB.map((item, index) => {
      //             return (
      //               <div
      //                 style={{
      //                   backgroundColor: "white",
      //                   border: "inset",
      //                   borderWidth: "0.2px"
      //                 }}
      //               >
      //                 <div style={{ float: "right" }}>
      //                   {moment(item.CreationTime).format("L")}
      //                 </div>
      //                 <div>
      //                   <b>{`${item.UserStatus} `}</b>
      //                 </div>

      //                 <div style={{ textAlign: "left" }}>{item.Notes}</div>
      //               </div>
      //             );
      //           })}

      //         <br />
      //         <input
      //           onChange={e => this.setState({ noteToBeAdded: e.target.value })}
      //         />

      //         <button
      //           onClick={this.SubmitNote}
      //           className="btn btn-primary"
      //           style={{ width: "100%" }}
      //         >
      //           Submit Button
      //         </button>
      //       </>
      //     </>
      //   );
    }
  }
}
export default AdminWorkstations;
