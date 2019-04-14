import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Header from "./Header";
import OrderConfirmation from "./OrderConfirmation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;

class OrderTemplate extends Component {
  constructor(props) {
    super(props);
    this.editOrder = this.editOrder.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      Account: [],
      AccountUser: [],
      Inventory: [],
      Items: [],
      MapData: [],
      SpecialPriceLevel: [],
      PriceLevelItem: [],
      PriceLevel: [],
      Quantity: [],
      Checkout: false,
      orderDate: today,
      RequiredDate: new Date(),
      remark: ""
    };
  }
  updateRemark(event) {
    this.setState({ remark: event.target.value.substr(0, 100) });
  }

  handleChange(date) {
    this.setState({
      RequiredDate: date
    });
  }

  editOrder() {
    this.setState({
      Checkout: false
    });
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const Quantity = [...this.state.Quantity];
          Quantity[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ Quantity });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.Quantity[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:4000/Account"),
      fetch("http://localhost:4000/AccountUser"),
      fetch("http://localhost:4000/Inventory"),
      fetch("http://localhost:4000/Items"),
      fetch("http://localhost:4000/MapData"),
      fetch("http://localhost:4000/SpecialPriceLevel"),
      fetch("http://localhost:4000/PriceLevelItem"),
      fetch("http://localhost:4000/PriceLevel"),
      fetch("http://localhost:4000/Quantity")
    ])
      .then(([res1, res2, res3, res4, res5, res6, res7, res8, res9]) =>
        Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
          res4.json(),
          res5.json(),
          res6.json(),
          res7.json(),
          res8.json(),
          res9.json()
        ])
      )
      .then(([data1, data2, data3, data4, data5, data6, data7, data8, data9]) =>
        this.setState({
          Account: data1.data,
          AccountUser: data2.data,
          Inventory: data3.data,
          Items: data4.data,
          MapData: data5.data,
          SpecialPriceLevel: data6.data,
          PriceLevelItem: data7.data,
          PriceLevel: data8.data,
          Quantity: data9.data
        })
      );
  }

  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };

  getCustomerId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[3];
  };

  getTsaSplId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[4];
  };

  getTsaPlId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[5];
  };

  updateRequiredDate(event) {
    this.setState({ RequiredDate: event.target.value });
  }

  render() {
    const {
      Items,
      MapData,
      PriceLevelItem,
      Quantity,
      orderDate,
      Account,
      RequiredDate,
      remark
    } = this.state;

    //ID CONSTS
    const userID = this.getUserId();
    const custID = this.getCustomerId(); //gets customerID from the url
    const tsasplID = this.getTsaSplId(); //gets main PL from url
    const tsaplID = this.getTsaPlId(); //gets secondary PL from url
    //PLS CONSTS

    const tsapl = PriceLevelItem.filter(function(obj) {
      return obj.PriceListExternalID === tsaplID;
    });
    const tsaspl = PriceLevelItem.filter(function(obj) {
      return obj.PriceListExternalID === tsasplID;
    });
    const specialPl = MapData.filter(function(obj) {
      return obj.MainKey === tsasplID;
    });

    //RESULTS CONST

    const oe = Items.map(
      ({ ExternalID, name, Price, CaseQuantity, PicPath }) => {
        const foundSpecialPl = specialPl.find(
          e => e.SecondaryKey === ExternalID
        );
        const foundtsaspl = tsaspl.find(e => e.ItemExternalID === ExternalID);
        const foundtsapl = tsapl.find(e => e.ItemExternalID === ExternalID);
        const foundqty = Quantity.find(e => e.ItemExternalID === ExternalID);
        return {
          PicPath,
          ExternalID,
          name,
          Price: foundtsaspl
            ? foundtsaspl.Price.toFixed(2)
            : foundtsapl
            ? foundtsapl.Price.toFixed(2)
            : Price.toFixed(2),
          UnPrice: foundtsaspl
            ? (foundtsaspl.Price / CaseQuantity).toFixed(2)
            : foundtsapl
            ? (foundtsapl.Price / CaseQuantity).toFixed(2)
            : (Price / CaseQuantity).toFixed(2),
          PromoPrice: foundSpecialPl ? foundSpecialPl.Values.toFixed(2) : null,
          PromoUnPrice: foundSpecialPl
            ? (foundSpecialPl.Values / CaseQuantity).toFixed(2)
            : null,
          Quantity: foundqty ? foundqty.Quantity : ""
        };
      }
    );

    const o = Quantity.map(({ ExternalID, Quantity }) => {
      const foundOeSpl = oe.find(
        e => e.ExternalID === ExternalID && e.PromoPrice > 0
      );
      const foundOeReg = oe.find(e => e.ExternalID === ExternalID);
      const foundItems = Items.find(e => e.ExternalID === ExternalID);

      return {
        ExternalID,
        Quantity,
        Description: foundItems ? foundItems.name : "",
        Price: foundOeSpl
          ? foundOeSpl.PromoPrice
          : foundOeReg
          ? foundOeReg.Price
          : "not found",
        ExtPrice: foundOeSpl
          ? parseFloat((foundOeSpl.PromoPrice * Quantity).toFixed(2))
          : foundOeReg
          ? parseFloat((foundOeReg.Price * Quantity).toFixed(2))
          : 0
      };
    });

    if (!this.state.Checkout)
      return (
        <div>
          <Header />
          <div
            style={{
              marginTop: "15px",
              lineHeight: "45px"
            }}
          >
            <ReactTable
              data={oe}
              columns={[
                {
                  Header: "Images",
                  width: 75,
                  accessor: "PicPath",
                  Cell: cellProps => {
                    const imgPath = cellProps.row.PicPath;

                    return (
                      <img
                        src={require(`../images/${imgPath}.jpg`)}
                        style={{ maxHeight: "50px", maxWidth: "50px" }}
                        alt=""
                      />
                    );
                  }
                },
                {
                  Header: "ItemID",
                  accessor: "ExternalID",
                  width: 100
                },
                {
                  Header: "English Description",
                  accessor: "name"
                },
                {
                  Header: "Case Price",
                  accessor: "Price",
                  width: 85
                },
                {
                  Header: "Unit Price",
                  accessor: "UnPrice",
                  width: 85
                },
                {
                  Header: "Promo Price",
                  accessor: "PromoPrice",
                  width: 85
                },
                {
                  Header: "Promo UnPrice",
                  accessor: "PromoUnPrice",
                  width: 85
                },
                {
                  Header: "Quantity",
                  accessor: "Quantity",
                  width: 100,
                  Cell: this.renderEditable
                }
              ]}
              defaultPageSize={20}
            />
            <div
              style={{ fontWeight: "bold", color: "gray", marginTop: "50px" }}
            >
              Pick a delivery date *
            </div>
            <DatePicker
              className="form-control 
            dateInput"
              selected={this.state.RequiredDate}
              onChange={this.handleChange}
            />
            <div>
              <div
                style={{ fontWeight: "bold", color: "gray", marginTop: "15px" }}
              >
                Add a Remark
              </div>

              <input
                className="form-control"
                type="text"
                placeholder="Limit of 100 characters"
                style={{ width: "33%", margin: "auto" }}
                value={remark}
                onChange={this.updateRemark.bind(this)}
              />
              <button
                style={{ margin: "25px" }}
                type="button"
                className="btn btn-primary"
                onClick={() => this.setState({ Checkout: true })}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      );
    else {
      return (
        <div>
          <Header />
          <OrderConfirmation
            o={o}
            Account={Account}
            custID={custID}
            orderDate={orderDate}
            userID={userID}
            RequiredDate={RequiredDate}
            editOrder={this.editOrder}
            remark={remark}
          />
        </div>
      );
    }
  }
}

export default OrderTemplate;
