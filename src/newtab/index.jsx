import React, { useState, useEffect } from "react";
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
import { FilterDisplayOptions, HighlightSrcType } from "../utils/types";

toast.configure({
  autoClose: 2000,
  pauseOnHover: true,
  newestOnTop: false,
});

const App = () => {
  const [user, userSet] = useState(null);
  const [onAction, onActionSet] = useState(false);
  const [showAddModal, showAddModalSet] = useState(null);
  const [currentOption, currentOptionSet] = useState(null);

  const updateOption = (option) => {
    setItem("currentOption", option);
    currentOptionSet(option);
  };

  useEffect(async () => {
    const savedOption = await getItem("currentOption");
    if (!savedOption) setItem("currentOption", FilterDisplayOptions[0]);
    else currentOptionSet(savedOption);
  }, [currentOption?.value]);

  return (
    <div className="relative flex flex-col w-screen h-screen">
      <Modal
        title="Add New Highlight"
        showModal={showAddModal}
        closeModal={() => {
          showAddModalSet(false);
          onActionSet(!onAction);
        }}
        Body={() => (
          <AddHighlight
            closeModal={() => showAddModalSet(false)}
            initialValues={{
              src: "",
              srcType: HighlightSrcType.Book,
              srcAuthor: "",
              content: "",
            }}
          />
        )}
      />
      <Header
        currentUser={user}
        currentUserSet={userSet}
        updateOption={updateOption}
        currentOption={currentOption}
      />
      <div className="flex-auto bg-secondary dark:bg-primary">
        <Main
          currentUser={user}
          currentOption={currentOption}
          onAction={onAction}
          onActionSet={onActionSet}
        />
      </div>
      <Footer />
      <div
        onClick={() => showAddModalSet(true)}
        className="fixed z-40 p-3 text-white rounded-full cursor-pointer right-10 bottom-36 bg-action-dark hover:bg-white hover:text-action-dark md:bottom-20 md:p-4 lg:mb-5 xs:bottom-16"
      >
        <PlusIcon className="w-6 h-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
      </div>
      <ToastContainer bodyClassName="text-lg" />
    </div>
  );
};

render(<App />, document.querySelector("#root"));
