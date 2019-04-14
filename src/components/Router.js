import React, { Component } from "react";
import App from "../App";
import Home from "./Home";
import Inventory from "./Inventory";
import OrderTemplate from "./OrderTemplate";
import SalesOrder from "./SalesOrder";
import Activities from "./Activities";
import OrderDetails from "./OrderDetails";
import Accounts from "./Accounts";
import AccountDashboard from "./AccountDashboard";
import RepDashboard from "./RepDashboard";
import Articles from "./Articles";
import Catalog from "./Catalog";
import Notes from "./Notes";
import NotesAdd from "./NotesAdd";

import { BrowserRouter, Switch, Route } from "react-router-dom";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route>
            <div>
              <Route exact path="/" component={App} />
              <Route path="/home/:auth" component={Home} />
              <Route path="/inventory/:auth" component={Inventory} />
              <Route path="/salesorder/:auth" component={SalesOrder} />
              <Route path="/activities/:auth" component={Activities} />
              <Route path="/accounts/:auth" component={Accounts} />
              <Route
                path="/accountdashboard/:auth"
                component={AccountDashboard}
              />
              <Route path="/repdashboard/:auth" component={RepDashboard} />
              <Route path="/orderdetails/:auth" component={OrderDetails} />
              <Route path="/articles/:auth" component={Articles} />
              <Route path="/catalog/:auth" component={Catalog} />
              <Route path="/notes/:auth" component={Notes} />
              <Route path="/notesadd/:auth" component={NotesAdd} />
              <Route
                path="/ordertemplate/:customerId"
                component={OrderTemplate}
              />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
