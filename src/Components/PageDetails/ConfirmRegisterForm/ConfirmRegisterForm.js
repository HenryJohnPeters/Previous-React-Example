import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";
// import Fade from "react-reveal";
import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ConfirmRegisterForm extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      name: "",
      contactNumber: "",
      password: "",
      passwordConfirm: "",
      email: ""
    };
    this.onSubmit = this.handleSubmit.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
  }



   isValidEmail( value ) {
    return /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/.test( value );
  }


  // componentDidMount(){
  //   if(this.isValidEmail("henry5 ")){
  //     alert("okay")

  //   }else if (!this.isValidEmail("henr5 ")){
  //     alert("not okay")

  //   }
    
     
    
    
  // }
  
  



  handleSubmit(e) {
    e.preventDefault();

    if (
      this.state.contactNumber.length < 10

    ) {
      toast.error("Contact number must be at least 11 numbers long", {    
        draggable: true,

        autoClose: 2500
      });
    }else if (this.state.password.length < 8){
      toast.error("Password length must be eight or more characters", {
        draggable: true,

        autoClose: 2500
      });
      

    }
    else if (!(this.state.password === this.state.passwordConfirm)){
      toast.error("Password and password confirm must match", {
        draggable: true,

        autoClose: 2500
      });

    }
    else if (isNaN(this.state.contactNumber)){
      toast.error("Contact number must be a number", {
        draggable: true,

        autoClose: 2500
      });

    }else if (!this.isValidEmail(this.state.email)){
      toast.error("Please enter a valid email", {
        draggable: true,

        autoClose: 2500
      });

    }
    
    
    else {
      const data = {
        email: this.state.email,
        password: this.state.password,
        contactNumber: this.state.contactNumber,
        name: this.state.name
      };

      fetch("/register", {
        method: "POST", // or 'PUT'
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }) .then(response => {
          console.log("response before it is broken down " + response);

          return response.json();
        }).then(({ error, accountExistsBool }) => {
          // alert (error) 
          // alert(accountExistsBool)
          if(accountExistsBool){
            toast.error("An account with this email already exists. ", {
              draggable: true,
      
              autoClose: 2500
            });


          }else if (!accountExistsBool){
            toast.info("Account created", {
              draggable: true,
      
              autoClose: 2500
            });

            setTimeout(function(){ window.location.href = 'http://localhost:3000/'; }, 1700);


          }
        })
         
    }
  }
  catch(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <Formik
          class="form-signin"
          action="auth"
          method="POST"
          initialValues={{
            password: "",
            passwordConfirm: "",
            name: "",
            contactNumber: "",
            email: ""
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log("Logging in", values);
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),

            email: Yup.string()
              .email()
              .required("Email is required")
              .matches(/(?=.*@)/, "This is not an email address."),

            contactNumber: Yup.string()
              .required("Contact number is required")
              .matches(/(?=.*[0-9])/, "Contact number must contain numbers."),

            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/(?=.*[0-9])/, "Password must contain a number."),

            passwordConfirm: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Password confirm is required")
              .min(8, "Password is too short - should be 8 chars minimum.")
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,

              handleChange,
              handleBlur,
              handleSubmit
            } = props;

            return (
              <form
                onSubmit={handleSubmit}
                class="form-signin"
                action="auth"
                method="POST"
              >
                <ToastContainer transition={Zoom} position="top-right" />

                <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
                  {/* <Fade left> */}
                    <h2>Sign Up </h2>
                  {/* </Fade>
                  <Fade right> */}
                    <label htmlFor="email">Email</label>
                  {/* </Fade>
                  <Fade left> */}
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value2={values.email}
                      value={this.state.email}
                      onInput={handleChange}
                      onChange={e => this.setState({ email: e.target.value })}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"}
                    />
                  {/* </Fade> */}
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email} </div>
                  )}
                  {/* <Fade right> */}
                    <label htmlFor="email">Name</label>
                  {/* </Fade>
                  <Fade left> */}
                    <input
                      name="name"
                      type="name"
                      placeholder="Enter your name"
                      value2={values.name}
                      value={this.state.name}
                      onInput={handleChange}
                      onChange={e => this.setState({ name: e.target.value })}
                      onBlur={handleBlur}
                      className={errors.name && touched.name && "error"}
                    />
                  {/* </Fade> */}
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name} </div>
                  )}
                  {/* <Fade right> */}
                    <label htmlFor="email">Contact Number</label>
                  {/* </Fade>
                  <Fade left> */}
                    <input
                      name="contactNumber"
                      type="contactNumber"
                      placeholder="Enter your contact number"
                      value2={values.contactNumber}
                      value={this.state.contactNumber}
                      onInput={handleChange}
                      onChange={e =>
                        this.setState({ contactNumber: e.target.value })
                      }
                      onBlur={handleBlur}
                      className={
                        errors.contactNumber && touched.contactNumber && "error"
                      }
                    />
                  {/* </Fade> */}
                  {errors.contactNumber && touched.contactNumber && (
                    <div className="input-feedback">
                      {errors.contactNumber}{" "}
                    </div>
                  )}

                  {/* <Fade right> */}
                    <label htmlFor="email">Password</label>
                  {/* </Fade>
                  <Fade left> */}
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value2={values.password}
                      value={this.state.password}
                      onInput={handleChange}
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                      onBlur={handleBlur}
                      className={errors.password && touched.password && "error"}
                    />
                  {/* </Fade> */}
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password} </div>
                  )}
                  {/* <Fade right> */}
                    <label htmlFor="email">Password Confirm </label>
                  {/* </Fade>
                  <Fade left> */}
                    <input
                      name="passwordConfirm"
                      type="password"
                      placeholder="Enter your password"
                      value2={values.passwordConfirm}
                      value={this.state.passwordConfirm}
                      onInput={handleChange}
                      onChange={e =>
                        this.setState({ passwordConfirm: e.target.value })
                      }
                      onBlur={handleBlur}
                      className={
                        errors.passwordConfirm &&
                        touched.passwordConfirm &&
                        "error"
                      }
                    />
                  {/* </Fade> */}
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <div className="input-feedback">
                      {errors.passwordConfirm}{" "}
                    </div>
                  )}
                  {/* <Fade right> */}
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      type="submit"
                      onClick={this.onSubmit}
                    >
                      Sign Up
                    </button>
                  {/* </Fade>
                  <Fade left> */}
                    <p>
                      <Link to="/"> Login Page </Link>
                    </p>
                  {/* </Fade>
                  <Fade right> */}
                    <p>
                      <Link to="/reset"> Reset Password </Link>
                    </p>
                  {/* </Fade> */}
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default ConfirmRegisterForm;
