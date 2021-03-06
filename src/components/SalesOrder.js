import React, { Component } from "react";
import Customer from "./Customer";
import Header from "./Header";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      custsls: [],
      search: ""
    };
  }
  componentDidMount() {
    Promise.all([
      fetch("http://localhost:4000/Account"),
      fetch("http://localhost:4000/AccountUser")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          customers: data1.data,
          custsls: data2.data
        })
      );
  }

  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 45) });
  }

  goToOrderTemplate = (key, key1, key2, key3) => {
    this.props.history.push(`/ordertemplate/${key}/${key1}/${key2}/${key3}`);
  };

  render() {
    const userID = this.getUserId();
    const custBySls = this.state.custsls.filter(function(obj) {
      return obj.UserExternalID === userID;
    });

    const custBySlsFiltered = custBySls.map(({ AccountExternalID }) => {
      const found = this.state.customers.find(
        e => e.ExternalObjectID === AccountExternalID
      );

      return {
        AccountExternalID,
        Prop_Name: found.Prop_Name ? found.Prop_Name : "",
        Prop_Street: found.Prop_Street ? found.Prop_Street : "",
        Prop_City: found.Prop_City ? found.Prop_City : "",
        Prop_State: found.Prop_State ? found.Prop_State : "",
        Prop_ZipCode: found.Prop_ZipCode ? found.Prop_ZipCode : "",
        TSAPL: found.TSAPL ? found.TSAPL : "",
        TSASPL: found.TSASPL ? found.TSASPL : ""
      };
    });

    let filteredCustomers = custBySlsFiltered.filter(customer => {
      return (
        customer.Prop_Name.toLowerCase().indexOf(
          this.state.search.toLowerCase()
        ) !== -1
      );
    });
    var { search } = this.state;

    return (
      <div
        style={{
          height: "100%"
        }}
      >
        <Header />
        <input
          style={{
            marginBottom: "15px",
            maxWidth: "250px",
            margin: "auto",
            marginTop: "15px"
          }}
          className="form-control"
          type="text"
          placeholder="Search for a customer"
          value={search}
          onChange={this.updateSearch.bind(this)}
        />

        <ul style={{ marginTop: "10px", marginBottom: "10px", padding: "0" }}>
          {Object.keys(filteredCustomers).map((key, key1, key2, key3) => (
            <Customer
              key={key}
              index={key}
              key1={key1}
              key2={key2}
              key3={key3}
              details={filteredCustomers[key]}
              goToOrderTemplate={this.goToOrderTemplate}
            />
          ))}
        </ul>
      </div>
    );
  }
}
