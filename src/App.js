import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
// import RegisterPage from "./Components/Pages/RegisterPage";
import ConfirmRegisterPage from "./Components/Pages/ConfirmRegisterPage";
import ResetPassword from "./Components/Pages/ResetPasswordPage";
import Home from "./Components/Pages/HomePage";
import UserQuestions from "./Components/Pages/UserQuestionsPage";
import ConfirmEmail from "./Components/Pages/ConfirmEmail";
import ConfirmPassword from "./Components/Pages/ConfirmPasswordPage";
import ProfilePage from "./Components/Pages/ProfilePage";
import DisplayWorkStationMangmentPage from "./Components/Pages/DisplayWorkStationMangmentPage";
import History from "./Components/Pages/History";
import AdminCenter from "./Components/Pages/AdminCenter";
import AdminCenterViewUsers from "./Components/Pages/AdminCenterViewUsers";
import AdminViewWorkStationAssessmentsPage from "./Components/Pages/AdminViewWorkStationAssessmentsPage";
import AdminViewWorkStationAssessmentsDeclinedPage from "./Components/Pages/AdminViewWorkStationAssessmentsDeclinedPage";
import CompletedAssessmentLandingPage from "./Components/Pages/CompletedAssessmentLandingPage";
import AdminViewFullUserWSAResponses from "./Components/Pages/AdminViewFullUserWSAResponses";
import ViewFullUserWSAResponses from "./Components/Pages/ViewFullUserWSAResponses";

 

// import Parent from "./Components/Andys-examples/parent";

import AuthRoute from "./Routing/AuthRoute";
//import ResetAuthRoute from "./Routing/AuthRoute";

function App() {
  return (
    <div>
      <Routing></Routing>
    </div>
  );
}

const adminToken = window.localStorage.getItem("adminToken");
const AdminAuthRoute = ({ component: Component }) => (
  <Route
    render={props =>
      adminToken && adminToken !== undefined ? (
        <Component />
      ) : (
        <Redirect to="/home" />
      )
    }
  />
);

const resetToken = window.localStorage.getItem("resetToken");
const ResetAuthRoute = ({ component: Component }) => (
  <Route
    render={props =>
      resetToken && resetToken !== undefined ? (
        <Component />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

function Routing() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/test" component={Parent} /> */}
        <Route exact path="/reset" component={ResetPassword} />
        <Route exact path="/" component={LoginPage} />
        {/* <Route exact path="/Register" component={RegisterPage} /> */}
        <Route exact path="/confirm-email" component={ConfirmEmail} />
        <Route exact path="/register" component={ConfirmRegisterPage} />
        <ResetAuthRoute
          exact
          path="/confirm-Password"
          component={ConfirmPassword}
        />
        <AuthRoute
          exact
          path="/view-full-user-wsa-responses"
          component={ViewFullUserWSAResponses}
        />

 <AuthRoute exact path="/admin-view-full-user-wsa-responses" component={AdminViewFullUserWSAResponses} />
      
        <AuthRoute
          exact
          path="/completed-assessment"
          component={CompletedAssessmentLandingPage}
        />
        <AuthRoute
          exact
          path="/admin-center-view-users"
          component={AdminCenterViewUsers}
        />
        <AuthRoute
          exact
          path="/profile-display-work-stations"
          component={DisplayWorkStationMangmentPage}
        />
        <AdminAuthRoute exact path="/admin-center" component={AdminCenter} />
        <AuthRoute exact path="/profile" component={ProfilePage} />
        <AuthRoute exact path="/home" component={Home} />
        <AuthRoute exact path="/user-questions" component={UserQuestions} />
        <AuthRoute
          exact
          path="/user-questions/:mssg"
          component={UserQuestions}
        />
        <AuthRoute exact path="/user-history" component={History} />
        />
        {/* <AdminAuthRoute
          exact
          path="/admin-view-users"
          component={AdminViewUsers}
        /> */}
        <AdminAuthRoute
          exact
          path="/admin-view-workstation-assessments"
          component={AdminViewWorkStationAssessmentsPage}
        />
        <AdminAuthRoute
          exact
          path="/admin-view-workstation-assessments-declined"
          component={AdminViewWorkStationAssessmentsDeclinedPage}
        />
     
      </Switch>
    </BrowserRouter>
  );
}

export default App;
