import React from "react";

const MultiFormOption = ({ updateOption, actionText, title }) => {
  return (
    <span className="ml-2 text-base font-medium text-center text-primary dark:text-secondary">
      {title}
      <button
        onClick={updateOption}
        className="ml-2 transition duration-150 ease-in text-action-dark hover:text-action-light dark:text-action-lighter dark:hover:text-action-light"
      >
        {actionText}
      </button>
    </span>
  );
};
export default MultiFormOption;
