import React from "react";

const ErrorCard = ({ message }) => (
  <div className="flex items-center justify-center w-full grid-cols-4 gap-5 lg:mt-10 lg:justify-start">
    <div className="p-5 bg-white rounded-xl text-primary dark:bg-secondary">
      {message}
    </div>
  </div>
);

export default ErrorCard;
