import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { FilterDisplayOptions } from "../../utils/types";

import { updateOption } from "../../utils/redux/actions/view";

const FilterMenu = ({ MenuIcon }) => {
  const dispatch = useDispatch();
  const viewOption = useSelector((state) => state.view);

  return (
    <div className="z-40 inline-block group">
      <div className="flex items-center px-3 py-1 rounded-sm outline-none cursor-pointer min-w-32 focus:outline-none">
        <span className="flex-1 pr-1 font-semibold">{viewOption?.title}</span>
        <MenuIcon />
      </div>
      <ul className="absolute flex flex-col gap-1 transition duration-150 ease-in-out origin-top transform scale-0 rounded-sm min-w-32 bg-secondary group-hover:scale-100 dark:bg-primary">
        {FilterDisplayOptions.filter(
          (option) => option.title !== viewOption?.title
        ).map((option, idx) => {
          return (
            <li
              key={idx}
              onClick={() => dispatch(updateOption(option))}
              className="px-3 py-1 rounded-sm cursor-pointer hover:border-l-4 hover:border-primary hover:bg-white hover:text-primary dark:hover:border-action-lighter dark:hover:bg-secondary"
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
