import React from "react";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const TogglePassword = ({ showPassword, showPasswordSet }) => {
  return (
    <div
      onClick={() => showPasswordSet(!showPassword)}
      className="h-full w-10 cursor-pointer pl-2"
    >
      {showPassword ? (
        <EyeOffIcon className="form-input-icon hover:text-action-lighter dark:hover:text-action-light" />
      ) : (
        <EyeIcon className="form-input-icon hover:text-action-lighter dark:hover:text-action-light" />
      )}
    </div>
  );
};

export default TogglePassword;
