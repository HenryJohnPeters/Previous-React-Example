import React from "react";

import { Link } from "react-router-dom";

import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";
import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RegisterForm extends React.Component {
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
    const currentEmail = window.localStorage.getItem("User");

    if (this.state.contactNumber.length < 10) {
      toast.error("Contact number to short", {
        draggable: true,
        autoClose: 1500
      });
    } else {
      const data = {
        currentEmail: currentEmail,
        email: this.state.email,

        contactNumber: this.state.contactNumber,
        name: this.state.name
      };

      fetch("/update-account-details", {
        method: "POST", // or 'PUT'
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      window.localStorage.removeItem("User");
      window.localStorage.setItem("User", this.state.email);

      window.location.reload();
    }
  }
  catch(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <ToastContainer transition={Zoom} position="top-right" />
        <Formik
          class="form-signin"
          action="auth"
          method="POST"
          initialValues={{
            name: "",
            contactNumber: ""
          }}
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
              .matches(/(?=.*@)/, "Enter valid Email."),

            name: Yup.string().required("Name is required"),

            contactNumber: Yup.string()
              .required("Contact number is required")
              .matches(/(?=.*[0-9])/, "Contact number must contain numbers.")
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
                  <h2>Update Account Details </h2>
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

                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    Update
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default RegisterForm;
