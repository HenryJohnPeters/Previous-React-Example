import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";

import { Link } from "react-router-dom";
import Fade from "react-reveal";

import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.handleSubmit.bind(this);
    // this.successToast = this.successToast.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let User = window.localStorage.getItem("User");

    if (this.state.email.length < 8 || this.state.password.length < 8) {
      toast.error("please enter the credentials correctly  ", {
        // className: "custom-toast",
        draggable: true,

        autoClose: 1500
      });
    } else {
      var today = new Date(),
        date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
          1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

      const data = {
        email: this.state.email,
        password: this.state.password,
        date
      };
      console.log(date);

      fetch("/login", {
        method: "POST", // or 'PUT'
        headers: {
          Accept: "application/json,",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          console.log("response before it is broken down " + response);

          return response.json();
        })
        .then(({ adminJwt, jwt, user, AccountValidationMessage }) => {
          console.log(
            "after it is broken down",
            jwt,
            adminJwt,
            user,
            AccountValidationMessage
          );
          window.localStorage.removeItem("registerToken");
          window.localStorage.removeItem("resetToken");
          if (jwt && user) {
            window.localStorage.setItem("myToken", jwt);
            window.localStorage.setItem("User", user);
            window.location.href = "http://localhost:3000/home";
          } else if (adminJwt && user) {
            window.localStorage.removeItem("myToken");
            window.localStorage.setItem("adminToken", adminJwt);
            window.localStorage.setItem("User", user);
            window.location.href =
              "http://localhost:3000/admin-view-workstation-assessments-declined";
          }
          if (AccountValidationMessage) {
            toast.error(`${AccountValidationMessage}`, {
              // className: "custom-toast",
              draggable: true,

              autoClose: 1500
            });
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }

  render() {
    console.log(this.state.email);
    console.log(this.state.password);
    return (
      <div>
        <Formik
          class="form-signin"
          action="auth"
          method="POST"
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log("Logging in", values);
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required("Required")
              .matches(/(?=.*@)/, "This is not an email address."),

            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/(?=.*[0-9])/, "Password must contain a number.")
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
                className="form-signin"
                action="auth"
                method="POST"
              >
                <ToastContainer transition={Zoom} position="top-right" />
                <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
                  <Fade left>
                    <h2>Login </h2>
                  </Fade>
                  <Fade right>
                    <label htmlFor="email">Email</label>
                  </Fade>
                  <Fade left>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value1={values.email}
                      value={this.state.email}
                      onInput={handleChange}
                      onChange={e => this.setState({ email: e.target.value })}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"}
                    />
                  </Fade>
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                  <Fade right>
                    <label htmlFor="email">Password</label>
                  </Fade>
                  <Fade left>
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
                    />{" "}
                  </Fade>
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password} </div>
                  )}
                  <Fade right>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      type="submit"
                      onClick={this.onSubmit}
                    >
                      Login
                    </button>
                  </Fade>
                  <Fade left>
                    <p>
                      <Link to="/register"> Sign Up </Link>
                    </p>
                  </Fade>
                  <Fade right>
                    <p>
                      <Link to="/reset"> Reset Password </Link>
                    </p>
                  </Fade>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default LoginForm;
