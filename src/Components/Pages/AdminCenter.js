import React from "react";
import "../bootstrap.min.css";
import AdminHeader from "../PageDetails/Headers/HeaderAdmin";
import AdminDisplayQuestions from "../AdminComponents/AdminDisplayQuestions/AdminDisplayQuestions";
 

function Home() {
  return (
    <div>
      <AdminHeader/>
      <AdminDisplayQuestions />
    </div>
  );
}
 

export default Home;
