import React from "react";
 
import "../bootstrap.min.css";
import AdminHeader from "../PageDetails/Headers/HeaderAdmin";
 
import AdminWorkstations from "../AdminComponents/AdminDisplayQuestions/AdminViewWorkStationsDeclined";
// import Fade from "react-reveal";

function AdminViewWorkstations() {
  return (
    <div>
      <AdminHeader />
      {/* <Fade left> */}
        <AdminWorkstations />
      {/* </Fade> */}
    </div>
  );
}
export default AdminViewWorkstations;
 