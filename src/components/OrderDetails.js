import React, { Component } from "react";
import Header from "./Header";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from "react-bootstrap";

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderdetails: [],
      items: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:4000/salesdetails"),
      fetch("http://localhost:4000/Items")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          orderdetails: data1.data,
          items: data2.data
        })
      );
  }

  getOrderId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return parseInt(words[3]);
  };

  render() {
    const { orderdetails, items } = this.state;
    const orderId = this.getOrderId();

    const filteredOrderDetails = orderdetails.filter(function(obj) {
      return obj.order_id === orderId;
    });

    const extArr = filteredOrderDetails.map(({ Ext_Price }) => {
      return { Ext_Price };
    });

    const extSum = extArr
      .reduce((ac, { Ext_Price }) => ac + Ext_Price, 0)
      .toFixed(2);

    const filteredOrderDetailsDescription = filteredOrderDetails.map(
      ({ item__, Qty_Ordered, Unit_Price, Ext_Price }) => {
        const found = items.find(e => e.ExternalID === item__);
        return {
          item__,
          descriptionFR: found ? found.Prop1 : null,
          descriptionEN: found ? found.name : null,
          Qty_Ordered,
          Unit_Price: Unit_Price.toFixed(2),
          Ext_Price: Ext_Price.toFixed(2)
        };
      }
    );

    function goBack() {
      window.history.back();
    }

    console.log(orderdetails);

    return (
      <div>
        <Header />

        <div
          style={{
            lineHeight: "45px"
          }}
        >
          <Button onClick={goBack} variant="warning" style={{ margin: "15px" }}>
            Go Back to Activities
          </Button>
          <ReactTable
            data={filteredOrderDetailsDescription}
            columns={[
              {
                Header: "ItemID",
                accessor: "item__",
                width: 100
              },
              {
                Header: "Description FR",
                accessor: "descriptionFR"
              },
              {
                Header: "Description EN",
                accessor: "descriptionEN"
              },
              {
                Header: "Quantity",
                accessor: "Qty_Ordered",
                width: 100
              },
              {
                Header: "Un Price",
                accessor: "Unit_Price",
                width: 100
              },
              {
                Header: "Ext Price",
                accessor: "Ext_Price",
                width: 100
              }
            ]}
            defaultPageSize={10}
          />
        </div>
        <h1 className="subTotalFooter">Sub Total: {extSum}$</h1>
      </div>
    );
  }
}

export default OrderDetails;
