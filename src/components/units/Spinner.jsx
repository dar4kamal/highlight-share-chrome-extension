import React from "react";

export const SpinnerTypes = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});

const Spinner = ({ type = SpinnerTypes.MEDIUM }) => {
  let size;
  switch (type) {
    case SpinnerTypes.SMALL:
      size = "w-6 h-6";
      break;
    case SpinnerTypes.MEDIUM:
      size = "w-8 h-8";
      break;
    case SpinnerTypes.LARGE:
      size = "w-10 h-10";
      break;
  }
  return (
    <div className="flex justify-center">
      <div
        className={`${size} animate-spin rounded-full border-4 border-primary border-b-transparent dark:border-secondary dark:border-b-transparent`}
      />
    </div>
  );
};

export default Spinner;
