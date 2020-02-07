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
  database: "CDA",
  

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/profile-work-station-detailss/:email", async (req, res) => {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/user-questions" ,async  (req, res) => {
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////
app.post("/login", async (req, response) => {
  try {

    var connectionok = true;
    await sql.connect(config).catch(err => {console.log("connection error " ,err )
    connectionok = false});
    if(connectionok){

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
        var decoded = jwt.verify(adminToken, "SECRET_KEY");
        console.log(decoded);

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
  }
  else{
    throw new "connection error: went bang!"
  }
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.post("/edit-question/:QuestionId", async (req, response) => {
//   try {
//     await sql.connect(config);

//       // var Email = req.body.email;

//     var QuestionId = req.params.QuestionId;
//     var request = new sql.Request();

//     console.log({ Email, Password });

//     request.input("Email", sql.VarChar, Email);

//     let result = await request.execute("dbo.CheckEmailExists");

//     if (result.recordsets[0].length > 0) {
//       console.info("This email exists");
//       request.input("Password", sql.VarChar, Password);
//       let result = await request.execute("dbo.LoginUser");

//       if (result.recordsets[0].length > 0) {
//         console.info("/login: login successful..");
//         console.log(req.body);

//         request.input("LastLogin", sql.DateTime, LastLogin);
//         let result = await request.execute("dbo.AddLastLoginToRegisteredUsers");

//         const token = jwt.sign({ user: Email }, "SECRET_KEY", {
//           expiresIn: 3600000
//         });

//         var decoded = jwt.verify(token, "SECRET_KEY");
//         console.log(decoded);

//         response.status(200).json({
//           ok: true,
//           user: Email,
//           jwt: token
//         });
//       } else {
//         console.info("Incorrect Password");
//         AccountValidationMessage = "Incorrecrt password to account";
//         response.status(409).json({
//           AccountValidationMessage: AccountValidationMessage
//         });
//       }
//     } else {
//       console.log("pending");
//       AccountValidationMessage = "Email does not exists";
//       response.status(409).json({
//         AccountValidationMessage: AccountValidationMessage
//       });
//     }
//   } catch (err) {
//     console.log("Err: ", err);
//     response.status(500).send("Check api console.log for the error");
//   }
// });
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
    let QuestionId = req.body.QuestionId;

    console.info(`${QuestionId}`);
    var request = new sql.Request();

    request.input("QuestionId", sql.Int, QuestionId);

    const DeleteWorkStation = await request.execute("dbo.DeleteQuestion");

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
    const ExtraInformation = req.body.ExtraInformation;

    const date = req.body.date;
    var request = new sql.Request();
    console.log(`Email ${Email} =====   Location  
    ${Location} =========
    Extra Information ${ExtraInformation} ==========
     
     date ${date}`);

    //find ruid for user
    request.input("Email", sql.NVarChar, Email);
    request.input("DeskLocation", sql.NVarChar, Location);
    request.input("ExtraInformation", sql.NVarChar, ExtraInformation);

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

app.post("/admin-add-question", async (req, response) => {
  try {
    await sql.connect(config);
    let NewQuestion = req.body.Question;
    //let QuestionUpdate = req.body.QuestionUpdate;
    //let date = req.body.QuestionUpdate;
    //console.info(Question);

    var request = new sql.Request();

    request.input("Question", sql.NVarChar, NewQuestion);
    //request.input("Date", sql.DateTime, date);

    const update = await request.execute("dbo.AddQuestion");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

app.post("/question-response", async (req, response) => {
  try {
    await sql.connect(config);
     let QuestionId = req.body.QuestionId
    let QuestionAnswer = req.body.QuestionAnswer;
    let date = req.body.date;
    let User = req.body.User;

    console.info("QuestionId")
    console.info(QuestionId)
    console.info("QuestionAnswer")
    console.info(QuestionAnswer)
    console.info("date")
    console.info(date)
    console.info("User")
    console.info(User)

     var request = new sql.Request();

     request.input("QuestionId", sql.NVarChar, QuestionId);
     request.input("QuestionAnswer", sql.NVarChar, QuestionAnswer);
     request.input("Date", sql.DateTime, date);
     request.input("Email", sql.NVarChar, User);
      
//QuestionResponse
    const updateQuestion = await request.execute("dbo.QuestionResponse");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

app.post("/revert-declined-question-answer", async (req, response) => {
  try {
    
    console.info("revert-declined-question-answer from express")
    await sql.connect(config);
     let QuestionId = req.body.QuestionId
    let QuestionAnswer = req.body.QuestionAnswer;
    let Email = req.body.Email
   

    console.info("QuestionId")
    console.info(QuestionId)
    console.info("QuestionAnswer")
    console.info(QuestionAnswer)
    console.info("Email")
    console.info(Email)
     

     var request = new sql.Request();

     request.input("QuestionId", sql.NVarChar, QuestionId);
     request.input("QuestionAnswer", sql.NVarChar, QuestionAnswer);
     request.input("Email", sql.NVarChar, Email);
    
      
//QuestionResponse
    const updateQuestion = await request.execute("dbo.RevertDeclinedQuestionAnswer");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

//////////////////////////////////////////////////////////////////////////
app.post("/revert-accepted-question-answer", async (req, response) => {
  try {
    
    await sql.connect(config);
     let QuestionId = req.body.QuestionId
    let QuestionAnswer = req.body.QuestionAnswer;
    let Email = req.body.Email
   

    console.info("QuestionId")
    console.info(QuestionId)
    console.info("QuestionAnswer")
    console.info(QuestionAnswer)
    console.info("Email")
    console.info(Email)
     

     var request = new sql.Request();

     request.input("QuestionId", sql.NVarChar, QuestionId);
     request.input("QuestionAnswer", sql.NVarChar, QuestionAnswer);
     request.input("Email", sql.NVarChar, Email);
    
      
//QuestionResponse
    const updateQuestion = await request.execute("dbo.RevertAcceptedQuestionAnswer");

    console.log("Accepted question deleton");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

app.post("/Accept-question-answer", async (req, response) => {
  try {
    await sql.connect(config);
     let QuestionId = req.body.QuestionId
    let date = req.body.date;
    let User = req.body.User;

    console.info(`${QuestionId},${date},${User}`)


     var request = new sql.Request();

     request.input("QuestionId", sql.NVarChar, QuestionId);
     request.input("Date", sql.DateTime, date);
     request.input("Email", sql.NVarChar, User);
      
//QuestionResponse
    const updateQuestion = await request.execute("dbo.UserAcceptQuestion");

    console.log("done done");
  } catch (err) {
    console.log("Err: ", err);
    response.status(500).send("Check api console.log for the error");
  }
});

//////////////////////////////////////////////////////////////////////////


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
