import React, { useEffect, useState } from "react";
import { FingerPrintIcon, AdjustmentsIcon } from "@heroicons/react/outline";

import FilterMenu from "./units/FilterMenu";

import { FilterOptions } from "../utils/types";
import { getItem, setItem } from "../utils/handleStorage";

const options = [
  {
    title: "All Public Highlights",
    value: FilterOptions.Public,
  },
  {
    title: "Only Mine",
    value: FilterOptions.Mine,
  },
  {
    title: "Only My Private Ones",
    value: FilterOptions.Private,
  },
  {
    title: "Only My Favorite ones",
    value: FilterOptions.Favourite,
  },
];

const Header = () => {
  const [todayDate, todayDateSet] = useState("");
  const [currentOption, currentOptionSet] = useState(null);

  const UpdateOption = (option) => {
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
    if (!savedOption) setItem("currentOption", options[0]);
    else currentOptionSet(savedOption);
  }, []);

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
        options={options}
        UpdateOption={UpdateOption}
        currentOption={currentOption}
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
