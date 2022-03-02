import React from "react";

const Spinner = ({ size = 10, width = 4 }) => (
  <div className="flex justify-center">
    <div
      className={`w-${size} h-${size} animate-spin rounded-full border-${width} border-white border-b-transparent`}
    />
  </div>
);

export default Spinner;
