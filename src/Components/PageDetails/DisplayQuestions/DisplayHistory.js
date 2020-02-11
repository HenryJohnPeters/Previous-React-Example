import React from "react";
import { Link } from "react-router-dom";
import { Modal,DropdownButton,Dropdown } from "react-bootstrap";

 
class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = { questions: [], QuestionsAnswer: [], workstations: [] , selectedWorkStation: ""};
  //  this.onSubmit = this.handleSubmit.bind(this);
    
  }
  // sets the questions form sql into state for questions
  getItems() {
      let WorkStation = window.localStorage.getItem("Workstation")
      let User = window.localStorage.getItem("User")
      console.log(`LOOK AT THIS ${WorkStation}`)

    fetch(`/user-completed-questions/${WorkStation}/${User}`)
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
  
  componentDidMount() {
    this.setState({
      questions: this.getItems(),
       WorkStations :this.getWorkStations()
    });
  }
 
  render() {
   let selectedWorkStation= window.localStorage.getItem("Workstation")
    var self = this;
    console.log(this.state.questions);
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          <u>History</u>
        </h3>

        <ul><Link to="./user-questions">
          <button
            
            className="btn btn-secondary"
            style={{ float: "left " }}
          >
           Workstation Self-Assessment
          </button>    </Link>
          
            <button className="btn btn-secondary" disabled style={{ float: "left " }}>
              History
            </button>
        
       
          
 


<DropdownButton style ={{float : "right"}}  id="dropdown-basic-button" title="Select Workstation Location">
{this.state.workstations &&
              this.state.workstations.map(function(workstations, index) { 
                return (
                  <div >
                     <WorkStationSelecter workstations = {workstations}> </WorkStationSelecter>
                  </div>
                );
              })}</DropdownButton> 
         
<br/>
<br/>          <div >
            <h6> <tr>Desk Location Selected :  <u style = {{ color : "grey" }}>{selectedWorkStation}</u></tr></h6>
</div>
 
 <div className = "jumbotron"> 
            {this.state.questions &&
              this.state.questions.map(function(questions, index) {
                 
                return (
                  
                 
                   
                    <Questions questions={questions}></Questions>
                   
                   
                );
              })}
         </div>
        </ul>
      </div>
    );
  }
}

export default DisplayQuestions;


class WorkStationSelecter extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props,    };
    this.selectWorkStation = this.selectWorkStation.bind(this)
  }

selectWorkStation(e)
{
  e.preventDefault()
 
 

window.localStorage.setItem("Workstation", this.state.workstations.DeskLocation)
window.location.reload()
  
   
}
  render() {
      return (
        <>
        <Dropdown.Item onClick={this.selectWorkStation}>{this.state.workstations.DeskLocation} </Dropdown.Item>
         
      
      </>
      );
   
    }
  }





class Questions extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...props,  };
}
  
  render() {
  
    if (this.state.questions.Accepted >0 ) {
      return (
          <div  >
          
          <h4 style = {{float:"right"}}>✔️</h4> 
          <br />
          
          <li> Question When Answered: {this.state.questions.QuestionWhenAnswered}</li>
          <li> Question Status: <b>{this.state.questions.QuestionResponse}</b></li>
          <li> Date: {this.state.questions.Date}</li>
        </div>
      );
    } else   {
      return (
        <div  >
          <h4 style = {{float:"right"}}>❌</h4> 
        <br />
         
        <li> Question When Answered: {this.state.questions.QuestionWhenAnswered}</li>
        <li> Question Status: <b>Declined</b></li>
        <li> Question Response: {this.state.questions.QuestionResponse}</li>
        <li> Date: {this.state.questions.Date}</li>
      </div>
      );
    }
  }
  }
 