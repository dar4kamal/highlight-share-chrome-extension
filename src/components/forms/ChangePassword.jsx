import React, { useState } from "react";
import { LockClosedIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import FormItem from "../units/FormItem";
import TogglePassword from "../units/TogglePassword";
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
          <FormItem
            required
            key={key}
            name={key}
            isPasswordInput={true}
            SideIcon={LockClosedIcon}
            type={showValue ? "text" : "password"}
            inputValue={changePasswordFormik.values[key]}
            errorValue={changePasswordFormik.errors[key]}
            onBlurAction={changePasswordFormik.handleBlur}
            label={`${key.split("Password").join("")} Password`}
            placeholder={`Enter ${key.split("Password").join("")} Password`}
            TogglePassword={
              <TogglePassword
                showPassword={showValue}
                showPasswordSet={action}
              />
            }
            onChangeAction={({ target: { value } }) =>
              changePasswordFormik.setFieldValue(key, value)
            }
          />
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
