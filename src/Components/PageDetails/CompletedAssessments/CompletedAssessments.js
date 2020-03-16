import React, { useState, useEffect } from "react";
import moment from "moment";

import { Link } from "react-router-dom";

import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import ModalCompletedQuestions from "../../AdminComponents/AdminDisplayWorkstations/AdminViewWorkstationDetails";
import Slide from "react-reveal";
import Fade from "react-reveal";

function AdminWorkstations(props) {
  const [WSAHeaders, setWSAHeaders] = useState([{}]);
  const [currentPage, setPage] = useState(1);
  const [WSAPerPage, setWSA] = useState(4);
  const [pageNumbers, createPageNumber] = useState([]);
  const [loadingToken, setLoadingToken] = useState(null);

  const indexOfLastTodo = currentPage * WSAPerPage;
  const indexOfFirstTodo = indexOfLastTodo - WSAPerPage;
  const currentTodos = WSAHeaders.slice(indexOfFirstTodo, indexOfLastTodo);

  // const pageNumbers = [];

  useEffect(() => {
    setLoadingToken(true);

    let user = window.localStorage.getItem("User");
    fetch(`/user-completed-WSA/${user}`)
      .then(recordset => recordset.json())
      .then(results => {
        setWSAHeaders(results.recordset);

        var pNumbers = [];
        for (
          let i = 1;
          i <= Math.ceil(results.recordset.length / WSAPerPage);
          i++
        ) {
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

export default AdminWorkstations;

function Questions(props) {
  const [answeredQuestions, getAnsweredQuestion] = useState(0);

  return (
    <div>
      <ModalCompletedQuestions
        RUId={props.RUId}
        workStation={props.workStation}
        WSAId={props.WSAId}
      />

      <Link
        to={{
          pathname: "/admin-view-full-user-wsa-responses",
          state: {
            WSAId: props.WSAId
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
        {props.RUId}
      </li>
      <li>
        <b>Workstation: </b>
        {props.workStation}
      </li>
      <li>
        <b>Date: </b>

        {moment(props.date).format("L")}
      </li>
      <li>
        <b>Complete Token: </b>
        {props.completeToken}
      </li>
    </div>
  );
}
