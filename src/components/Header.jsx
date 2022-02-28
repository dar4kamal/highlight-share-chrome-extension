import React from "react";
import { FingerPrintIcon, AdjustmentsIcon } from "@heroicons/react/outline";

import FilterMenu from "./units/FilterMenu";
import { FilterDisplayOptions } from "../utils/types";

const Header = ({ todayDate, currentOption, updateOption }) => {
  const showAuthModal = () => {
    // TODO: Create Auth Modal Component
    // TODO: create auth.html
    chrome.windows.create({
      url: "contextmenu.html",
      width: 500,
      height: 500,
      type: "popup",
      left: 500,
      top: 100,
    });
  };

  return (
    <div className="flex items-center justify-between h-16 text-xl text-white bg-blue-800">
      <div className="ml-5">{todayDate}</div>
      <FilterMenu
        UpdateOption={updateOption}
        currentOption={currentOption}
        options={FilterDisplayOptions}
        MenuIcon={() => (
          <div className="p-2">
            <AdjustmentsIcon className="w-8 h-8" />
          </div>
        )}
      />
      <div
        className="flex gap-1 p-5 mr-5 cursor-pointer hover:bg-white hover:bg-opacity-10 hover:stroke-2 hover:text-white"
        onClick={() => showAuthModal()}
      >
        <FingerPrintIcon className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Header;
