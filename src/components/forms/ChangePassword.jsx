import React, { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LockClosedIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Spinner, { SpinnerTypes } from "../units/Spinner";

import { apiPostRequest } from "../../utils/api/apiMethods";

const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old Password is Required").required(),
  newPassword: Yup.string().required("New Password is Required").required(),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .required(),
});

const ChangePassword = ({ closeModal }) => {
  const [loading, loadingSet] = useState(null);
  const [showOldPassword, showOldPasswordSet] = useState(false);
  const [showNewPassword, showNewPasswordSet] = useState(false);
  const [showConfirmPassword, showConfirmPasswordSet] = useState(false);

  const changePasswordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      const { oldPassword, newPassword, confirmPassword } = values;

      if (newPassword !== confirmPassword) toast.error("Passwords Don't match");
      else {
        loadingSet(true);
        const updateStatus = await apiPostRequest("auth/credentials", {
          oldPassword,
          newPassword,
          confirmPassword,
        });
        loadingSet(false);

        if (updateStatus) {
          toast.success(updateStatus);
          closeModal();
        }
      }
    },
  });

  const showOptions = (key) => {
    switch (key) {
      case "oldPassword":
        return { showValue: showOldPassword, action: showOldPasswordSet };
      case "newPassword":
        return { showValue: showNewPassword, action: showNewPasswordSet };
      case "confirmPassword":
        return {
          showValue: showConfirmPassword,
          action: showConfirmPasswordSet,
        };
    }
  };

  return (
    <form onSubmit={changePasswordFormik.handleSubmit} className="space-y-5">
      {Object.keys(changePasswordFormik.values).map((key) => {
        const { showValue, action } = showOptions(key);

        return (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="form-label">
              {`${key.split("Password").join("")} Password`}
            </label>
            <div
              className={`form-input-container ${
                changePasswordFormik.errors[key]
                  ? "border-error-dark dark:border-error-dark"
                  : ""
              }`}
            >
              <div className="h-full w-10 pl-2">
                <LockClosedIcon className="form-input-icon" />
              </div>
              <input
                required
                id={key}
                name={key}
                className="form-input"
                type={showValue ? "text" : "password"}
                value={changePasswordFormik.values[key]}
                onBlur={changePasswordFormik.handleBlur}
                onChange={({ target: { value } }) =>
                  changePasswordFormik.setFieldValue(key, value)
                }
                placeholder={`Enter ${key.split("Password").join("")} Password`}
              />
              <div
                onClick={() => action(!showValue)}
                className="h-full w-10 cursor-pointer pl-2"
              >
                {showValue ? (
                  <EyeOffIcon className="form-input-icon hover:text-action-lighter dark:hover:text-action-light" />
                ) : (
                  <EyeIcon className="form-input-icon hover:text-action-lighter dark:hover:text-action-light" />
                )}
              </div>
            </div>
            {changePasswordFormik.errors[key] && (
              <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
                {changePasswordFormik.errors[key]}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex w-full">
        <button type="submit" className="form-button">
          <p className="mr-2">Update</p>
          {loading ? (
            <Spinner type={SpinnerTypes.SMALL} />
          ) : (
            <ArrowCircleRightIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
