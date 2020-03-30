import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";

import { Link } from "react-router-dom";
// import Fade from "react-reveal";
import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ResetPasswordForm extends React.Component {
  constructor() {
    super();

    this.state = { email: "" };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email.length < 8) {
      toast.error("please enter email correctly", {
        draggable: true,
        autoClose: 1500
      });
    } else {
      const data = { email: this.state.email };

      fetch("/reset-password-email", {
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
        .then(({ jwt, user, EmailAvailability }) => {
          console.log("After it is broken down", jwt, user, EmailAvailability);
          window.localStorage.setItem("resetToken", jwt);
          window.localStorage.setItem("User", user);

          toast.info(`${EmailAvailability}`, {
            // className: "custom-toast",
            draggable: true,

            autoClose: 5000
          });
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
        <ToastContainer transition={Zoom} position="top-right" />
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
              .matches(/(?=.*@)/, "ENter valid Email.")
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
                <div className="jumbotron" style={{   border: "solid", borderColor: "LightGray",  }}>
                  {/* <Fade left> */}
                    <h2>Reset Password </h2>
                  {/* </Fade>
                  <Fade right> */}
                    <div className="help">
                      <Popup trigger={<Link> Help?</Link>} className="center">
                        <div>
                          Enter Codestone Email address and Password connected
                          to the account.
                        </div>
                      </Popup>
                    </div>
                  {/* </Fade>
                  <Fade left> */}
                    <label htmlFor="email">Email</label>
                  {/* </Fade>
                  <Fade right> */}
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
                  {/* </Fade> */}
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                  {/* <Fade left> */}
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      type="submit"
                      onClick={this.onSubmit}
                    >
                      Send Email
                    </button>
                  {/* </Fade>
                  <Fade right> */}
                    <p>
                      <Link to="/"> Login </Link>
                    </p>
                  {/* </Fade>
                  <Fade left> */}
                    <p>
                      <Link to="/Register"> Sign Up </Link>
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

export default ResetPasswordForm;
