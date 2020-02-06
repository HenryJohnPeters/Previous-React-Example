import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
 
class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = { questions: [], QuestionsAnswer: [], QuestionsSeverity: [] };
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
      <div>
        <h3 style={{ textAlign: "center" }}>
          <u>Desk Assessment</u>
        </h3>

        <ul>
          <button
            disabled
            className="btn btn-secondary"
            style={{ float: "left " }}
          >
            Desk Assessment
          </button>

        

          
          <Link to="./user-history">
            <button className="btn btn-secondary" style={{ float: "left " }}>
              View History
            </button>
          </Link>
          <br />
          <br />
          
            {this.state.questions &&
              this.state.questions.map(function(questions, index) {
                return (
                  <div >
                    
                  <ul>
                    <WorkStations questions={questions}></WorkStations>
                  </ul>
                  </div>
                );
              })}
         
        </ul>
      </div>
    );
  }
}

export default DisplayQuestions;

class WorkStations extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props,   QuestionAnswer: "",  };
 
    this.QuestionDecline = this.QuestionDecline.bind(this);
    this.QuestionOnChange = this.QuestionOnChange.bind(this);
    this.OnCommit = this.OnCommit.bind(this);
  }
  
  QuestionDecline(e) {
    e.preventDefault();
     
    if (this.state.ShowInput) {
      this.setState({ ShowInput: false });
      alert(this.state.ShowInput);
    } else if (!this.state.ShowInput) {
      this.setState({ ShowInput: true });
      alert(this.state.ShowInput);
    }

    
    
  }

  QuestionOnChange(e) {
    this.setState({ QuestionAnswer: e.target.value });
  }


  ///////////////////////////////////////////
  OnCommit(e) {
     
    alert(this.state.QuestionAnswer);

    var today = new Date(),
      date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
        1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

    let User =  window.localStorage.getItem("User")


    const data = {
      QuestionId: this.state.questions.QuestionId,
      QuestionAnswer: this.state.QuestionAnswer,
      date : date,
        User
    };

    fetch("/question-response", {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json,",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      console.log("response before it is broken down " + response);

      // return response.json();
    });
       
      if (this.state.QuestionComplete) {
        this.setState({ QuestionComplete: false });
        alert(this.state.QuestionComplete);
      } else if (!this.state.QuestionComplete) {
        this.setState({ QuestionComplete: true });
        alert(this.state.QuestionComplete);

        this.state.QuestionComplete =  true
      }
    window.location.reload();
  }
////////////////////////////////////////////////
  render() {
    if (!this.state.QuestionComplete ){
    if (!this.state.ShowInput && !this.state.QuestionComplete) {
      return (
        <div className="jumbotron">
          <button
            onClick={this.QuestionDecline}
            className="btn btn-danger"
            style={{ float: "right" }}
          >
            Decline
          </button> <button
            onClick={this.deleteQuestion}
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Accept
          </button>
         
          <br />
          <li> Question ID: {this.state.questions.QuestionId}</li>
          <li> Question:{this.state.questions.Question}</li>
        </div>
      );
    } else if(this.state.ShowInput && !this.state.QuestionComplete) {
      return (
        <div className = "jumbotron">
          <li>Question Id: {this.state.questions.QuestionId}</li>
          <li>
            <textarea
              placeholder= "How can this be improved ?" 
              style={{ width: "100%" }}
              onChange={this.QuestionOnChange}
            />
          </li>
          <button
            style={{ float: "right", padding: "2px" }}
            className="btn btn-primary"
            onClick={() => this.OnCommit()}
          >
            Submit
          </button>

          <button
            onClick={this.EditQuestion}
            style={{ float: "right", padding: "2px" }}
            className="btn btn-secondary"
          >
            Revert
          </button>
          <br />
        </div>
      );
    }

    }else if (this.state.QuestionComplete) {
        return(<h3> <li>Question Id: {this.state.questions.QuestionId}</li></h3>)
    
    }


  }
}
 