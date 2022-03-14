import React from "react";

const SelectInput = ({
  title,
  options,
  setSelectedOption,
  selectedOption = title,
}) => {
  return (
    <div className="relative flex-auto mr-2">
      <select
        defaultValue={selectedOption}
        onChange={({ target: { value } }) => setSelectedOption(value)}
        className="w-full py-2 text-sm text-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none"
      >
        <option value={title} disabled hidden>
          {title}
        </option>
        {options.map((op) => (
          <option
            key={op}
            value={op}
            className="bg-secondary text-primary dark:bg-primary dark:text-secondary"
          >
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
