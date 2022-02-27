import React from "react";
import { render } from "react-dom";

import "../styles/index.css";

import { PlusIcon } from "@heroicons/react/outline";

import Main from "../components/Main";
import Footer from "../components/Footer";
import Header from "../components/Header";

const App = () => {
  return (
    <div className="relative flex flex-col w-screen h-screen">
      <Header />
      <div className="flex-auto bg-blue-300">
        <Main />
      </div>
      <Footer />
      <div className="absolute z-50 p-3 text-white bg-blue-700 rounded-full cursor-pointer top-20 left-10 hover:bg-white hover:text-blue-700 lg:top-auto lg:bottom-20 lg:p-4">
        <PlusIcon className="w-8 h-8 lg:h-10 lg:w-10" />
      </div>
    </div>
  );
};

render(<App />, document.querySelector("#root"));
