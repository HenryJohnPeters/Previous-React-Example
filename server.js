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
app.get("/user-completed-questions/:Email", async (req, res) => {
  // connect to your database
  try {
    let Email = req.params.Email;
    // let WorkStation = req.params.Workstation;
    console.log(`WorkStation express end ${Email}`);
    await sql.connect(config);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.input("WorkStation", sql.NVarChar, WorkStation);
    request.input("Email", sql.NVarChar, Email);
    request.execute("dbo.ViewWorkStations", function(err, recordset) {
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
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//this should be assessments
app.get("/g", async (req, res) => {
  console.log("hi from express");
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
// app.get("/admin-Pending-workstations", async (req, res) => {
//   // connect to your database
//   try {
//     // let WorkStation = req.params.Workstation;

//     await sql.connect(config);

//     // create Request object
//     var request = new sql.Request();

//     // query to the database and get the records
//     // request.input("WorkStation", sql.NVarChar, WorkStation);

//     request.execute("dbo.AdminPendingQuestions", function(err, recordset) {
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

  request.execute("dbo.GetWSAResponses", function(err, recordset) {
    if (err) console.log(err);
    // send records as a response
    res.json(recordset);

    console.info(`recordset ${recordset}`);
  });
});
///////////////////////////////////////////////////////////////////////////////////
app.get(
  "/admin-show-workstations-Details/:date/:RUId/:completeToken/:workstation",
  async (req, res) => {
    // connect to your database
    let RUId = req.params.RUId;
    let workstation = req.params.workStation;
    let completeToken = req.params.completeToken;
    let date = req.params.date;

    await sql.connect(config);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records

    request.input("Workstation", sql.NVarChar, workstation);
    request.input("RUId", sql.Int, RUId);
    request.input("CompleteToken", sql.NVarChar, completeToken);
    request.input("Date", sql.Date, date);
    request.execute("dbo.AdminShowWorkstationsDetails", function(
      err,
      recordset
    ) {
      if (err) console.log(err);
      // send records as a response
      res.json(recordset);

      console.info(`recordset ${recordset}`);
    });
  }
);
///////////////////////////////////////////////////////////////////////////////////
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
    let user = req.body.user;
    console.log(`${user} this is the user email `);
    let selectedWorkstation = req.body.selectedWorkstation;
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
      } else {
        console.log("unexpected result format");
      }
    } else {
      console.log("No results found");
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
  const result = await request.execute("dbo.CheckEmailExists");

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
      }
    });
    const url = `http://localhost:3000/confirm-Password`;

    var mailOptions = {
      from: "CodeStoneDeskAssessment@outlook.com",
      to: `${Email}`,
      subject: "Reset Password Codestone Desk Assment",

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
  (responseId = req.body.responseId),
    (response = req.body.response),
    (date = req.body.date),
    (seenStatus = req.body.seenStatus),
    await sql.connect(config);

  var request = new sql.Request();

  request.input("ResponseId", sql.Int, responseId);
  request.input("Response", sql.NVarChar, response);
  request.input("Date", sql.DateTime, date);
  request.input("SeenStatus", sql.Bit, seenStatus);

  await request.execute("dbo.SubmitNoteAdmin");
  console.info("done");
});

/////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.post("/get-WSA-responses", async (req, response) => {
//   (responseId = req.body.responseId), await sql.connect(config);
//   console.info("got here");

//   var request = new sql.Request();

//   request.input("ResponseId", sql.Int, responseId);
//   // request.execute("dbo.GetWSAResponses", function(err, recordset) {
//   //   if (err) console.log(err);
//   //   // send records as a response
//   //   res.json(recordset);
//   // });
//   console.info("done");
// });

/////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/get-completed-questions", async (req, res) => {
  try {
    let WSAId = req.body.WSAId;
    // let RUId = req.body.RUId;
    // let workstation = req.body.Workstation;

    // console.log("RUID + WORKSTAION" + RUId + workstation);
    await sql.connect(config);
    var request = new sql.Request();

    // request.input("RUId", sql.Int, RUId);
    // request.input("Workstation", sql.Bit, workstation);
    request.input("WSAId", sql.Int, WSAId);
    request.execute("dbo.AdminGetAnsweredQuestionsComplete", function(
      err,
      recordset
    ) {
      if (err) console.log(err);
      // send records as a response
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
    // let RUId = req.body.RUId;
    // let workstation = req.body.Workstation;

    // console.log("RUID + WORKSTAION" + RUId + workstation);

    var request = new sql.Request();

    // request.input("RUId", sql.Int, RUId);
    // request.input("Workstation", sql.Bit, workstation);
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
    let QuestionId = req.body.QuestionId;

    console.info(`${QuestionId}`);
    var request = new sql.Request();

    request.input("QuestionId", sql.Int, QuestionId);

    const DeleteWorkStation = await request.execute("dbo.DeleteWorkStations");

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
    await sql.connect(config);
    let Email = req.body.email;
    let PasswordHash = req.body.password;
    let ContactNumber = req.body.contactNumber;
    let NameOfUser = req.body.name;

    var request = new sql.Request();

    console.info(`This is the Email${Email} 
    + this is the password Hash ${PasswordHash}
    + this is the contact Number ${ContactNumber}
    + this is the name ${NameOfUser}
    `);

    request.input("ContactNumber", sql.VarChar, ContactNumber);
    request.input("NameOfUser", sql.VarChar, NameOfUser);
    request.input("Email", sql.VarChar, Email);
    request.input("PasswordHash", sql.NVarChar, PasswordHash);
    const register = await request.execute("dbo.RegisterUser");

    console.log("done done");

    ///
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hpf9703@gmail.com",
        pass: "Cows4422"
      }
    });
    const url = `http://localhost:3000/`;

    var mailOptions = {
      from: "CodeStoneDeskAssessment@outlook.com",
      to: `${Email}`,
      subject: `Account for ${Email} has been created.`,
      text:
        "Hi, This is an email sent  regarding the codestone desk assment site (do not reply to this email)",
      html: `Congradulations you now have an account for the codestone Desk
        Assesment site  . Go to the following link to login or navigat manually through the site: <a href = "${url}">${url} </a>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    ///
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
  const result = await request.execute("dbo.CheckEmailExists");

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

app.post("/password-confirm", async (req, response) => {
  try {
    await sql.connect(config);
    const Email = req.body.email;
    const PasswordHash = req.body.password;
    const UserEmail = req.body.email;

    var request = new sql.Request();

    request.input("Email", sql.VarChar, Email);
    const result = await request.execute("dbo.CheckEmailExists");

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
    const Email = req.body.email;
    const Location = req.body.Location;
    const date = req.body.date;

    console.info(`${Email}${Location}${date}`);
    var request = new sql.Request();

    //find ruid for user
    request.input("Email", sql.NVarChar, Email);
    request.input("DeskLocation", sql.NVarChar, Location);
    request.input("Date", sql.DateTime, date);

    const result = await request.execute("dbo.FindRuidAddWorkstationDetails");
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
