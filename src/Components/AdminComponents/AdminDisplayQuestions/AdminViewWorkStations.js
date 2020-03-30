import React, { useState, useEffect } from "react";
import moment from "moment";

import { Link } from "react-router-dom";

import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import ModalCompletedQuestions from "../AdminDisplayWorkstations/AdminViewWorkstationDetails";
// import Slide from "react-reveal";
// import Fade from "react-reveal";
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
    fetch(`/admin-completed-workstations`)
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
    console.log(WSAHeaders);
     
  }, []);

  function handleClick(event) {
    setPage(Number(event.target.id));
  }

  if (!loadingToken) {
    if (WSAHeaders.length) {
      return (
        <>
           
          <ul>
            {/* <Slide right> */}
              <h2 style={{ textAlign: "center" }}>
                Workstation Self-Assessments(<b>Completed</b>)
              </h2>
              <br/>
            {/* </Slide> */}
            <button disabled className="btn btn-secondary">
              Workstation Self-Assessments
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
          {currentTodos.map(number => (
            <ul>
              {" "}
              <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
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
    } else if (!WSAHeaders.length) {
      return (
        <>
         
              <h2 style={{ textAlign: "center" }}>
                Workstation Assessments(<b> Completed</b>)
              </h2>
              <br/>
            
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
            <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
              <p style={{ textAlign: "center" }}>
                <b>No Workstation assessments found with status of completed</b>
              </p>
            </div>
          </ul>
        </>
      );
    }
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
        <h3 style={{ textAlign: "center" }}>LOADING</h3>
      </>
    );
  }
}

export default AdminWorkstationss;

class Questions extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.state = {
      ...props,

      selectedSet: [],

      answeredQuestions: []
    };
  }

  render() {
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
          <button style={{ float: "right" , padding : "5px"}} className="btn btn-primary">
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
