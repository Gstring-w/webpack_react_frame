import React, { Component } from "react";
import { HashRouter, Route, Link } from "react-router-dom";

import asyncComponent from "./asyncComponent";
import homePage from "./homePage";

import "./App.scss";
export default class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <div className="wrapper">
            <nav>
              <Link to="/">Home</Link> |<Link to="/about">about</Link> |
              <Link to="/login">login</Link>
            </nav>

            <Route exact path="/" component={homePage} />
            <Route
              exact
              path="/about"
              component={asyncComponent(() => import("./pageAbout"))}
            />
          </div>
        </HashRouter>
      </div>
    );
  }
}
