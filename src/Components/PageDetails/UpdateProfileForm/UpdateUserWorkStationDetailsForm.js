import React from "react";

import { Link } from "react-router-dom";

import Popup from "reactjs-popup";

import autosize from "autosize";
import { Modal } from "react-bootstrap";

class ConfirmResetPasswordForm extends React.Component {
  constructor() {
    super();

    this.state = {
      Location: "",
      ExtraInformation: "",
      PrimaryWorkStation: true
    };
    this.onSubmit = this.handleSubmit.bind(this);
    this.handlePrimaryButton = this.handlePrimaryButton.bind(this);
    this.handleSecondaryButton = this.handleSecondaryButton.bind(this);
  }
  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }

  handlePrimaryButton(e) {
    e.preventDefault();

    this.setState({ PrimaryWorkStation: true });
  }

  handleSecondaryButton(e) {
    e.preventDefault();
    this.setState({ PrimaryWorkStation: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    try {
      if (this.state.Location.length < 8) {
        alert("Location has to be 8 characters minimum");
      } else {
        alert("Workstation Added. Refresh the page to view updates");
        console.log(this.state.ExtraInformation);
        console.log(this.state.Location);

        const email = window.localStorage.getItem("User");

        var today = new Date(),
          date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
            1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

        console.log(date);
        const data = {
          email,
          ExtraInformation: this.state.ExtraInformation,
          Location: this.state.Location,

          date
        };

        fetch("/add-workstation", {
          method: "POST", // or 'PUT'
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  catch(e) {
    console.log(e);
    alert(e);
  }

  render() {
    return (
      <div>
        <form>
          <div className="jumbotron">
            <h2 style={{ textAlign: "center" }}>Add Workstation </h2>
            <div className="help">
              <Popup trigger={<Link> Help?</Link>} className="center">
                <div>
                  Enter Codestone Email and Password connected to the account.
                </div>
              </Popup>
            </div>

            <label htmlFor="email">Location</label>
            <div>
              <textarea
                style={{ width: "100%" }}
                ref={c => (this.textarea = c)}
                placeholder="type some text"
                rows={1}
                defaultValue=""
                onChange={e => this.setState({ Location: e.target.value })}
              />
            </div>

            <label htmlFor="email">Extra Information</label>
            <div>
              <textarea
                style={{ width: "100%" }}
                ref={c => (this.textarea = c)}
                placeholder="type some text"
                rows={1}
                defaultValue=""
                onChange={e =>
                  this.setState({ ExtraInformation: e.target.value })
                }
              />
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={this.onSubmit}
            >
              Add workstation
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ConfirmResetPasswordForm;
