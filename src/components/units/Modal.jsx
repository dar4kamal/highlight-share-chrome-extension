import React from "react";
import { XIcon } from "@heroicons/react/outline";

const Modal = ({ title = "", showModal, closeModal, Body }) => {
  return (
    showModal && (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="w-auto max-w-3xl mx-auto my-auto">
            <div className="flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between gap-5 p-5 border-b border-solid">
                <p className="text-2xl text-black">{title}</p>
                <div
                  title="Close"
                  onClick={closeModal}
                  className="text-white bg-red-600 rounded-full cursor-pointer hover:scale-110"
                >
                  <XIcon className="w-6 h-6" />
                </div>
              </div>
              {/* Body */}
              <div className="m-5">
                <Body />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
    )
  );
};

export default Modal;
