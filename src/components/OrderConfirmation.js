import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import OrderConfirmationHeader from "./OrderConfirmationHeader";

class OrderConfirmation extends Component {
  addOrderHeaders = _ => {
    var { custID, orderDate, userID, RequiredDate, o, remark } = this.props;
    var dd = RequiredDate.getDate();
    var mm = RequiredDate.getMonth() + 1; //January is 0!
    var yyyy = RequiredDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    RequiredDate = yyyy + "-" + mm + "-" + dd;
    const summary = o.filter(function(obj) {
      return obj.Quantity >= 1;
    });
    const oExt = summary
      .map(({ ExtPrice }) => {
        return { ExtPrice };
      })
      .reduce((ac, { ExtPrice }) => ac + ExtPrice, 0);

    fetch(
      `http://localhost:4000/orderheaders/add?cust_id=${custID}&sls_id=${userID}&order_date=${orderDate}&required_date=${RequiredDate}&total=${oExt}&remark=${remark}`
    ).catch(err => console.error(err));
  };

  addOrderDetails = _ => {
    const o = this.props.o;
    const summary = o.filter(function(obj) {
      return obj.Quantity >= 1;
    });
    var url = "";
    for (var a = 0; a < summary.length; a++) {
      url += "(LAST_INSERT_ID(),'";
      url += summary[a].ExternalID + "',";
      url += summary[a].Quantity + ",";
      url += summary[a].Price + ",";
      url += summary[a].ExtPrice + ")";
      if (a !== summary.length - 1) {
        url += ",";
      }
    }
    fetch(`http://localhost:4000/orderdetails/add?url=${url}`).catch(err =>
      console.error(err)
    );
  };

  render() {
    const o = this.props.o;
    const summary = o.filter(function(obj) {
      return obj.Quantity >= 1;
    });

    function goBack() {
      window.history.back();
    }

    const oExt = summary
      .map(({ ExtPrice }) => {
        return { ExtPrice };
      })
      .reduce((ac, { ExtPrice }) => ac + ExtPrice, 0);

    return (
      <div>
        <OrderConfirmationHeader Account={this.props.Account} />
        <ReactTable
          style={{ maxWidth: "1000px", margin: "auto", marginTop: "15px" }}
          data={summary}
          columns={[
            {
              Header: "ItemID",
              accessor: "ExternalID",
              width: 100
            },
            {
              Header: "Description",
              accessor: "Description"
            },
            {
              Header: "Quantity",
              accessor: "Quantity",
              width: 100
            },
            {
              Header: "Price",
              accessor: "Price",
              width: 100
            },
            {
              Header: "Ext. Price",
              accessor: "ExtPrice",
              width: 100
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />

        <h1
          className="subTotalFooter"
          style={{ maxWidth: "1000px", margin: "auto", marginTop: "15px" }}
        >
          Sub Total: {oExt}$
        </h1>
        <button
          style={{ margin: "25px", width: "150px" }}
          type="button"
          className="btn btn-danger"
          onClick={goBack}
        >
          Cancel Order
        </button>
        <button
          style={{ margin: "25px", width: "150px" }}
          type="button"
          className="btn btn-warning"
          onClick={() => {
            this.props.editOrder();
          }}
        >
          Edit Order
        </button>
        <button
          style={{ margin: "25px", width: "150px" }}
          type="button"
          className="btn btn-success"
          onClick={() => {
            this.addOrderHeaders();
            this.addOrderDetails();
            alert("Order sent, you can view the order in your activities");
            goBack();
          }}
        >
          Confirm Order
        </button>
      </div>
    );
  }
}

export default OrderConfirmation;
