import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router";

function ServerRender() {
  return (
    <StaticRouter>
      <App />
    </StaticRouter>
  );
}

let element = ServerRender();
console.log(renderToString(element));
export default renderToString(element);
