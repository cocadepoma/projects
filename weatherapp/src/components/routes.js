import React, { Component } from "react";

import Home from "../pages/home";
import City from "../pages/city";
import Favourites from "../pages/favourites";
import Contact from "../pages/contact";
import Week from "../pages/week";

import { Route, Switch, Redirect } from "react-router-dom";
export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/home" component={Home} />

                <Route exact path="/city/:city" component={City} />

                <Route exact path="/favourites" component={Favourites} />

                <Route exact path="/week/:city" component={Week} />

                <Route exact path="/contact" component={Contact} />

                <Redirect to="/home" />
            </Switch>
        );
    }
}
