import React from "react";

import { toast, Zoom, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddWorkstation extends React.Component {
  constructor() {
    super();

    this.state = {
      Location: "",
      ExtraInformation: "",
      PrimaryWorkStation: true
    };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    try {
      if (this.state.Location.length < 3) {
        toast.error("Location has to be 3 characters minimum", {
          draggable: true,

          autoClose: 1500
        });
      } else {
        console.log(this.state.ExtraInformation);
        console.log(this.state.Location);

        const email = window.localStorage.getItem("User");

        var today = new Date(),
          date = `${today.getUTCFullYear()}-${today.getUTCMonth() +
            1}-${today.getUTCDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()} `;

        console.log(date);
        const data = {
          email,

          location: this.state.Location,

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

        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }

  catch(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <ToastContainer transition={Zoom} position="top-right" />
        <form>
          <div className="jumbotron">
            <h2 style={{ textAlign: "center" }}>Add Workstation </h2>

            <label htmlFor="email">Location</label>
            <div>
              <input
                style={{ width: "100%" }}
                ref={c => (this.textarea = c)}
                placeholder="Enter Location (e.g. Office)"
                rows={1}
                defaultValue=""
                onChange={e => this.setState({ Location: e.target.value })}
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

export default AddWorkstation;
