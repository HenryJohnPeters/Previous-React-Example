import "./ViewWorkstationModal.css";
import React, { useState, useEffect } from "react";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
//hello
//hello
//hello
//hello

function ModalCompletedQuestions(props) {
  const [show, setShowState] = useState(0);
  const [loadingToken, setLoadingToken] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([{}]);

  useEffect(() => {
    setLoadingToken(true);
    let data = {
      WSAId: props.WSAId
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
        setAnsweredQuestions(results.recordset);
      });
  }, []);

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
    </>
  );
}

// // import "./bootstrap.min.css";
// class DisplayAddQuestions extends React.Component {
//   constructor(props) {
//     super(props);

//     this.handleClose = this.handleClose.bind(this);
//     this.handleShow = this.handleShow.bind(this);

//     this.handleRefresh = this.handleRefresh.bind(this);

//     this.state = {
//       show: false,
//       show1: false,
//       answeredQuestions: []
//     };
//   }
//   componentDidMount() {
//     let data = {
//       // RUId: this.props.RUId,
//       // Workstation: this.props.workStation,
//       WSAId: this.props.WSAId
//     };
//     fetch("/get-completed-questions", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     })
//       .then(recordset => recordset.json())
//       .then(results => {
//         this.setState({ answeredQuestions: results.recordset });
//         console.log(this.state.answeredQuestions);
//       });
//   }
//   handleClose() {
//     this.setState({
//       show: false
//     });
//   }

//   handleShow() {
//     this.setState({
//       show: true
//     });
//   }

//   handleRefresh() {
//     window.location.reload();
//   }

//   render() {
//     // console.log(this.state);

//     return (
//       <>
//         <div className="header-container">
//           <button
//             className="btn btn-primary"
//             style={{ float: "right" }}
//             onClick={this.handleShow}
//           >
//             Response Overview
//           </button>
//         </div>
//         <div>
//           <Modal
//             size="lg"
//             style={{ width: "100%" }}
//             show={this.state.show}
//             onHide={this.handleClose}
//             animation={true}
//           >
//             <h3 style={{ textAlign: "center" }}>{this.props.workStation}</h3>
//             {this.state.answeredQuestions &&
//               this.state.answeredQuestions.map(function(question, index) {
//                 if (
//                   question.QuestionResponse === "Y" ||
//                   question.QuestionResponse === "N"
//                 ) {
//                   return (
//                     <>
//                       <div
//                         style={{
//                           backgroundColor: "#E6E6E6",
//                           padding: "1px"
//                         }}
//                       >
//                         <ul>
//                           {" "}
//                           <b> Q :</b>
//                           <div style={{ float: "right" }}>✔️</div>
//                           {question.QuestionWhenAnswered}
//                         </ul>
//                       </div>
//                     </>
//                   );
//                 } else if (question.QuestionResponse === "P") {
//                   return (
//                     <>
//                       <div
//                         style={{
//                           backgroundColor: "#BDBDBD",
//                           padding: "1px"
//                         }}
//                       >
//                         <ul>
//                           <b> Q :</b>
//                           {question.QuestionWhenAnswered}{" "}
//                           <div style={{ float: "right" }}>❌</div>
//                           {/* <br />
//                           <b> S :</b>
//                           {question.SuggestedSoloution} */}
//                         </ul>
//
export default ModalCompletedQuestions;
