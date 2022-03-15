import React from "react";

const SelectInput = ({
  title,
  options,
  setSelectedOption,
  selectedOption = title,
}) => {
  return (
    <div className="relative mr-2 flex-auto">
      <select
        defaultValue={selectedOption}
        onChange={({ target: { value } }) => setSelectedOption(value)}
        className="w-full rounded-md bg-transparent py-2 text-sm text-gray-500 shadow-sm valid:text-primary focus:outline-none dark:valid:text-secondary"
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
