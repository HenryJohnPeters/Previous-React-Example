import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";

import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "henryjohnpeters@gmail.com",
      password: "123456789"
    };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email.length < 8 || this.state.password.length < 8) {
      alert(`please enter the form correctly `);
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
        .then(({ jwt, user, AccountValidationMessage }) => {
          console.log(
            "after it is broken down",
            jwt,
            user,
            AccountValidationMessage
          );
          window.localStorage.setItem("myToken", jwt);
          window.localStorage.setItem("User", user);
          if (AccountValidationMessage) {
            alert(AccountValidationMessage);
          } else {
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
                <div className="jumbotron">
                  <h2>Login </h2>
                  <div className="help">
                    <Popup trigger={<Link> Help?</Link>} className="center">
                      <div>
                        Enter Codestone Email address and Password connected to
                        the account.
                      </div>
                    </Popup>
                  </div>

                  <label htmlFor="email">Email</label>

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
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
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

                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    Login
                  </button>

                  <p>
                    <Link to="/Register"> Sign Up </Link>
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

export default LoginForm;
