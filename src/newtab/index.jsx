import React from "react";
import { render } from "react-dom";

import "../styles/index.css";

const App = () => {
  return <div className="m-5 text-3xl text-indigo-500">App</div>;
};

render(<App />, document.querySelector("#root"));
