import React from "react";
import { Link } from "react-router-dom";
import { Modal,DropdownButton,Dropdown } from "react-bootstrap";
 
class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = { questions: [], QuestionsAnswer: [], workstations: [] , selectedWorkStation: ""};
    this.onSubmit = this.handleSubmit.bind(this);
    this.selectWorkStation = this.selectWorkStation.bind(this)
  }
  // sets the questions form sql into state for questions
  getItems() {
    fetch("/user-questions")
      .then(recordset => recordset.json())
      .then(results => {
        this.setState({ questions: results.recordset });
      }); 
      
  }
  
 
   getWorkStations() {
    var user = window.localStorage.getItem("User");
    if (user) {
      fetch(`/profile-work-station-detailss/${user}`)
        .then(recordset => recordset.json())
        .then(results => {
          this.setState({ workstations: results.recordset });
          console.log(this.state.workstations) 
        });
    }  
  }

  selectWorkStation(e){
    let self = this
    
    this.setState({selectedWorkStation : e.target.value})
    alert(this.state.selectedWorkStation)
    console.log(e)

  }
  
  componentDidMount() {
    this.setState({
      questions: this.getItems(),
       WorkStations :this.getWorkStations()
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

<DropdownButton style ={{float : "right"}}  id="dropdown-basic-button" title="Select Workstation">
{this.state.workstations &&
              this.state.workstations.map(function(workstations, index) { 
                return (
                  <div >
               <Dropdown.Item onClick={self.selectWorkStation}>{workstations.DeskLocation} </Dropdown.Item>     
                  </div>
                );
              })}
        </DropdownButton> 
<br/>
<br/>          

{/* 
<DropdownButton style ={{float : "right"}}  id="dropdown-basic-button" title="Select Workstation">
{this.state.workstations &&
              this.state.workstations.map(function(workstations, index) { 
                return (
                  <div >
                     <WorkStationSelecter workstations = {workstations}> </WorkStationSelecter>
                  </div>
                );
              })}
        </DropdownButton>  */}
<br/>
<br/>          


 

            {this.state.questions &&
              this.state.questions.map(function(questions, index) {
                return (
                  <div >
                    
                   
                    <Questions questions={questions}></Questions>
                   
                  </div>
                );
              })}
         
        </ul>
      </div>
    );
  }
}

export default DisplayQuestions;










class Questions extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props,   QuestionAnswer: "", QuestionAccepted: false  };
 
    this.QuestionDecline = this.QuestionDecline.bind(this);
    this.QuestionOnChange = this.QuestionOnChange.bind(this);
    this.OnCommit = this.OnCommit.bind(this);
    this.RevertDeclinedAnswer = this.RevertDeclinedAnswer.bind(this)
    this.RevertAcceptedAnswer = this.RevertAcceptedAnswer.bind(this)
     
    this.AcceptAnswer = this.AcceptAnswer.bind(this)
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

  AcceptAnswer(e){
    e.preventDefault()
    alert("clicked")

    var today = new Date(),
    date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
      1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

  let User =  window.localStorage.getItem("User")


    const data = {
      QuestionId: this.state.questions.QuestionId,  
      date,
      User
    };

    fetch("Accept-question-answer", {
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

    
    this.setState({ QuestionComplete: true, QuestionAccepted:false})
     
  }


  RevertAcceptedAnswer(e){
    e.preventDefault()
    alert ("revert clciked answer declined")
    let Email = window.localStorage.getItem("User")
    const data = {
      QuestionId: this.state.questions.QuestionId,
      QuestionAnswer: this.state.QuestionAnswer,
      Email 
      
    };
  
    fetch("revert-accepted-question-answer", {
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
    this.setState( {ShowInput : false, QuestionComplete: false})
      alert("you answer has been deleted from the database")
  
  }
  

  RevertDeclinedAnswer(e){
  e.preventDefault()
  alert ("revert clciked answer declined")
  let Email = window.localStorage.getItem("User")
  const data = {
    QuestionId: this.state.questions.QuestionId,
    QuestionAnswer: this.state.QuestionAnswer,
    Email  
  };
  fetch("revert-declined-question-answer", {
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
  this.setState( {ShowInput : false, QuestionComplete: false})
    alert("you answer has been deleted from the database")

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
     
     
    this.setState({ QuestionComplete: true , QuestionAccepted:true})
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
          </button>
           <button
            onClick={this.AcceptAnswer}
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

      if(this.state.QuestionAccepted){
        return(<h3 className = "jumbotron">
          <button onClick = {this.RevertDeclinedAnswer}style = {{float : "right" }}className = "btn btn-danger"> Revert Answer</button><br/>
           
           <li>Question Id: {this.state.questions.QuestionId}</li>
           <li> Question : {this.state.questions.Question}</li>
           <li>Complete : ✔️ </li>
           <li>Status: ❌</li>
           <li>Response to declined question: <u style = {{color : "grey"}}>{this.state.QuestionAnswer}</u> </li>
            
           </h3>)
    }
    else if (!this.state.QuestionAccepted){
      return(
        <h3 className = "jumbotron">
        <button onClick = {this.RevertAcceptedAnswer}style = {{float : "right" }}className = "btn btn-danger"> Revert Answer</button><br/>
         
         <li>Question Id: {this.state.questions.QuestionId}</li>
         <li> Question : {this.state.questions.Question}</li>
         <li>Complete : ✔️ </li>
         <li>Status: ✔️</li>
          
         </h3>
      )
    }
  
  }


  }
}
 