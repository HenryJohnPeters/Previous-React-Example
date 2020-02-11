import React from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";

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
  }

  handleSubmit(e) {
    e.preventDefault();

    if (
      this.state.contactNumber.length < 10 ||
      this.state.password.length < 8 ||
      !(this.state.password === this.state.passwordConfirm)
    ) {
      alert(`please enter the form correctly `);
    } else {
      
       

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
      });

      alert(`Account Created `);

      window.location.href="http://localhost:3000/"
    }
  }
  catch(e) {
    console.log(e);
    alert(e);
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
                  <h2>Sign Up </h2>
                  <div className="help">
                    
                  </div>

                  <label htmlFor="email">Email</label>
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
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email} </div>
                  )}

                  <label htmlFor="email">Name</label>
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
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name} </div>
                  )}

                  <label htmlFor="email">Contact Number</label>
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
                  {errors.contactNumber && touched.contactNumber && (
                    <div className="input-feedback">
                      {errors.contactNumber}{" "}
                    </div>
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
                    style={{ width: "100%" }}
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

export default ConfirmRegisterForm;
