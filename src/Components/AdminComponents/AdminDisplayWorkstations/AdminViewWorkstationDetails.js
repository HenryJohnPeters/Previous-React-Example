import "./ViewWorkstationModal.css";
import React, { useState, useEffect } from "react";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";

function ModalCompletedQuestions(props) {
  const [show, setShowState] = useState(0);
  const [loadingToken, setLoadingToken] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([{}]);

  async function fetchMyAPI() {
    let data = {
      WSAId: props.WSAId
    };
    let results = await fetch("/get-completed-questions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(recordset => recordset.json())
      .then(results => {
        setAnsweredQuestions(results.recordset);
      });
    console.log("I just rendered");
    // console.log(answeredQuestions);
  }

  useEffect(() => {
    setLoadingToken(true);
    fetchMyAPI();
  }, [props.WSAId]);

  function handleClose() {
    setShowState(false);
  }

  function handleShow() {
    setShowState(true);
  }

  return (
    <>
      <>
        <div className="header-container">
          <button
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={handleShow}
          >
            Response Overview
          </button>
        </div>
        <div>
          <Modal
            size="lg"
            style={{ width: "100%" }}
            show={show}
            onHide={handleClose}
            animation={true}
          >
            <h3 style={{ textAlign: "center" }}>{props.workStation}</h3>
            {answeredQuestions &&
              answeredQuestions.map(function(question, index) {
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
                        </ul>
                      </div>
                    </>
                  );
                }
              })}
          </Modal>
        </div>
      </>
    </>
  );
}

export default ModalCompletedQuestions;
