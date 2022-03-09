import React from "react";

const SelectInput = ({
  title,
  options,
  setSelectedOption,
  selectedOption = title,
}) => {
  return (
    <div className="relative flex-auto mr-2 group">
      <select
        defaultValue={selectedOption}
        onChange={({ target: { value } }) => setSelectedOption(value)}
        className="w-full py-2 pl-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
      >
        <option value={title} disabled hidden className="text-gray-500">
          {title}
        </option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
