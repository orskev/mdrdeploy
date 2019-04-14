import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

class OrderConfirmationHeader extends Component {
  getCustomerId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[3];
  };

  render() {
    const custID = this.getCustomerId();
    const accounts = this.props.Account;
    const accInfo = accounts.filter(function(obj) {
      return obj.ExternalObjectID === custID;
    });

    return (
      <div style={{ paddingTop: "15px" }}>
        <Card style={{ width: "45%", display: "inline-block", margin: "5px" }}>
          <Card.Header>Ship To</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {" "}
              Street Name : {accInfo[0].Prop_Street}{" "}
            </ListGroup.Item>
            <ListGroup.Item>City Name : {accInfo[0].Prop_City}</ListGroup.Item>
            <ListGroup.Item>
              State Name : {accInfo[0].Prop_State}
            </ListGroup.Item>
            <ListGroup.Item>
              Zip Code : {accInfo[0].Prop_ZipCode}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card style={{ width: "45%", display: "inline-block" }}>
          <Card.Header>Customer Info</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {" "}
              Street Name : {accInfo[0].Prop_Street}{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              CustomerID : {accInfo[0].ExternalObjectID}
            </ListGroup.Item>
            <ListGroup.Item>Phone : {accInfo[0].Prop_Phone}</ListGroup.Item>
            <ListGroup.Item>Email : {accInfo[0].Prop_Email}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default OrderConfirmationHeader;
