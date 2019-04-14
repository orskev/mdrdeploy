import React, { Component } from "react";
import { Card } from "react-bootstrap";

class Article extends Component {
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
        </Card.Body>
      </Card>
    );
  }
}

export default Article;
