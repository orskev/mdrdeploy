import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

class OrderHeader extends Component {
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
        className="orderheaderbox"
        style={{ width: "90%", cursor: "pointer" }}
        onClick={() =>
          this.props.goToOrderDetails(
            this.getSlsId(),
            this.props.details.order_id
          )
        }
      >
        <Card.Header>CustomerID : {prp.cust_id}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Order ID : {prp.order_id}</ListGroup.Item>
          <ListGroup.Item>
            Order Date :{" "}
            {prp.order_date.substring(0, prp.order_date.length - 14)}
          </ListGroup.Item>
          <ListGroup.Item>Total : {prp.total.toFixed(2)}$</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

export default OrderHeader;
