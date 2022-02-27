import React from "react";

const FilterMenu = ({ options, MenuIcon, currentOption, UpdateOption }) => {
  return (
    <div className="z-50 inline-block group">
      <div className="flex items-center px-3 py-1 rounded-sm outline-none cursor-pointer min-w-32 focus:outline-none">
        <span className="flex-1 pr-1 font-semibold">
          {currentOption?.title}
        </span>
        <MenuIcon />
      </div>
      <ul className="absolute flex flex-col gap-1 transition duration-150 ease-in-out origin-top transform scale-0 bg-blue-800 rounded-sm min-w-32 group-hover:scale-100">
        {options
          .filter((option) => option.title !== currentOption?.title)
          .map((option, idx) => {
            return (
              <li
                key={idx}
                onClick={() => UpdateOption(option)}
                className="px-3 py-1 rounded-sm cursor-pointer hover:bg-gray-100 hover:text-blue-800"
              >
                {option?.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default FilterMenu;
