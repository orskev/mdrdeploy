import React, { Component } from "react";
import Header from "./Header";
import { Form } from "react-bootstrap";

class NotesAdd extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: ""
    };
  }

  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };

  addNoteAPI = _ => {
    const { title, body } = this.state;
    const sls_id = this.getUserId();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    fetch(
      `http://localhost:4000/notes/add?sls_id=${sls_id}&title=${title}&date=${today}&body=${body}`
    ).catch(err => console.error(err));
  };

  updateTitle(title) {
    this.setState({ title: title.target.value.substr(0, 50) });
  }

  updateBody(body) {
    this.setState({ body: body.target.value.substr(0, 500) });
  }

  render() {
    function goBack() {
      window.history.back();
    }
    return (
      <div>
        <Header />
        <div style={{ margin: "10%", marginTop: "20%" }}>
          <input
            className="form-control"
            placeholder="Title"
            onChange={this.updateTitle.bind(this)}
            value={this.state.title}
          />
          <Form.Control
            as="textarea"
            rows="10"
            placeholder="Add a note here"
            onChange={this.updateBody.bind(this)}
            value={this.state.body}
          />

          <button
            style={{ margin: "25px", width: "150px" }}
            type="button"
            className="btn btn-danger"
            onClick={goBack}
          >
            Cancel Note
          </button>
          <button
            style={{ margin: "25px", width: "150px" }}
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.addNoteAPI();
              goBack();
            }}
          >
            Add Note
          </button>
        </div>
      </div>
    );
  }
}

export default NotesAdd;
