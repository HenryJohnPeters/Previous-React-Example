import React, { useState , useEffect} from 'react';
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import UpdatePassword from "./UpdatePasswordForm";

function DisplayUserAcountDetails(){
  const[accountDetails,setAccountDetails]= useState([{}])


 useEffect(() => {
  var user = window.localStorage.getItem("User");
  if (user) {
    fetch(`/profile-account-details/${user}`)
      .then(recordset => recordset.json())
      .then(results => {
        setAccountDetails(results.recordset)
        
      });
  } else {
    alert("user not set");
  }
  

 },[])
if(!accountDetails[0].LastPasswordUpdate){
  return<>   <ul>
  {accountDetails &&
    accountDetails.map(function(AccountDetails, index) {
      return (
        <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
          <DisplayAddWorkstation />
          <h3>Password Details</h3>
          <li>Last Updated: n/a</li>

           <li></li>
        </div>
      );
    })}
</ul></>
}else if (accountDetails[0].LastPasswordUpdate){
  return<> <ul>{accountDetails &&
    accountDetails.map(function(AccountDetails, index) {
      return (
        <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
          <DisplayAddWorkstation />
          <h3>Password Details</h3>
          <li>Last Updated: {moment(AccountDetails.LastPasswordUpdate).format("LLL")} </li>

           <li></li>
        </div>
      );
    })}
    </ul>
 </>
}}
 

class DisplayUserAcountDetailss extends React.Component {
  constructor() {
    super();

    this.state = { AccountDetails: [] };
  }
  // sets the questions form sql into state for questions
  getItems() {
    var user = window.localStorage.getItem("User");
    if (user) {
      fetch(`/profile-account-details/${user}`)
        .then(recordset => recordset.json())
        .then(results => {
          this.setState({ AccountDetails: results.recordset });
        });
    } else {
      alert("user not set");
    }
  }
  //when the component mounts make the sql questions the
   componentDidMount() {
    this.setState({
      AccountDetails: this.getItems()
    });
    
     
  }

  render() {
    
  
      return (<>{this.state.AccountDetails}
    
    </>)
    // }else if (){
    //   return(<></>)

    // }
    // else{return<></>};
    //   // <>



      //   {this.state.AccountDetails ? (
      //     <ul>
      //       {this.state.AccountDetails &&
      //         this.state.AccountDetails.map(function(AccountDetails, index) {
      //           return (
      //             <div className="jumbotron">
      //               <DisplayAddWorkstation />
      //               <h3>Password Details</h3>
      //               <li>
                      
      //                 Last Updated: 
      //                 {
      //                 AccountDetails.LastPasswordUpdate == "NULL" ?
      //                  <>here </> 
      //                  : <> not here </> }

      //                 {/* { AccountDetails.LastPasswordUpdate == null
      //         ? <Button type="button" style={{ display: 'block' }}>itsnotshere </Button>
      //         : <Button type="button" style={{ display: 'none' }}>its here</Button>
      //       } */}


      //                 {/* {moment(AccountDetails.LastPasswordUpdate).format("LLL")} */}
      //                 {/* {AccountDetails.LastPasswordUpdate} */}
      //               </li>

      //                <li></li>
      //             </div>
      //           );
      //         })}
      //     </ul>
      // //   ) : (
      //     <ul>
      //       <div className="jumbotron">
      //         <h3>Password Detail</h3>
      //         <Link style={{ float: "right" }} to="/update-password-details">
      //           <button className="btn btn-primary">Update</button>
      //         </Link>
      //         <li> Last Updated: Account has not been updated</li>

      //         <li></li>
      //       </div>
      //     </ul>
      //   )}
      // </>
    
  }
}
export default DisplayUserAcountDetails;

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
    // console.log(this.state);

    return (
      <div className="header-container">
        <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={this.handleShow}
        >
          Update
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <UpdatePassword />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
