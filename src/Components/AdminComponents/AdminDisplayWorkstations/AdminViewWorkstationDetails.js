import "./ViewWorkstationModal.css";
import React from "react";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
//hello
//hello
//hello
//hello

// import "./bootstrap.min.css";
class DisplayAddQuestion extends React.Component {
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
export default DisplayAddQuestion;
