import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Header from "./Header";

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      inventory: [],
      search: [],
      items: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:4000/Inventory"),
      fetch("http://localhost:4000/Items")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          inventory: data1.data,
          items: data2.data
        })
      );
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 45) });
  }

  render() {
    const { search, inventory } = this.state;

    const invDetails = inventory.map(({ ItemExternalID, InStockQuantity }) => {
      const found = this.state.items.find(e => e.ExternalID === ItemExternalID);

      return {
        ItemExternalID,
        name: found.name ? found.name : "",
        Prop1: found.Prop1 ? found.Prop1 : "",
        InStockQuantity
      };
    });

    let filteredInv = invDetails.filter(item => {
      return item.ItemExternalID.toLowerCase().indexOf(search) !== -1;
    });

    return (
      <div>
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
          placeholder="Search for an Item"
          value={search}
          onChange={this.updateSearch.bind(this)}
        />
        <ReactTable
          style={{
            maxWidth: "1000px",
            margin: "auto",
            marginTop: "15px",
            marginBottom: "15px"
          }}
          data={filteredInv}
          columns={[
            {
              Header: "ItemID",
              accessor: "ItemExternalID",
              width: 100
            },
            {
              Header: "English Description",
              accessor: "name"
            },
            {
              Header: "French Description",
              accessor: "Prop1"
            },
            {
              Header: "InStockQuantity",
              accessor: "InStockQuantity",
              width: 150
            }
          ]}
          defaultPageSize={25}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default Inventory;
