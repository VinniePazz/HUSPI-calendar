import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", renderApp);
}

renderApp();
