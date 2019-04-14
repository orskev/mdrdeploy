import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

class Customer extends Component {
  getSlsId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };
  render() {
    const prp = this.props.details;

    return (
      <Card
        bg="light"
        style={{
          width: "48%",
          cursor: "pointer",
          marginBottom: "15px",
          display: "inline-block",
          margin: "5px",
          boxShadow: "1px 2px #888888"
        }}
        onClick={() =>
          this.props.goToOrderTemplate(
            this.getSlsId(),
            this.props.details.AccountExternalID,
            this.props.details.TSASPL,
            this.props.details.TSAPL
          )
        }
      >
        <Card.Header style={{ height: "68px" }}>
          {prp.AccountExternalID}
          <div className="customerName">{prp.Prop_Name}</div>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item style={{ height: "68px" }}>
            {prp.Prop_Street}, {prp.Prop_City}, {prp.Prop_State},{" "}
            {prp.Prop_ZipCode}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

export default Customer;
