import React from "react";

import { Link } from "react-router-dom";

import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";
import Fade from "react-reveal";

import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ConfirmResetPasswordForm extends React.Component {
  constructor() {
    super();

    this.state = { users: [], email: "", password: "", passwordConfirm: "" };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = window.localStorage.getItem("User");
    if (
      this.state.password.length < 8 ||
      !(this.state.password === this.state.passwordConfirm)
    ) {
      toast.error("please enter the credentials correctly ", {
        // className: "custom-toast",
        draggable: true,

        autoClose: 1500
      });
    } else {
      console.log({ email });
      const data = { email, password: this.state.password };

      fetch("/password-confirm", {
        method: "POST", // or 'PUT'
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      toast.info("Password updated", {
        // className: "custom-toast",
        draggable: true,

        autoClose: 1500
      });
    }
  }

  catch(e) {
    console.log(e);
  }

  render() {
    console.log(this.state.users);
    return (
      <div>
        <Formik
          class="form-signin"
          action="auth"
          method="POST"
          initialValues={{ email: "", password: "", passwordConfirm: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log("Logging in", values);
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
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
                <div className="jumbotron">
                  <Fade left>
                    <h2>Confirm Password Reset </h2>
                  </Fade>
                  <Fade right>
                    <div className="help">
                      <Popup trigger={<Link> Help?</Link>} className="center">
                        <div>
                          Enter Codestone Email address and Password connected
                          to the account.
                        </div>
                      </Popup>
                    </div>
                  </Fade>
                  <Fade left>
                    <label htmlFor="email">Password</label>
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
                  </Fade>
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password} </div>
                  )}
                  <Fade right>
                    <label htmlFor="email">Password Confirm </label>
                  </Fade>
                  <Fade left>
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
                  </Fade>
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <div className="input-feedback">
                      {errors.passwordConfirm}{" "}
                    </div>
                  )}
                  <Fade right>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={this.onSubmit}
                    >
                      Sign Up
                    </button>
                  </Fade>
                  <Fade left>
                    <p>
                      <Link to="/"> Login Page </Link>
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

export default ConfirmResetPasswordForm;
