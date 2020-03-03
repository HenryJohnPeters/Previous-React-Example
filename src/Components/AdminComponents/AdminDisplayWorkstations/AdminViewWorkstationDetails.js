import "./ViewWorkstationModal.css";
import React from "react";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
class DisplayAddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      show: false,
      show1: false
    };
  }

  handleClose() {
    this.setState({
      show: false,
      show1: false
    });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleRefresh() {
    window.location.reload();
  }

  render() {
    // console.log(this.state);

    return (
      <>
        <div className="header-container">
          <button
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={this.handleShow}
          >
            +
          </button>
        </div>
        <div>
          <Modal
            //   className="test"
            show={this.state.show}
            onHide={this.handleClose}
            animation={true}
          >
            <button className="modal-dialog"> Hi </button>
          </Modal>
        </div>
      </>
    );
  }
}
export default DisplayAddQuestion;
