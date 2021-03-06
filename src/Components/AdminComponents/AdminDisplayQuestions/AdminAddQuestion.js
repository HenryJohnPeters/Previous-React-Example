import Popup from "reactjs-popup";

import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";

import { Link } from "react-router-dom";

import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddQuestion extends React.Component {
  constructor() {
    super();

    this.state = {
      Question: "",
      GuidanceNote: ""
    };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    try {
      if (this.state.Question.length < 10) {
        toast.error("Please enter a more descriptive question", {
          draggable: true,
          autoClose: 1500
        });
      } else if (this.state.GuidanceNote.length < 10) {
        toast.error("Please enter a more descriptive guidance note", {
          // className: "custom-toast",
          draggable: true,

          autoClose: 1500
        });
      } else {
        var today = new Date(),
          date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
            1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

        const data = {
          Question: this.state.Question,
          GuidanceNote: this.state.GuidanceNote
        };
        console.log(date);

        fetch("/admin-add-question", {
          method: "POST", // or 'PUT'
          headers: {
            Accept: "application/json,",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(response => {
          console.log("response before it is broken down " + response);

          return response.json();
        });
        // .then(({ adminJwt, jwt, user, AccountValidationMessage }) => {
        //   console.log(
        //     "after it is broken down",
        //     jwt,
        //     adminJwt,
        //     user,
        //     AccountValidationMessage
        //   );
        // });

        toast.info("Question Added", {
          draggable: true,
          autoClose: 1500
        });
        window.location.reload();
        //
      }
    } catch (e) {
      console.log(e);
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
                <div className="jumbotron">
                  <h3 style={{ textAlign: "center" }}>Enter New Question</h3>
                  <div className="help"></div>

                  <textarea
                    style={{ width: "100%" }}
                    placeholder="Enter new question"
                    value={this.state.email}
                    onInput={handleChange}
                    onChange={e => this.setState({ Question: e.target.value })}
                  />

                  <textarea
                    style={{ width: "100%" }}
                    placeholder="Enter guidance note for question"
                    value={this.state.email}
                    onInput={handleChange}
                    onChange={e =>
                      this.setState({ GuidanceNote: e.target.value })
                    }
                  />

                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    Add Question
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

export default AddQuestion;
