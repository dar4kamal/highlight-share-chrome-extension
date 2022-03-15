import React from "react";

const FormItem = ({
  type,
  name,
  label,
  SideIcon,
  required,
  errorValue,
  inputValue,
  placeholder,
  onBlurAction,
  onChangeAction,
  isCustomInput = false,
  isPasswordInput = false,
  CustomInput = () => <></>,
  TogglePassword = () => <></>,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="src" className="form-label">
        {label}
      </label>
      <div
        className={`form-input-container ${
          errorValue
            ? "border-error-dark dark:border-error-dark"
            : "border-primary dark:border-secondary"
        }`}
      >
        <div className="h-full w-10 pl-2">
          <SideIcon className="form-input-icon" />
        </div>
        {isCustomInput ? (
          CustomInput
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={inputValue}
            required={required}
            onBlur={onBlurAction}
            className="form-input"
            onChange={onChangeAction}
            placeholder={placeholder}
          />
        )}
        {isPasswordInput && TogglePassword}
      </div>
      {errorValue && (
        <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
          {errorValue}
        </p>
      )}
    </div>
  );
};

export default FormItem;
