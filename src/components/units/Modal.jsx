import React from "react";
import { XIcon } from "@heroicons/react/outline";

const Modal = ({ title = "", showModal, closeModal, Body }) => {
  return (
    showModal && (
      <>
        <div className="fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="w-auto max-w-3xl mx-auto my-auto">
            <div className="flex flex-col w-full rounded-lg shadow-lg outline-none bg-secondary focus:outline-none dark:bg-primary">
              {/* Header */}
              <div className="flex items-start justify-between gap-5 p-5 border-b border-solid border-primary dark:border-secondary">
                <p className="text-2xl text-primary dark:text-secondary">
                  {title}
                </p>
                <div
                  title="Close"
                  onClick={closeModal}
                  className="rounded-full cursor-pointer bg-primary text-secondary hover:scale-110 hover:bg-error-dark hover:text-white dark:bg-secondary dark:text-primary dark:hover:bg-error-dark dark:hover:text-white"
                >
                  <XIcon className="w-6 h-6" />
                </div>
              </div>
              {/* Body */}
              <div className="m-10">
                <Body />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-30 opacity-50 bg-primary dark:bg-white"></div>
      </>
    )
  );
};

export default Modal;
