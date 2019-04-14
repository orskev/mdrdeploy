import React, { Component } from "react";
import Header from "./Header";
import OrderHeader from "./OrderHeader";

class Activities extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/salesheader")
      .then(res => res.json())
      .then(res => {
        this.setState({
          orders: res.data
        });
      });
  }

  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };

  goToOrderDetails = (key, key1) => {
    this.props.history.push(`/orderdetails/${key}/${key1}`);
  };

  render() {
    const userID = this.getUserId();
    const orderBySls = this.state.orders.filter(function(obj) {
      return obj.sls_id === userID;
    });

    const orderBySlsSorted = orderBySls.reverse();
    return (
      <div>
        <Header />
        <ul style={{ marginTop: "10px", marginBottom: "10px" }}>
          {Object.keys(orderBySlsSorted).map((key, key1) => (
            <OrderHeader
              key={key}
              index={key}
              key1={key1}
              details={orderBySlsSorted[key]}
              goToOrderDetails={this.goToOrderDetails}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Activities;
