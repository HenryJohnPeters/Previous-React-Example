import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AddQuestion from "./AdminAddQuestion";
import Fade from "react-reveal";
import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      QuestionsAnswer: [],
      QuestionsSeverity: []
    };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  // sets the questions form sql into state for questions
  getItems() {
    fetch("/user-questions")
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ questions: results.recordset });
      });
  }
  //when the component mounts make the sql questions the s
  componentDidMount() {
    this.setState({
      questions: this.getItems()
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = {
      QuestionID: this.QuestionID,
      QuestionsAnswer: this.state.QuestionsAnswer,
      QuestionSeverity: this.state.QuestionsSeverity
    };

    try {
      fetch("/Question-Response", {
        method: "POST", // or 'PUT'
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } catch (error) {}
  }
  refresh() {
    window.location.reload();
  }

  render() {
    var self = this;
    console.log(this.state.questions);

    return (
      <>
        <Fade>
          <ToastContainer transition={Zoom} position="top-right" />
          <Fade left>
            <h3 style={{ textAlign: "center" }}>Edit Questions</h3>
          </Fade>
          <Fade right>
            <ul>
              <Link to="/admin-view-workstation-assessments">
                <button
                  className="btn btn-secondary"
                  style={{ float: "left " }}
                >
                  Workstation Self-Assessments
                </button>
              </Link>

              <button
                disabled
                className="btn btn-secondary"
                style={{ float: "left " }}
              >
                Edit Questions
              </button>

              <DisplayAddQuestion />

              <button
                onClick={this.refresh}
                style={{ float: "right" }}
                className="btn btn-secondary"
              >
                ⟳
              </button>
              <Link to="./admin-center-view-users">
                <button
                  className="btn btn-secondary"
                  style={{ float: "left " }}
                >
                  View Users
                </button>
              </Link>
              <br />
              <br />

              {this.state.questions &&
                this.state.questions.map(function(questions, index) {
                  return (
                    <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
                      <WorkStations questions={questions}></WorkStations>
                    </div>
                  );
                })}
            </ul>
          </Fade>
        </Fade>
      </>
    );
  }
}

export default DisplayQuestions;

class WorkStations extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...props,
      show: false,
      QuestionUpdate: "",
      GuidanceNotesUpdate: "",
      deleteToken: false,
      confirmDeleteToken: false
    };
  }

  render() {
    {
      return (
        <div>
          <DisplayDeleteConfirmation
            question={this.state.questions.Question}
            questionId={this.state.questions.QuestionId}
          />
          <EditQuestionModal
            question={this.state.questions.Question}
            guidanceNote={this.state.questions.GuidanceNotes}
          />

          <br />

          <li>
            <b>Question: </b> {this.state.questions.Question}
          </li>
          <li>
            <b>Guidance Notes: </b>
            {this.state.questions.GuidanceNotes}{" "}
          </li>
        </div>
      );
    }
  }
}

class DisplayAddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      show: false,
      show1: false
    };
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
      <div className="header-container">
        <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={this.handleShow}
        >
          +
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <AddQuestion />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

class DisplayDeleteConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);
    this.DeleteQuestionAndGuidanceNotes = this.DeleteQuestionAndGuidanceNotes.bind(
      this
    );

    this.state = {
      show: false,
      question: "",
      questionId: ""
    };
  }

  handleClose() {
    this.setState({
      show: false
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
  DeleteQuestionAndGuidanceNotes() {
    let question = this.props.question;
    let questionId = this.props.questionId;

    let data = { question, questionId };

    fetch("/delete-question", {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    toast.info("Question and guidance note deleted ", {
      // className: "custom-toast",
      draggable: true,

      autoClose: 1500
    });
    window.location.reload();
  }

  render() {
    // console.log(this.state);

    return (
      <div className="header-container">
        <ToastContainer transition={Zoom} position="top-right" />
        <button
          className="btn btn-danger"
          style={{ float: "right" }}
          onClick={this.handleShow}
        >
          X
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <div className="jumbotron">
            <h4>Are you sure you want to delete this?</h4>
            <ul>
              <button
                onClick={this.DeleteQuestionAndGuidanceNotes}
                style={{
                  width: "50%",
                  paddingLeft: "1px",
                  paddingRight: "1px"
                }}
                className="btn btn-primary"
              >
                Yes
              </button>
              <button
                onClick={e => this.setState({ show: false })}
                style={{
                  width: "50%",
                  paddingLeft: "1px",
                  paddingRight: "1px"
                }}
                className="btn btn-primary"
              >
                No
              </button>
            </ul>
          </div>
          <Modal.Body></Modal.Body>
        </Modal>
      </div>
    );
  }
}

class EditQuestionModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      show: false,
      show1: false
    };
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
      <div className="header-container">
        <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={this.handleShow}
        >
          Edit
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <EditQuestion
              question={this.props.question}
              guidanceNote={this.props.guidanceNote}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

class EditQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      guidanceNote: ""
    };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      question: this.props.question,
      guidanceNote: this.props.guidanceNote
    });
  }

  handleSubmit(e) {
    try {
      if (this.state.question.length < 10) {
        toast.error("Please enter a more descriptive question", {
          // className: "custom-toast",
          draggable: true,

          autoClose: 1500
        });
      } else if (this.state.guidanceNote.length < 10) {
        toast.error("Please enter a more descriptive guidance note", {
          // className: "custom-toast",
          draggable: true,

          autoClose: 1500
        });
      } else {
        var today = new Date(),
          date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
            1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

        const data = {
          Question: this.state.question,
          GuidanceNote: this.state.guidanceNote,
          date: date,
          previousQuestion: this.props.question,
          previousGuidanceNote: this.props.guidanceNote
        };
        fetch("/admin-edit-question", {
          method: "POST", // or 'PUT'
          headers: {
            Accept: "application/json,",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(response => {
          console.log("response before it is broken down " + response);

          return response.json();
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log(this.state.email);
    console.log(this.state.password);
    return (
      <div>
        <ToastContainer transition={Zoom} position="top-right" />
        <form>
          <div className="jumbotron">
            <h3 style={{ textAlign: "center" }}>Edit Question</h3>
            <div className="help"></div>

            <textarea
              style={{ width: "100%" }}
              value={this.state.question}
              onChange={e => this.setState({ question: e.target.value })}
            />

            <textarea
              style={{ width: "100%" }}
              value={this.state.guidanceNote}
              onChange={e => this.setState({ guidanceNote: e.target.value })}
            />

            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              type="submit"
              onClick={this.onSubmit}
            >
              Update Question
            </button>
          </div>
        </form>
      </div>
    );
  }
}
