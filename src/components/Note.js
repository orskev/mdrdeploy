import React, { Component } from "react";
import { Card } from "react-bootstrap";

class Note extends Component {
  deleteNote = _ => {
    const prp = this.props.details;
    fetch(`http://localhost:4000/notes/delete?note_id=${prp.note_id}`).catch(
      err => console.error(err)
    );
  };

  render() {
    const prp = this.props.details;

    return (
      <Card style={{ margin: "15px" }}>
        <Card.Header>
          <div className="customerName">{prp.title}</div>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{prp.body}</p>
            <footer className="blockquote-footer">
              <cite title="Source Title">
                posted on {prp.date.substring(0, prp.date.length - 14)}
              </cite>
            </footer>
          </blockquote>
          <button
            style={{ margin: "15px", width: "150px" }}
            type="button"
            className="btn btn-danger"
            onClick={() => {
              this.deleteNote();
              this.props.updateNotes(prp.note_id);
            }}
          >
            Delete note
          </button>
        </Card.Body>
      </Card>
    );
  }
}

export default Note;
