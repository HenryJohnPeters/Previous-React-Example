import React from "react";

import { Link } from "react-router-dom";

import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";

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
      alert(`please enter the form correctly `);
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
      alert(`Password updated `);
    }
  }

  catch(e) {
    console.log(e);
    alert(e);
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
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
                <div className="jumbotron">
                  <h2>Confirm Password Reset </h2>
                  <div className="help">
                    <Popup trigger={<Link> Help?</Link>} className="center">
                      <div>
                        Enter Codestone Email address and Password connected to
                        the account.
                      </div>
                    </Popup>
                  </div>

                  <label htmlFor="email">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value2={values.password}
                    value={this.state.password}
                    onInput={handleChange}
                    onChange={e => this.setState({ password: e.target.value })}
                    onBlur={handleBlur}
                    className={errors.password && touched.password && "error"}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password} </div>
                  )}
                  <label htmlFor="email">Password Confirm </label>
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
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <div className="input-feedback">
                      {errors.passwordConfirm}{" "}
                    </div>
                  )}

                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    Sign Up
                  </button>
                  <p>
                    <Link to="/"> Login Page </Link>
                  </p>
                  <p>
                    <Link to="/reset"> Reset Password </Link>
                  </p>
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
