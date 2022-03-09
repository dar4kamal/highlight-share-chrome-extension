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

import Spinner from "../units/Spinner";

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
            <label
              htmlFor={key}
              className="mb-1 text-sm tracking-wide text-gray-600"
            >
              {`${key.split("Password").join("")} Password`}
            </label>
            <div
              className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
                changePasswordFormik.errors[key] ? "border-red-500" : ""
              }`}
            >
              <div className="w-10 h-full pl-2 text-gray-400">
                <LockClosedIcon className="w-6 h-6 text-blue-500" />
              </div>
              <input
                required
                id={key}
                name={key}
                type={showValue ? "text" : "password"}
                value={changePasswordFormik.values[key]}
                onBlur={changePasswordFormik.handleBlur}
                onChange={({ target: { value } }) =>
                  changePasswordFormik.setFieldValue(key, value)
                }
                placeholder={`Enter ${key.split("Password").join("")} Password`}
                className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
              />
              <div
                onClick={() => action(!showValue)}
                className="w-10 h-full pl-2 text-blue-500 cursor-pointer hover:text-blue-800"
              >
                {showValue ? (
                  <EyeOffIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </div>
            </div>
            {changePasswordFormik.errors[key] && (
              <p className="pt-2 pl-2 text-sm text-red-500">
                {changePasswordFormik.errors[key]}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex w-full">
        <button
          type="submit"
          className="flex items-center justify-center w-full py-2 mt-2 text-sm text-white transition duration-150 ease-in bg-blue-500 rounded-2xl hover:bg-blue-600 focus:outline-none sm:text-base"
        >
          <p className="mr-2">Update</p>
          {loading ? (
            <Spinner size={6} />
          ) : (
            <ArrowCircleRightIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
