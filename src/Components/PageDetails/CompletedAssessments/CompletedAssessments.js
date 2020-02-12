import React from "react";
import { Link } from "react-router-dom";
import { Modal,DropdownButton,Dropdown } from "react-bootstrap";
import { date } from "yup";


class DisplayQuestions extends React.Component {
  constructor() {
    super();

    this.state = { questions: [], QuestionsAnswer: [], workstations: [],  viewDetails:false };
 this.getQuestionByUniqueDate = this.getQuestionByUniqueDate.bind(this)
    
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
        console.log(this.state.questions)
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

  getQuestionByUniqueDate(questions){
    
    var results = []
    for(var i = 0; i < questions.length; i++){
      if(!results.find(q => q.Date == questions[i].Date)){
        results.push(questions[i])
      }
    }
    return results
  }

  render() {
   let selectedWorkStation= window.localStorage.getItem("Workstation")
    var self = this;
    console.log(this.state.questions);
    if (this.state.workstations.length){
      if(this.state.questions.length){
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
     
        </h3>

        <ul>         
 
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
              this.getQuestionByUniqueDate(this.state.questions).map(function(questions, index) {
                 
                return (
                  
                 
                   
                    <Questions questions={questions}></Questions>
                   
                   
                );
              })}
         </div>
        </ul>
      </div>
    );
  
  }
  else if(!this.state.questions.length){
   return(

    <> <div>
    <h3 style={{ textAlign: "center" }}>
  
    </h3>
  
    <ul> 
  
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
  
  <div className="jumbotron">
                
                <li style = {{textAlign: "center"}}><b>This account has not completed any Workstation self-assessments</b> </li>
             </div>
    </ul>
  </div></>
  )
   

  }
  
  
  
  }else{
return(     <div>
  <h3 style={{ textAlign: "center" }}>

  </h3>

  <ul> 

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

<div className="jumbotron">
              
              <li style = {{textAlign: "center"}}><b>This account has no workstations assigned to it.
                 Please Navigate to the workstations segment of the profile page to create one</b> </li>
           </div>
  </ul>
</div>)


    }
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
    this.checker = this.checker.bind(this)
}
  
checker( ){
    this.setState({viewDetails : true})
    let workStation = window.localStorage.getItem("Workstation")
    let date = this.state.questions.Date
    let email = window.localStorage.getItem("User")

    fetch(`/show-questions-answered/${date}/${workStation}/${email}`)
    .then(recordset => recordset.json())
    .then(results => {
      this.setState({ selectedSet: results.recordset });
      console.log(this.state.selectedSet)   
    });
  alert(`${date} this is the boolena ${this.state.viewDetails}`)
}

  render() {
     console.log(`${this.state.previousDate} PREVIOUS DATE ${this.state.questions.Date}  DATE`)  

      if (!this.state.viewDetails){
      return (
          <div  >
          <button onClick = {this.checker}className= "btn btn-primary" style = {{float : "right"}}>View Details</button>
          
          <br />
     
          <li>  {this.state.questions.Date }</li>
          
        </div>
      );}
      else{
        return(<div  >
          <button onClick = {this.checker}className= "btn btn-primary" style = {{float : "right"}}>View Details</button>
          
          <br />
     
          <li>  {this.state.questions.Date }</li>
          
          
          {this.state.selectedSet &&
    this.state.selectedSet.map((item, index) => {
        return (
            <div >

            
        <li> <b>{item.QuestionWhenAnswered}</b> </li>
        <li>{item.QuestionResponse}</li>
        <li>{item.Accepted}</li>
        

        </div>
    );
    })}
 
        </div>

        )
      }
 
}}
 
 