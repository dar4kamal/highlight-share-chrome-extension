import React from "react";
import { render } from "react-dom";

import "../styles/index.css";

import Main from "../components/Main";
import Footer from "../components/Footer";
import Header from "../components/Header";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

render(<App />, document.querySelector("#root"));
