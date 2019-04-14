import React, { Component } from "react";
import Header from "./Header";
import Note from "./Note";

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };

  updateNotes = key => {
    var newArray = [];
    var { notes } = this.state;
    for (var i = 0; i < notes.length; i++)
      if (notes[i].note_id !== key) newArray.push(notes[i]);
    this.setState({
      notes: newArray
    });
  };

  goToNotesAdd = () => {
    this.props.history.push(`/notesadd/${this.getUserId()}`);
  };

  componentDidMount() {
    fetch(`http://localhost:4000/notes?sls_id=${this.getUserId()}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          notes: res.data
        });
      });
  }

  render() {
    const { notes } = this.state;
    return (
      <div>
        <Header />
        <img
          src={require("../images/addNote.png")}
          alt=""
          style={{
            height: "5%",
            width: "5%",
            marginLeft: "92%",
            marginTop: "2%"
          }}
          onClick={() => this.goToNotesAdd()}
        />
        <ul style={{ marginTop: "10px", marginBottom: "10px", padding: "0" }}>
          {Object.keys(notes).map(key => (
            <Note
              key={key}
              index={key}
              details={notes[key]}
              updateNotes={this.updateNotes}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Notes;
