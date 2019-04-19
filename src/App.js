import React, { Component } from "react";

export default class App extends Component {
  componentDidMount() {
    console.log(111);
    var show = () => {
      console.log(222);
    };
    show();
  }
  handleClick = () => {
    import("./show").then(show => {
      console.log(show);
      show.default("hello webpack!!!");
    });
  };
  render() {
    return (
      <div>
        <div onClick={this.handleClick}>点击加载show.js代码</div>;
      </div>
    );
  }
}
