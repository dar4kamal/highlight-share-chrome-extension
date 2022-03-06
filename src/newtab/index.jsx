import React, { useEffect, useState } from "react";
import { render } from "react-dom";

import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import { PlusIcon } from "@heroicons/react/outline";
import { toast, ToastContainer } from "react-toastify";

import Main from "../components/Main";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/units/Modal";
import AddHighlight from "../components/forms/AddHighlight";

import { getItem, setItem } from "../utils/handleStorage";
import { FilterDisplayOptions } from "../utils/types";

toast.configure({
  autoClose: 2000,
  pauseOnHover: true,
  newestOnTop: false,
});

const App = () => {
  const [todayDate, todayDateSet] = useState("");
  const [currentOption, currentOptionSet] = useState(null);
  const [showAddModal, showAddModalSet] = useState(null);

  const updateOption = (option) => {
    setItem("currentOption", option);
    currentOptionSet(option);
  };

  useEffect(async () => {
    todayDateSet(
      new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
    const savedOption = await getItem("currentOption");
    if (!savedOption) setItem("currentOption", FilterDisplayOptions[0]);
    else currentOptionSet(savedOption);
  }, []);

  return (
    <div className="relative flex flex-col w-screen h-screen">
      <Modal
        title="Add New Highlight"
        showModal={showAddModal}
        closeModal={() => showAddModalSet(false)}
        Body={() => <AddHighlight closeModal={() => showAddModalSet(false)} />}
      />
      <Header
        todayDate={todayDate}
        updateOption={updateOption}
        currentOption={currentOption}
      />
      <div className="flex-auto bg-blue-300">
        <Main currentOption={currentOption} />
      </div>
      <Footer />
      <div
        onClick={() => showAddModalSet(true)}
        className="absolute z-50 p-3 text-white bg-blue-700 rounded-full cursor-pointer top-20 left-10 hover:bg-white hover:text-blue-700 lg:top-auto lg:bottom-20 lg:p-4"
      >
        <PlusIcon className="w-8 h-8 lg:h-10 lg:w-10" />
      </div>
      <ToastContainer />
    </div>
  );
};

render(<App />, document.querySelector("#root"));
