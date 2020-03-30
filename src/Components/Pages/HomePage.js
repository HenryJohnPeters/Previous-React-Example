 
import logo from "../codestone logo.png";
import React, { useState, useEffect } from 'react';
import "../bootstrap.min.css";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import LogOutButton from "../PageDetails/Buttons/LogOutButton/LogOutButton";
import ProfileButton from "../PageDetails/Buttons/ProfileButton/ProfileButton";
import CompletedAssessments from "../PageDetails/CompletedAssessments/CompletedAssessments";
// import Fade from "react-reveal";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Header />
      <PageTitle />
      {/* <Fade left> */}
        <CompletedAssessments />
      {/* </Fade> */}
    </div>
  );
}
class PageTitle extends React.Component {
  render() {
    return (
      <div>
        {/* <Fade right> */}
          <h2 style={{ textAlign: "center" }}>Workstation Self-Assessments</h2>
        {/* </Fade> */}
      </div>
    );
  }
}

function Header(props) {

  const[workstations, setWorkstations] = useState([{}])

  useEffect(() => {
    var user = window.localStorage.getItem("User");
    if (user) {
      fetch(`/profile-work-station-detailss/${user}`)
        .then(recordset => recordset.json())
        .then(results => {
          console.log(results.recordset) 
          setWorkstations(results.recordset)
             console.log(workstations)    
          
        
        });
    }
    
  },[]);
   
   
 
  return (
    <div className="jumbotron" style={{   borderBottomStyle: "solid", borderColor: "LightGray",  }}>
      <div style={{ textAlign: "right" }}>
       
        <Dropdown>
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">

⚙️
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1"><ProfileButton/></Dropdown.Item>
    <Dropdown.Item href="#/action-2"><LogOutButton /> </Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>
        {/* <AdminButton /> */}
      </div>

      <div className="User-Menu" style ={{float: "left"}}></div>
      <img
        className="profile-image"
        alt="icon"
        src={logo}
        width="340"
        height="60"
      />
      <br />
        <br /> <DisplayAddWorkstation workstations={workstations}/> <br /> 
     
    </div>
  );
}
 

 

class DisplayAddWorkstation extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      show: false
    };
  }


componentDidMount(){
  window.localStorage.removeItem("Workstation")
 
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
  render() {
    if(this.props.workstations.length){
    return (
      <>
        <button
          className="btn btn-secondary"
          style={{ float: "left" }}
          onClick={this.handleShow}
        >
          Perform Workstation Self-Assessment
        </button>


        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton> Select Workstation</Modal.Header>
          <Modal.Body>

          {this.props.workstations.map(workstation => (

                <> 
           
               <Link onClick= {() => window.localStorage.setItem("Workstation", workstation.AssignedWorkstation)}
                  to={{
                    pathname: "./user-questions"
                }}> <button  className = "btn btn-primary" style = {{textAlign: "center", alignContent: "center" , width : "100%"}}>
                  <h4 style ={{color: "white"}}>{workstation.AssignedWorkstation}</h4>
            </button>   <br/> <br/></Link> 
              
            
        
                   </>
              ))}
 
          
          </Modal.Body>
        </Modal>
      </>
    )}else if (!this.props.workstations.length){
      return (<>
        <button
          className="btn btn-secondary"
          style={{ float: "left" }}
          onClick={this.handleShow}
        >
         Perform Workstation Self-Assessment
        </button>


        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton style ={{textAlign: "center", alignContent: "center" }}> Select Workstation</Modal.Header>
          <Modal.Body>
            <><p>This account has no workstaions allocated. Please create a workstation to perform a workstation self-assessment.</p>
            <Link to = "./profile-display-work-stations">
            <button className = "btn btn-primary" style = {{width : "100%"}}>add workstation</button>
            </Link>
            </>


           
 
          
          </Modal.Body>
        </Modal>
      </>)


    }
  }
}
export default Home;
