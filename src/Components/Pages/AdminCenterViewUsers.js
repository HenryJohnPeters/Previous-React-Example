import React, { useState, useEffect } from 'react';
 
import { Link } from "react-router-dom";
import "../bootstrap.min.css";
import AdminHeader from "../PageDetails/Headers/HeaderAdmin";
import moment from "moment";
 

function Home() {
  return (
    <div>
      <AdminHeader />

      <DisplayUsers />
    </div>
  );
}

 
export default Home;



function DisplayUsers(props) {
  const [users, setUsers] = useState([{}]);
  const [currentPage, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(4);
  const [pageNumbers, createPageNumber] = useState([]);
  const [loadingToken, setLoadingToken] = useState(null);

  const indexOfLastTodo = currentPage * usersPerPage;
  const indexOfFirstTodo = indexOfLastTodo - usersPerPage;
  const currentTodos = users.slice(indexOfFirstTodo, indexOfLastTodo);

  

  useEffect(() => {
    setLoadingToken(true);

    let user = window.localStorage.getItem("User");
    fetch(`/admin-view-users`)
      .then(recordset => recordset.json())
      .then(results => {
        setUsers(results.recordset);

        var pNumbers = [];
        for (
          let i = 1;
          i <= Math.ceil(results.recordset.length / usersPerPage);
          i++
        ) {
          pNumbers.push(i);
        }
        createPageNumber(pNumbers);
      });

    setLoadingToken(false);
  }, []);

  function handleClick(event) {
    setPage(Number(event.target.id));
  }

  
      return (
        <>
         <ul>
            <h2 style={{ textAlign: "center" }}>View Users</h2>
           </ul>
        
           <ul>
             <Link to="./admin-view-workstation-assessments">
               <button className="btn btn-secondary">
                 Workstation Self-Assessments
               </button>
             </Link>
            <Link to="./admin-center">
                          <button className="btn btn-secondary">Edit Questions</button>
             </Link>
             <button disabled className="btn btn-secondary">
               View Users
             </button></ul>
          {currentTodos.map(user => (
            
            <ul>
              {" "}
              {/* <div className="jumbotron" style={{ border: "solid", borderColor: "LightGray" }}> */}
 
                
                  <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
                     <li>
                       <b>User Name: </b>
                       {user.NameOfUser}
                     </li>{" "}
                  <li>
                     {" "}
                      <b>Unique ID: </b>
                       {user.RUId}
                     </li>
                     <li>
                       {" "}
                       <b>User Email: </b>
                       {user.Email}
                     </li>
                     <li>
                       <b>Contact Number: </b>
                       {user.ContactNumber}
                     </li>
                     <li>
                       <b>Last Login: </b>
                       {user.LastLogin ? <>{user.LastLogin}</> : <>Null</>}
                     </li>
                     <li>
                       <b>Last Password Update: </b> 
                       {user.LastPasswordUpdate ? <>{user.LastPasswordUpdate}</> : <>Null</>}
                     </li>
                   </div>
               
 
              {/* </div> */}
            </ul>
          ))}
          <div style={{ alignContent: "center", width: "10%" }}></div>
          <div style={{ textAlign: "center", alignContent: "center" }}>
            {" "}
            <b> Current Page </b>: {currentPage}
            <br />
            <div>
              {pageNumbers.map(number => (
                <button
                  className="btn btn-primary"
                  key={number}
                  id={number}
                  onClick={handleClick}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
          <br />
        </>
      );
   
    
  
  
}




// class DisplayUsers extends React.Component {
//   constructor() {
//     super();

//     this.state = { users: [] };
//   }
//   componentDidMount() {
//     this.setState({
//       users: this.getItems()
//     });
//   }

//   getItems() {
//     try {
//       fetch("/admin-view-users")
//         .then(recordset => recordset.json())
//         .then(results => {
//           console.log(results.recordset);
//           this.setState({ users: results.recordset });
//         });
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   render() {
//     console.log(this.state.users);
//     return (
//       <>
       
//           <ul>
//             <h2 style={{ textAlign: "center" }}>View Users</h2>
//           </ul>
        
//           <ul>
//             <Link to="./admin-view-workstation-assessments">
//               <button className="btn btn-secondary">
//                 Workstation Self-Assessments
//               </button>
//             </Link>
//             <Link to="./admin-center">
//               <button className="btn btn-secondary">Edit Questions</button>
//             </Link>
//             <button disabled className="btn btn-secondary">
//               View Users
//             </button>

//             {this.state.users &&
//               this.state.users.map(function(user, index) {
//                 return (
//                   <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
//                     <li>
//                       <b>User Name: </b>
//                       {user.NameOfUser}
//                     </li>{" "}
//                     <li>
//                       {" "}
//                       <b>Unique ID: </b>
//                       {user.RUId}
//                     </li>
//                     <li>
//                       {" "}
//                       <b>User Email: </b>
//                       {user.Email}
//                     </li>
//                     <li>
//                       <b>Contact Number: </b>
//                       {user.ContactNumber}
//                     </li>
//                     <li>
//                       <b>Last Login: </b>
//                       {user.LastLogin ? <>{user.LastLogin}</> : <>Null</>}
//                     </li>
//                     <li>
//                       <b>Last Password Update: </b> 
//                       {user.LastPasswordUpdate ? <>{user.LastPasswordUpdate}</> : <>Null</>}
//                     </li>
//                   </div>
//                 ); 
//               })}
//           </ul>{" "}
      
//       </>
//     );
//   }
// }
