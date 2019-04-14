import React, { Component } from "react";
import Header from "./Header";
import { Button, Carousel } from "react-bootstrap";

class Home extends Component {
  getUserId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return words[2];
  };

  InventoryGetSlsId = () => {
    var str = window.location.pathname;
    var words = str.split("/");
    return "/inventory/" + words[2];
  };

  goToSalesOrder = () => {
    this.props.history.push(`/salesorder/${this.getUserId()}`);
  };

  goToCatalog = () => {
    this.props.history.push(`/catalog/${this.getUserId()}`);
  };

  goToActivities = () => {
    this.props.history.push(`/activities/${this.getUserId()}`);
  };

  goToAccounts = () => {
    this.props.history.push(`/accounts/${this.getUserId()}`);
  };

  goToRepDashboard = () => {
    this.props.history.push(`/repdashboard/${this.getUserId()}`);
  };

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div
          style={{
            position: "fixed",
            width: "100%",
            margin: "auto",
            paddingTop: "100px"
          }}
        >
          <Carousel style={{ height: "450px" }}>
            <Carousel.Item>
              <img
                src={require("../images/FrankiesSlide.jpg")}
                alt="First slide"
                style={{ height: "400px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={require("../images/WaffersLS2.jpg")}
                alt="Third slide"
                style={{ height: "400px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={require("../images/LadySarahMuffins.jpg")}
                alt="Third slide"
                style={{ height: "400px" }}
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="footer">
          <Button
            style={{
              width: "50%",
              backgroundColor: "darkturquoise",
              borderColor: "whitesmoke",
              color: "white",
              margin: "25px"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToSalesOrder()}
          >
            Sales Order
          </Button>
          <Button
            className="menu-buttons"
            style={{
              width: "50%"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToAccounts()}
          >
            Accounts
          </Button>
          <Button
            className="menu-buttons"
            style={{
              width: "50%"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToRepDashboard()}
          >
            Rep Dashboard
          </Button>
          <Button
            className="menu-buttons"
            style={{
              width: "50%"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToActivities()}
          >
            Activities
          </Button>
          <Button
            className="menu-buttons"
            style={{
              width: "50%"
            }}
            variant="light"
            size="lg"
            active
            onClick={() => this.goToCatalog()}
          >
            Catalog
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
