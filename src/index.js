import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppContainer } from "react-hot-loader"; //设置这里

const render = _App => {
  ReactDOM.render(
    <AppContainer>
      <_App />
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept();
}

console.log(process.env.NODE_ENV);
