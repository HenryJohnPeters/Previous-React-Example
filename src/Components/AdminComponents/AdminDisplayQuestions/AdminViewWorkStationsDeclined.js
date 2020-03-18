import React, { useState, useEffect } from "react";
import moment from "moment";

import { Link } from "react-router-dom";

import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import ModalCompletedQuestions from "../AdminDisplayWorkstations/AdminViewWorkstationDetails";
import Slide from "react-reveal";
import Fade from "react-reveal";
import "./WSA.css";

function AdminWorkstationss({ initialCount }) {
  const [WSAHeaders, setWSAHeaders] = useState([{}]);
  const [currentPage, setPage] = useState(1);
  const [WSAPerPage, setWSA] = useState(10);
  const [pageNumbers, createPageNumber] = useState([]);
  const [loadingToken, setLoadingToken] = useState(null);

  const indexOfLastTodo = currentPage * WSAPerPage;
  const indexOfFirstTodo = indexOfLastTodo - WSAPerPage;
  const currentTodos = WSAHeaders.slice(indexOfFirstTodo, indexOfLastTodo);

  // const pageNumbers = [];
  useEffect(() => {
    setLoadingToken(true);
    fetch(`/admin-in-progress-WSA`)
      .then(recordset => recordset.json())
      .then(results => {
        setWSAHeaders(results.recordset);
        var pNumbers = [];
        for (
          let i = 1;
          i <= Math.ceil(results.recordset.length / WSAPerPage);
          i++
        ) {
          // pageNumbers.push(i);
          pNumbers.push(i);
        }
        createPageNumber(pNumbers);
      });

    setLoadingToken(false);
  }, []);
  function handleClick(event) {
    setPage(Number(event.target.id));
  }

  if (!loadingToken) {
    return (
      <>
        <Fade>
          <Slide left>
            <h2 style={{ textAlign: "center" }}>
              Workstation Assessments(<b> In Progress</b>)
            </h2>
          </Slide>
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
            title="WSA's Per Page"
          >
            <Dropdown.Item onClick={() => setWSA(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={() => setWSA(20)}>20</Dropdown.Item>
            <Dropdown.Item onClick={() => setWSA(40)}>40</Dropdown.Item>
            <Dropdown.Item onClick={() => setWSA(100)}>100</Dropdown.Item>
          </DropdownButton>{" "}
          <DropdownButton
            style={{ float: "right" }}
            id="dropdown-basic-button"
            title="In Progress"
          >
            <Dropdown.Item>
              {" "}
              <Link to="admin-view-workstation-assessments">Complete</Link>
            </Dropdown.Item>
          </DropdownButton>{" "}
        </ul>
        {currentTodos.map(number => (
          <ul>
            {" "}
            <div className="jumbotron">
              <Questions
                workStation={number.AssignedWorkstation}
                date={number.Date}
                completeToken={number.QuestionStatus}
                RUId={number.RUId}
                WSAId={number.WSAId}
              ></Questions>
            </div>
          </ul>
        ))}
        <div style={{ alignContent: "center", width: "10%" }}></div>
        <div style={{ textAlign: "center", alignContent: "center" }}>
          {" "}
          <b> Current Page </b>: {currentPage}
          <br />
          <div>
            {pageNumbers.map(number => (
              <button
                className="btn btn-primary"
                key={number}
                id={number}
                onClick={handleClick}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
        <br />
      </>
    );
  } else if (loadingToken) {
    return (
      <>
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
            title="In Progress"
          >
            <Dropdown.Item>
              {" "}
              <Link to="admin-view-workstation-assessments-declined">
                Complete
              </Link>
            </Dropdown.Item>
          </DropdownButton>{" "}
        </ul>
        <h3 style={{ textAlign: "center" }}>LOADING</h3>
      </>
    );
  }
}

export default AdminWorkstationss;

// // var results = [];
// class AdminWorkstations extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       questions: [],
//       viewDetails: false,

//       currentPage: 1,
//       todosPerPage: 10,
//       pageNumbers: [],
//       FullDetailsPageToken: false,
//       loadingToken: true
//     };
//     this.getQuestionByUniqueDate = this.getQuestionByUniqueDate.bind(this);
//     // this.test = this.test.bind(this);
//   }
//   // sets the questions form sql into state for questions
//   handleClick = event => {
//     this.setState({
//       currentPage: Number(event.target.id)
//     });
//   };

//   handlePageChange(pageNumber) {
//     this.setState({ activePage: pageNumber });
//   }

//   componentWillMount = () => {
//     fetch(`/admin-completed-workstations`)
//       .then(recordset => recordset.json())
//       .then(results => {
//         this.setState({ questions: results.recordset });
//         console.log(`QuestionResponses array ${this.state.questions}`);

//         this.state.questions &&
//           this.getQuestionByUniqueDate(this.state.questions);
//       });
//   };

//   getQuestionByUniqueDate(questions) {
//     for (var i = 0; i < questions.length; i++) {
//       if (
//         !results.find(q => q.Date == questions[i].Date) ||
//         !results.find(
//           q => q.AssignedWorkStation == questions[i].AssignedWorkStation
//         )
//       ) {
//         results.push(questions[i]);
//         this.setState({ amountOfWorkstations: results.length });
//       }
//     }
//     this.setState({ loadingToken: false });
//   }

//   render() {
//     const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
//     const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
//     const currentTodos = results.slice(indexOfFirstTodo, indexOfLastTodo);

//     const pageNumbers = [];
//     for (
//       let i = 1;
//       i <= Math.ceil(this.state.amountOfWorkstations / this.state.todosPerPage);
//       i++
//     ) {
//       pageNumbers.push(i);
//     }

//     console.log(this.state.questions);

//     if (this.state.questions.length && !this.state.loadingToken) {
//       return (
//         <div>
//           <Fade left>
//             <h3 style={{ textAlign: "center" }}>
//               Completed Workstation Assessments
//             </h3>
//           </Fade>

//           <ul>
//             <button disabled className="btn btn-secondary">
//               Workstation Assessments
//             </button>
//             <Link to="./admin-center">
//               <button className="btn btn-secondary">Edit Questions</button>
//             </Link>
//             <Link to="./admin-center-view-users">
//               <button className="btn btn-secondary">View Users</button>
//             </Link>
//             <DropdownButton
//               style={{ float: "right" }}
//               id="dropdown-basic-button"
//               title="Completed"
//             >
//               <Dropdown.Item>
//                 {" "}
//                 <Link to="admin-view-workstation-assessments-declined">
//                   In Progress
//                 </Link>
//               </Dropdown.Item>
//             </DropdownButton>{" "}
//           </ul>

//           <ul>
//             {currentTodos.map(function(r, index) {
//               return (
//                 <div className="jumbotron">
//                   <Slide>
//                     {/* <Questions
//                       workStation={r.AssignedWorkstation}
//                       date={r.Date}
//                       completeToken={r.QuestionStatus}
//                       RUId={r.RUId}
//                       WSAId={r.WSAId}
//                     ></Questions> */}
//                   </Slide>
//                 </div>
//               );
//             })}
//             <div
//               style={{ userSelect: "none", cursor: "pointer" }}
//               id="page-numbers"
//             >
//               {pageNumbers.map(number => {
//                 return (
//                   <button
//                     className="btn btn-primary"
//                     key={number}
//                     id={number}
//                     onClick={this.handleClick}
//                   >
//                     {number}
//                   </button>
//                 );
//               })}
//             </div>
//           </ul>
//         </div>
//       );
//     } else if (!this.state.questions.length && !this.state.loadingToken) {
//       return (
//         <>
//           {" "}
//           <Fade left>
//             <h3 style={{ textAlign: "center" }}>
//               Completed Workstation Assessments
//             </h3>
//           </Fade>
//           <div>
//             <ul>
//               <br />
//               <br />{" "}
//               <div>
//                 <h6> </h6>
//               </div>
//               <div className="jumbotron">
//                 <li style={{ textAlign: "center" }}>
//                   <b>no completed Workstation Self-Assessments</b>{" "}
//                 </li>
//               </div>
//             </ul>
//           </div>
//         </>
//       );
//     } else if (this.state.loadingToken) {
//       return (
//         <>
//           <Fade left>
//             <h3 style={{ textAlign: "center" }}>
//               Completed Workstation Assessments
//             </h3>
//           </Fade>
//           <div style={{ textAlign: "center" }}>LOADING</div>

//           <div className="loader center">
//             <i className="fa fa-cog fa-spin" />
//           </div>
//         </>
//       );
//     }
//   }
// }

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

              {moment(this.props.date).format("LLLL")}
            </li>
            <li>
              <b>Complete Token: </b>
              {this.props.completeToken}
            </li>
          </div>
        );
      }
    }
  }
}
