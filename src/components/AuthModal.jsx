import React, { useState } from "react";

import Login from "./forms/Login";
import Register from "./forms/Register";

import MultiFormOption from "./units/MultiFormOption";

const AuthModal = (props) => {
  const [islogging, isloggingSet] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col py-5 border-b border-solid border-primary dark:border-secondary">
        {islogging ? <Login {...props} /> : <Register {...props} />}
      </div>
      <div className="flex items-center justify-center mt-6">
        <div className="inline-flex items-center">
          <MultiFormOption
            actionText={`${islogging ? "Sign Up" : "Sign In"}`}
            title={`${
              islogging
                ? "You don't have an account ?"
                : "Already have an account ?"
            }`}
            updateOption={() => isloggingSet(!islogging)}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
