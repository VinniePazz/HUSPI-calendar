import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./components/App", renderApp);
}

renderApp();
