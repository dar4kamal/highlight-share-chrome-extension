import React from "react";

const AuthOption = ({ updateOption, actionText, title }) => {
  return (
    <span className="ml-2 text-base">
      {title}
      <button
        onClick={updateOption}
        className="ml-2 text-blue-500 transition duration-150 ease-in hover:text-blue-800"
      >
        {actionText}
      </button>
    </span>
  );
};
export default AuthOption;
