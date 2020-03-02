import React from "react";

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
    try {
      if (this.state.Location.length < 3) {
        alert("Location has to be 3 characters minimum");
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
        alert("Workstation Added. Refresh the page to view updates");
      }
      window.location.reload();
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
