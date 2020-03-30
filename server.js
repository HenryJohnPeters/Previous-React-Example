const express = require("express");
const sql = require("mssql");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
var cors = require("cors");
var nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

app.use(cors());

var config = {
  user: "sa",
  password: "Mypassword123",
  server: "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: "CDA"

  //enableArithAbort: false
};

app.use(bodyParser.json());
var nodemailer = require("nodemailer");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/admin-view-users", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err + "initial connection");
    console.log(config.server);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("select * from RegisteredUsers ", function(err, recordset) {
      if (err) console.log(err);

      // send records as a response

      res.json(recordset);
    });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/profile-account-details/:email", async (req, res) => {
  console.log("!called");
  // var Email = req.body.email;
  await sql.connect(config);

  var Email = req.params.email;
  console.log(Email);
  if (Email) {
    await sql.connect(config, function(err) {
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
      request.input("Email", sql.VarChar, Email);
      // query to the database and get the records
      request.execute("dbo.GetUserAccountDetails", function(err, recordset) {
        if (err) console.log(err);
        // send records as a response
        res.json(recordset);
      });
    });
  } else {
    res.statusCode = 400;
    res.statusMessage = "bad request";
    res.json({ message: "Email Missing" });
  }
  // connect to your database
});

//////////////////////////////////////////////////////////////////////////
// app.get("/user-completed-questions/:Email", async (req, res) => {
//   // connect to your database
//   try {
//     let Email = req.params.Email;
//     // let WorkStation = req.params.Workstation;
//     console.log(`WorkStation express end ${Email}`);
//     await sql.connect(config);

//     // create Request object
//     var request = new sql.Request();

//     // query to the database and get the records
//     // request.input("WorkStation", sql.NVarChar, WorkStation);
//     request.input("Email", sql.NVarChar, Email);
//     request.execute("dbo.ViewWorkStations", function(err, recordset) {
//       if (err) console.log(err);
//       // send records as a response
//       res.json(recordset);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// });
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//this should be assessments
app.get("/admin-completed-workstations", async (req, res) => {
  // connect to your database
  try {
    // let WorkStation = req.params.Workstation;

    await sql.connect(config);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.input("WorkStation", sql.NVarChar, WorkStation);

    request.execute("dbo.AdminCompletedQuestions", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.log(e);
  }
});
/////////////////////////////////////////////
app.get("/user-completed-WSA/:user", async (req, res) => {
  // connect to your database
  try {
    // let WorkStation = req.params.Workstation;
    let Email = req.params.user;

    await sql.connect(config);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.input("WorkStation", sql.NVarChar, WorkStation);
    request.input("Email", sql.NVarChar, Email);
    request.execute("dbo.UserCompletedWSA", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.log(e);
  }
});

//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//this should be assessments
app.get("/g", async (req, res) => {
  // connect to your database
  try {
    let responseId = req.body.responseId;
    await sql.connect(config);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.input("WorkStation", sql.NVarChar, WorkStation);
    request.input("ResponseId", sql.NVarChar, responseId);
    request.execute("dbo.GetWSAResponses", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.log(e);
  }
  console.log("done");
});
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//this

app.get("/admin-in-progress-WSA", async (req, res) => {
  // connect to your database
  try {
    // let WorkStation = req.params.Workstation;

    await sql.connect(config);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.input("WorkStation", sql.NVarChar, WorkStation);

    request.execute("dbo.AdminPendingQuestions", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.log(e);
  }
});
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
app.get("/show-questions-answered/:date/:email", (req, res) => {
  // connect to your database
  let date = req.params.date;

  let email = req.params.email;

  sql.connect(config);

  // create Request object
  var request = new sql.Request();

  // query to the database and get the records

  request.input("Date", sql.Date, date);
  request.input("Email", sql.NVarChar, email);
  request.execute("dbo.ShowQuestionsAnswered", function(err, recordset) {
    if (err) console.log(err);
    // send records as a response
    res.json(recordset);

    console.info(`recordset ${recordset}`);
  });
});
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
app.get("/showquestions-answered/:responseId", async (req, res) => {
  // connect to your database
  let responseId = req.params.responseId;

  await sql.connect(config);

  // create Request object
  var request = new sql.Request();

  // query to the database and get the records

  request.input("ResponseId", sql.Int, responseId);

  request.execute("dbo.GetWSAResponses", async function(err, recordset) {
    if (err) console.log(err);
    // send records as a response
    res.json(recordset);

    console.info(`recordset ${recordset}`);
  });
});
// ///////////////////////////////////////////////////////////////////////////////////
// app.get(
//   "/admin-show-workstations-Details/:date/:RUId/:completeToken/:workstation",
//   async (req, res) => {
//     // connect to your database
//     let RUId = req.params.RUId;
//     let workstation = req.params.workStation;
//     let completeToken = req.params.completeToken;
//     let date = req.params.date;

//     await sql.connect(config);

//     // create Request object
//     var request = new sql.Request();

//     // query to the database and get the records

//     request.input("Workstation", sql.NVarChar, workstation);
//     request.input("RUId", sql.Int, RUId);
//     request.input("CompleteToken", sql.NVarChar, completeToken);
//     request.input("Date", sql.Date, date);
//     request.execute("dbo.AdminShowWorkstationsDetails", function(
//       err,
//       recordset
//     ) {
//       if (err) console.log(err);
//       // send records as a response
//       res.json(recordset);

//       console.info(`recordset ${recordset}`);
//     });
//   }
// );
// ///////////////////////////////////////////////////////////////////////////////////
app.get("/user-completed-Assessment/:Workstation/:Email", async (req, res) => {
  // connect to your database
  let Email = req.params.Email;
  let WorkStation = req.params.Workstation;
  console.log(`WorkStation express end ${Email}`);
  await sql.connect(config);

  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.input("WorkStation", sql.NVarChar, WorkStation);
  request.input("Email", sql.NVarChar, Email);
  request.execute("dbo.ViewAnsweredQuestions", function(err, recordset) {
    if (err) console.log(err);
    // send records as a response
    res.json(recordset);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/profile-work-station-detailss/:email", async (req, res) => {
  console.log("!called");
  // var Email = req.body.email;

  var Email = req.params.email;
  console.log(Email);
  if (Email) {
    await sql.connect(config, function(err) {
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
      request.input("Email", sql.VarChar, Email);
      // query to the database and get the records
      request.execute("dbo.GetWorkStations", function(err, recordset) {
        if (err) console.log(err);
        // send records as a response
        res.json(recordset);
      });
    });
  } else {
    res.statusCode = 400;
    res.statusMessage = "bad request";
    res.json({ message: "Email Missing" });
  }
  // connect to your database
});

////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/post-question-answers", async (req, res) => {
  console.log("!called");
  try {
    await sql.connect(config);

    // create Request object

    let selectedWorkstation = req.body.selectedWorkstation;
    console.info(selectedWorkstation + "check this");

    var request = new sql.Request();
    request.input(`SelectedWorkstation`, sql.NVarChar, selectedWorkstation);
    let existingWSA = await request.execute("dbo.CheckIfWSAExists");
    if (!existingWSA.recordset.length) {
      console.info("hello from first if");
      let user = req.body.user;
      let results = req.body.results;
      let completeToken = req.body.completeToken;
      let date = req.body.date;

      let questions = [];
      let answers = [];
      // let emails = [];
      let questionIds = [];
      let suggestedSoloutions = [];

      results.forEach(element => answers.push(element.answer));
      results.forEach(element => questions.push(element.question));
      // results.forEach(element => emails.push(element.email));
      results.forEach(element => questionIds.push(element.questionId));
      results.forEach(element =>
        suggestedSoloutions.push(element.suggestedSoloution)
      );

      var request = new sql.Request();
      request.input(`QuestionStatus`, sql.NVarChar, completeToken);
      request.input(`Date`, sql.NVarChar, date);
      request.input(`Email`, sql.NVarChar, user);
      request.input(`SelectedWorkstation`, sql.NVarChar, selectedWorkstation);
      let result = await request.execute("dbo.AddQuestionResponseHeader");

      console.log("HERE");
      console.log(result);
      if (result.hasOwnProperty("recordset") && result.recordset.length) {
        var recordsetRow = result.recordset[0];

        if (recordsetRow.hasOwnProperty("createdId")) {
          var id = recordsetRow.createdId;
          console.log(id);

          for (var i = 0; i < results.length; i++) {
            var request = new sql.Request();
            let answer = answers[i];
            let question = questions[i];
            // let email = emails[i];
            let questionId = questionIds[i];
            let soloution = suggestedSoloutions[i];

            request.input(`WSAId`, sql.Int, id);
            request.input(`Question`, sql.NVarChar, question);
            request.input(`Answer`, sql.NVarChar, answer);
            request.input(`Email`, sql.NVarChar, user);
            request.input(`QuestionId`, sql.NVarChar, questionId);
            // request.input(`CompleteToken`, sql.NVarChar, completeToken);
            request.input(
              `SelectedWorkstation`,
              sql.NVarChar,
              selectedWorkstation
            );
            request.input(`SuggestedSoloution`, sql.NVarChar, soloution);

            request.execute("dbo.SubmitQuestionResponses", function(
              err,
              recordset
            ) {
              if (err) console.log(err);
            });
          }
          res.json({
            AccountValidationMessage: "Added to database"
          });
        } else {
          console.log("unexpected result format");
          res.json({
            AccountValidationMessage: "unexpected result format"
          });
        }
      } else {
        console.log("No results found");
        res.json({
          AccountValidationMessage: "No results found"
        });
      }
    } else {
      console.info("This account exists");

      res.json({
        AccountValidationMessage:
          "This Workstation currently has an assessment in progress. This has NOT been added to the database please complete or edit In progress Assesment for this workstation"
      });
    }
  } catch (e) {
    console.log(e);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
app.get("/user-questions", async (req, res) => {
  // connect to your database
  await sql.connect(config);

  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.execute("dbo.ViewQuestions", function(err, recordset) {
    if (err) console.log(err);
    // send records as a response
    res.json(recordset);
  });
});

////////////////////////////////////////////////////////////////////////
app.post("/login", async (req, response) => {
  try {
    console.info("express work")
    var connectionok = true;
    await sql.connect(config).catch(err => {
      console.log("connection error ", err);
      connectionok = false;
    });
    if (connectionok) {
      var request = new sql.Request();
      var Email = req.body.email;
      var Password = req.body.password;
      var AccountValidationMessage = "";
      var LastLogin = req.body.date;

      let token = "";
      let adminToken = "";
      console.log({ Email, Password });

      request.input("Email", sql.VarChar, Email);

      let result = await request.execute("dbo.CheckEmailExists");

      if (result.recordsets[0].length > 0) {
        console.info("This email exists");
        request.input("Password", sql.VarChar, Password);
        let result = await request.execute("dbo.LoginUser");

        if (result.recordsets[0].length > 0) {
          console.info("/login: login successful..");
          console.log(req.body);

          request.input("LastLogin", sql.DateTime, LastLogin);

          await request.execute("dbo.AddLastLoginToRegisteredUsers");

          let result = await request.execute("dbo.FindAdmin");
          if (result.recordsets[0].length > 0) {
            console.info("This is a admin account");
            adminToken = jwt.sign({ user: Email }, "SECRET_KEY", {
              //////
              expiresIn: 3600000 ////////
            });
          } else {
            console.info("this aint a admin account but you get a login token"); //////
            token = jwt.sign({ user: Email }, "SECRET_KEY", {
              //////
              expiresIn: 3600000 ////////
            });
          }

          response.status(200).json({
            ok: true,
            user: Email,
            jwt: token,
            adminJwt: adminToken
          });
        } else {
          console.info("Incorrect Password");
          AccountValidationMessage = "Incorrecrt password to account";
          response.status(409).json({
            AccountValidationMessage: AccountValidationMessage
          });
        }
      } else {
        console.log("Email does not exists");
        AccountValidationMessage = "Email does not exists";
        response.status(409).json({
          AccountValidationMessage: AccountValidationMessage
        });
      }
    } else {
      throw new "connection error: went bang!"();
    }
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/reset-password-email", async (req, response) => {
  var Email = req.body.email;

  var EmailValidation = "";

  await sql.connect(config);
  var request = new sql.Request();

  request.input("Email", sql.VarChar, Email);
  let result = await request.execute("dbo.CheckEmailExists");

  if (result.recordsets[0].length > 0) {
    console.log("well done this does not exist ");
    EmailValidation =
      "An Email to reset your password has been sent to your inbox";

    const token = jwt.sign({ user: Email }, "the password", {
      expiresIn: 3600000
    });

    console.log({ Email });

    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hpf9703@gmail.com",
        pass: "Cows4422"
      },tls: {
        rejectUnauthorized: false
    }
    });
    const url = `http://localhost:3000/confirm-Password`;

    var mailOptions = {
      from: "CodeStoneDeskAssessment@outlook.com",
      to: `${Email}`,
      subject: "Reset Password for Codestone workstation self-assessment",

      html: `Please click this link to confirm your password reset: <a href = "${url}">${url} </a>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    response.status(200).json({
      ok: true,
      user: Email,
      jwt: token,
      EmailAvailability: EmailValidation
    });
  } else {
    console.log("This email does not exist ");
    EmailValidation = "Please enter an Email address that exists in the system";
    response.json({
      EmailAvailability: EmailValidation
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/submit-WSA-Response-Admin", async (req, response) => {
  let responseId = req.body.responseId;
  let adminResponse = req.body.response;
  let date = req.body.date;
  let seenStatus = req.body.seenStatus;
  let email = req.body.email;
  let questionWhenAnswered = req.body.questionWhenAnswered;
  let url = "http://localhost:3000/home";
  
  let name = req.body.name;
  let WSAId = req.body.WSAId;
  let thisIsAUserToken = req.body.thisIsAUserToken;
  let admins = req.body.Admins;
  let adminList = []

  admins.forEach(i => adminList.push(i.Email));

  await sql.connect(config);
  var request = new sql.Request();
  request.input("ResponseId", sql.Int, responseId);
  request.input("Response", sql.NVarChar, adminResponse);
  request.input("Date", sql.DateTime, date);
  request.input("SeenStatus", sql.Bit, seenStatus);
  request.input("Name", sql.NVarChar, name);

  await request.execute("dbo.SubmitNoteAdmin");
  console.info("note submitted");

  var request = new sql.Request();
  request.input("WSAId", sql.Int, WSAId);
  request.input("SeenStatus", sql.Bit, seenStatus);


  await request.execute("dbo.UpdateHeaderSeenStatus");
  console.info("seen status updated")
  console.info("this is admin list " + adminList)
  if(!thisIsAUserToken){

  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hpf9703@gmail.com",
      pass: "Cows4422"
    },tls: {
      rejectUnauthorized: false
  }
  });

  var mailOptions = {
    from: "CodeStoneDeskAssessment@outlook.com",
    to: `${email}`,
    subject: `Update on Workstation Self-Assessment question.`,

    html: `
    Response added by admin for WSA .<br/>
     <b>Question</b> : "${questionWhenAnswered}"<br>
     <b>Response</b> : "${adminResponse}"<br>
    Click this link to view your completed assessments <a href = "http://localhost:3000/admin-view-workstation-assessments">http://localhost:3000/admin-view-workstation-assessments </a>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  }else if (thisIsAUserToken){
  for (let i = 0 ; adminList.length > i; i++){
     
    
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hpf9703@gmail.com",
      pass: "Cows4422"
    },tls: {
      rejectUnauthorized: false
  }
  });

  var mailOptions = {
    from: "CodeStoneDeskAssessment@outlook.com",
    to: `${adminList[i]}`,
    subject: `Update on Workstation Self-Assessment from ${name}`,

    html: `
    Response added by user (${name}) for WSA .<br/>
     <b>Question</b> : "${questionWhenAnswered}"<br>
     <b>Response</b> : "${adminResponse}"<br>
    Click this link to view your completed assessments <a href = "http://localhost:3000/admin-view-workstation-assessments">http://localhost:3000/admin-view-workstation-assessments </a>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}}
});

app.post("/get-completed-questions", async (req, res) => {
  try {
    let WSAId = req.body.WSAId;
    await sql.connect(config);
    var request = new sql.Request();
    request.input("WSAId", sql.Int, WSAId);
    request.execute("dbo.AdminGetAnsweredQuestionsComplete", function(
      err,
      recordset
    ) {
      if (err) console.log(err);
   
      res.json(recordset);
    });
  } catch (e) {
    console.info(e);
  }
});

////////////////////////////////////////////////////////////////
app.post("/get-WSA-header", async (req, res) => {
  try {
    await sql.connect(config);
    let WSAId = req.body.WSAId;

    var request = new sql.Request();

    request.input("WSAId", sql.Int, WSAId);
    request.execute("dbo.AdminGetWSAHeaderComplete", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.info(e);
  }
});
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
app.post("/get-admins", async (req, res) => {
  try {
    await sql.connect(config);
    let adminBit = req.body.adminBit;

    var request = new sql.Request();

    request.input("AdminBit", sql.Int, adminBit);
    request.execute("dbo.GetAdmins", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.info(e);
  }
});
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
app.post("/get-user-name-for-response", (req, res) => {
  try {
    sql.connect(config);
    let email = req.body.email;

    var request = new sql.Request();

    request.input("Email", sql.NVarChar, email);
    request.execute("dbo.GetUserName", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.info(e);
  }
});
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
app.post("/get-WSA-responses", async (req, res) => {
  try {
    await sql.connect(config);
    let responseId = req.body.responseId;
    // let RUId = req.body.RUId;
    // let workstation = req.body.Workstation;

    // console.log("RUID + WORKSTAION" + RUId + workstation);

    var request = new sql.Request();

    // request.input("RUId", sql.Int, RUId);
    // request.input("Workstation", sql.Bit, workstation);
    request.input("ResponseId", sql.Int, responseId);
    request.execute("dbo.GetWSAResponses", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.info(e);
  }
});
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/admin-get-notes", async (req, res) => {
  try {
    console.log("we made it ");

    (UserRUId = req.body.UserRUId),
      (workstation = req.body.workstation),
      await sql.connect(config);
    var request = new sql.Request();

    request.input("UserRUId", sql.Int, UserRUId);
    request.input("Workstation", sql.NVarChar, workstation);

    request.execute("dbo.GetAdminWorkstationNotes", function(err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);
    });
  } catch (e) {
    console.info(e);
  }
});

////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/delete-work-station", async (req, response) => {
  try {
    await sql.connect(config);
    let workstationId= req.body.workstationId;

     
    var request = new sql.Request();

    request.input("WSId", sql.Int, workstationId);

    await request.execute("dbo.DeleteWorkStations");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
/////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/delete-question", async (req, response) => {
  try {
    await sql.connect(config);
    let questionId = req.body.questionId;
    let question = req.body.question;

    var request = new sql.Request();

    request.input("QuestionId", sql.Int, questionId);
    request.input("Question", sql.NVarChar, question);

    await request.execute("dbo.DeleteQuestion");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/register", async (req, response) => {
  try {
    console.info("made it here")
    await sql.connect(config);
    let Email = req.body.email;
    let PasswordHash = req.body.password;
    let ContactNumber = req.body.contactNumber;
    let NameOfUser = req.body.name;

    var request = new sql.Request();

    request.input("Email", sql.NVarChar, Email);
    let result = await request.execute("dbo.CheckEmailExists");

    if (result.recordsets[0].length > 0) {
      console.info("This email exists");
    // let  error = "This email already has an account";
    let accountExistsBool = true;
      response.status(409).json({
        // error: error,
        accountExistsBool : accountExistsBool 
      }); 
    } else {
      console.log("Email does not exists");
    // let  error = "Email does not exists";
    let accountExistsBool = false;
      response.status(409).json({
        // error: error,
        accountExistsBool :accountExistsBool 
      }); 
    request.input("ContactNumber", sql.VarChar, ContactNumber);
    request.input("NameOfUser", sql.VarChar, NameOfUser);
    request.input("PasswordHash", sql.NVarChar, PasswordHash);
    let register = await request.execute("dbo.RegisterUser");
    console.info("User signed up")

      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var transporter = nodemailer.createTransport({
      
      service: "Gmail",
      auth: {
        user: "hpf9703@gmail.com",
        pass: "Cows4422"
      },tls: {
        rejectUnauthorized: false
    }
    });
     
    var mailOptions = {
      from: "hpf9703@gmail.com",
      to: `${Email}`,
      subject: "Codestone Workstation Self-Assessment account created",

      html: `To perform a workstation self-assessment  <a href = "http://localhost:3000/">Click Here </a>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    }
 
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/register-email", async (req, response) => {
  var Email = req.body.email;
  var Errors = "";
  await sql.connect(config);
  var request = new sql.Request();

  request.input("Email", sql.VarChar, Email);
  let result = await request.execute("dbo.CheckEmailExists");

  if (result.recordsets[0].length > 0) {
    Errors = "This user already exists";

    response.status(409).json({
      error: Errors
    });

    console.info("This email already exists");
    console.log(req.body);
  } else {
    console.log({ Email });
    Errors = "Check your email inbox for the response";

    console.info("An email has been sent to your inbox");

    const token = jwt.sign({ user: Email }, "register-email", {
      expiresIn: 3600000
    });

    response.status(200).json({
      ok: true,
      user: Email,
      jwt: token,
      error: Errors
    });

    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hpf9703@gmail.com",
        pass: "Cows4422"
      }
    });
    const url = `http://localhost:3000/confirm-register`;

    var mailOptions = {
      from: "CodeStoneDeskAssessment@outlook.com",
      to: `${Email}`,
      subject: "Register for Codestone desk assesment",

      html: `Please click this link to create your account: <a href = "${url}">${url} </a>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/update-response-to-confirmed", async (req, response) => {
  try {
    await sql.connect(config);
    let WSAId = req.body.WSAId;
    let responseId = req.body.responseId;
    // let amountOfQuestions = req.body.amountOfQuestions;
    let email = req.body.email;
    let questionWhenAnswered = req.body.questionWhenAnswered;
    let userName = req.body.userName;
    let workstation = req.body.workstation;

    var request = new sql.Request();
    console.log(WSAId);

    request.input("ResponseId", sql.Int, responseId);
    await request.execute("dbo.UpdateResponseToConfirmed");

    var request = new sql.Request();
    request.input("WSAId", sql.Int, WSAId);
    let result = await request.execute("dbo.GetCompletedWSAlength");

    console.info(result.recordset.length);

    if (result.recordset.length == 0) {
      var request = new sql.Request();
      console.info("correct results");
      const responseId = req.body.responseId;

      request.input("WSAId", sql.Int, WSAId);
      await request.execute("dbo.UpdateWSAToCompleted");

      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "hpf9703@gmail.com",
          pass: "Cows4422"
        }
      });

      var mailOptions = {
        from: "CodeStoneDeskAssessment@outlook.com",
        to: `${email}`,
        subject: `Assesment completed`,

        html: `
        Hi ${userName},<br>
        The Workstaion Self-Assessment status has been set to completed for the workstation <b>${workstation}</b>.
        If any new issues arrise for this workstaion please complete a new workstation self-assessment.
        <br>
        <br>
        Click this link to see your  workstation self-assessments :<a href = http://localhost:3000/home>http://localhost:3000/home </a>`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } else {
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "hpf9703@gmail.com",
          pass: "Cows4422"
        }
      });

      var mailOptions = {
        from: "CodeStoneDeskAssessment@outlook.com",
        to: `${email}`,
        subject: `Accepted soloution for Workstation self assessment`,

        html: `
        Hi ${userName},<br>
        A soloution has been accepted for "${questionWhenAnswered}" for the workstation "${workstation}".<br>
        

        <br>
        Click this link to see your  workstation self-assessments :<a href = http://localhost:3000/home>http://localhost:3000/home </a>`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

// app.post("/update", async (req, response) => {

//     await sql.connect(config);
//     const responseId = req.body.responseId;
//     var request = new sql.Request();

//     request.input("ResponseId", sql.Int, responseId);
//     const result = await request.execute("dbo.UpdateResponseToConfirmed");

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/password-confirm", async (req, response) => {
  try {
    await sql.connect(config);
    let Email = req.body.email;
    let PasswordHash = req.body.password;
    let UserEmail = req.body.email;

    var request = new sql.Request();

    request.input("Email", sql.VarChar, Email);
    let result = await request.execute("dbo.CheckEmailExists");

    if (result.recordsets[0].length > 0) {
      console.info("Email found");
      console.log(req.body.email);
      request.input("UserEmail", sql.NVarChar, UserEmail);
      request.input("PasswordHash", sql.NVarChar, PasswordHash);
      await request.execute("dbo.PasswordUpdate");
    } else {
      console.info("This Email does not exist");

      console.log({ UserEmail, PasswordHash });
    }
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
//////////////////////////////////////////////////////////////////////////

app.post("/update-account-details", async (req, response) => {
  try {
    await sql.connect(config);
    let CurrentEmail = req.body.currentEmail;
    let Email = req.body.email;

    let ContactNumber = req.body.contactNumber;
    let NameOfUser = req.body.name;

    var request = new sql.Request();

    request.input("CurrentEmail", sql.VarChar, CurrentEmail);
    request.input("ContactNumber", sql.VarChar, ContactNumber);
    request.input("NameOfUser", sql.VarChar, NameOfUser);
    request.input("Email", sql.VarChar, Email);

    const update = await request.execute("dbo.UpdateAccountDetails");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/add-workstation", async (req, response) => {
  try {
    await sql.connect(config);
    var request = new sql.Request();
    const email = req.body.email;
    const location = req.body.location;
    let dateAdded = req.body.date;

    

     
    request.input("Email", sql.NVarChar, email);
    request.input("Location", sql.NVarChar, location);
    const results = await request.execute("dbo.CheckIfWorkstationExists");


    if (results.recordsets[0].length > 0) {
      console.info("this exists already")
      const AccountValidationMessage = false
      response.status(409).json({
        AccountValidationMessage: AccountValidationMessage
      });

    }else {
      const AccountValidationMessage = true
      response.status(409).json({
        AccountValidationMessage: AccountValidationMessage
      });
      console.info("this does not exist well done")
     
     
    request.input("Date", sql.DateTime, dateAdded);

    const result = await request.execute("dbo.FindRuidAddWorkstationDetails");

    }


    
 

  
    var request = new sql.Request();

   
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
//////////////////////////////////////////////////////////////////////////

app.post("/admin-update-question", async (req, response) => {
  try {
    await sql.connect(config);
    let QuestionId = req.body.QuestionId;
    let QuestionUpdate = req.body.QuestionUpdate;
    //let date = req.body.QuestionUpdate;

    var request = new sql.Request();

    request.input("QuestionId", sql.Int, QuestionId);
    request.input("QuestionUpdate", sql.NVarChar, QuestionUpdate);
    //request.input("Date", sql.DateTime, date);

    const update = await request.execute("dbo.UpdateQuestions");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

app.post("/admin-update-question-guidance-notes", async (req, response) => {
  try {
    await sql.connect(config);
    let QuestionId = req.body.QuestionId;
    let QuestionGuidanceNoteUpdate = req.body.QuestionGuidanceNoteUpdate;

    var request = new sql.Request();

    request.input("QuestionId", sql.Int, QuestionId);
    request.input(
      "QuestionGuidanceNoteUpdate",
      sql.NVarChar,
      QuestionGuidanceNoteUpdate
    );
    //request.input("Date", sql.DateTime, date);

    const update = await request.execute("dbo.UpdateGuidanceNotes");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

//////////////////////////////////////////////////////////////////////////

app.post("/admin-add-question", async (req, response) => {
  try {
    await sql.connect(config);
    let NewQuestion = req.body.Question;
    let NewGuidanceNote = req.body.GuidanceNote;

    var request = new sql.Request();

    request.input("Question", sql.NVarChar, NewQuestion);
    request.input("GuidanceNote", sql.NVarChar, NewGuidanceNote);

    await request.execute("dbo.AddQuestion");

    console.log(NewGuidanceNote);
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

app.post("/admin-edit-question", async (req, response) => {
  try {
    await sql.connect(config);
    let NewQuestion = req.body.Question;
    let NewGuidanceNote = req.body.GuidanceNote;
    let previousQuestion = req.body.previousQuestion;
    let previousGuidanceNote = req.body.previousGuidanceNote;

    console.log(
      NewGuidanceNote + NewQuestion + previousQuestion + previousGuidanceNote
    );

    var request = new sql.Request();

    request.input("Question", sql.NVarChar, NewQuestion);
    request.input("GuidanceNote", sql.NVarChar, NewGuidanceNote);
    request.input("PreviousQuestion", sql.NVarChar, previousQuestion);
    request.input("PreviousGuidanceNote", sql.NVarChar, previousGuidanceNote);

    await request.execute("dbo.EditQuestion");

    console.log(NewGuidanceNote);
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

/////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////

app.post("/declined-question-response", async (req, response) => {
  try {
    await sql.connect(config);
    let QuestionId = req.body.QuestionId;
    let QuestionAnswer = req.body.QuestionAnswer;
    let date = req.body.date;
    let User = req.body.User;
    let WorkStation = req.body.WorkStation;

    console.info("WorkStation");
    console.info(WorkStation);
    console.info("QuestionId");
    console.info(QuestionId);
    console.info("QuestionAnswer");
    console.info(QuestionAnswer);
    console.info("date");
    console.info(date);
    console.info("User");
    console.info(User);

    var request = new sql.Request();

    request.input("QuestionId", sql.NVarChar, QuestionId);
    request.input("QuestionAnswer", sql.NVarChar, QuestionAnswer);
    request.input("Date", sql.DateTime, date);
    request.input("Email", sql.NVarChar, User);
    request.input("WorkStation", sql.NVarChar, WorkStation);

    //QuestionResponse
    const updateQuestion = await request.execute("dbo.QuestionResponse");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

app.post("/password-profile-update", async (req, response) => {
  try {
    await sql.connect(config);
    let Email = req.body.email;
    let Password = req.body.password;
    let date = req.body.date;

    var request = new sql.Request();

    request.input("Email", sql.NVarChar, Email);
    request.input("Password", sql.NVarChar, Password);
    request.input("Date", sql.DateTime, date);

    const update = await request.execute("dbo.PasswordProfileUpdate");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
app.listen(port, () => console.log(`Server running on port ${port}`));
