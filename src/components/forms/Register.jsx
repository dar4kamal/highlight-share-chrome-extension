import React, { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  AtSymbolIcon,
  UserCircleIcon,
  LockClosedIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Spinner, { SpinnerTypes } from "../units/Spinner";

import { apiPostRequest } from "../../utils/api/apiMethods";

const registerSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Register = ({ closeModal }) => {
  const [loading, loadingSet] = useState(null);
  const [showPassword, showPasswordSet] = useState(false);

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { name, email, password } = values;

      loadingSet(true);
      const registerStatus = await apiPostRequest("auth/register", {
        name,
        email,
        password,
      });
      loadingSet(false);

      if (registerStatus) {
        toast.success(registerStatus);
        toast.success("Now, You can Login", { autoClose: 4000 });
        closeModal();
      }
    },
  });

  return (
    <form onSubmit={registerFormik.handleSubmit} className="space-y-5">
      <div className="flex flex-col">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <div
          className={`form-input-container ${
            registerFormik.errors.name
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="h-full w-10 pl-2">
            <UserCircleIcon className="form-input-icon" />
          </div>
          <input
            required
            id="name"
            type="name"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
          />
        </div>
        {registerFormik.errors.name && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {registerFormik.errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <div
          className={`form-input-container ${
            registerFormik.errors.email
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="h-full w-10 pl-2">
            <AtSymbolIcon className="form-input-icon" />
          </div>
          <input
            required
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
          />
        </div>
        {registerFormik.errors.email && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {registerFormik.errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div
          className={`form-input-container ${
            registerFormik.errors.password
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="h-full w-10 pl-2">
            <LockClosedIcon className="form-input-icon" />
          </div>
          <input
            required
            id="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.password}
            type={showPassword ? "text" : "password"}
            onChange={({ target: { value } }) =>
              registerFormik.setFieldValue("password", value)
            }
          />
          <div
            onClick={() => showPasswordSet(!showPassword)}
            className="h-full w-10 cursor-pointer pl-2"
          >
            {showPassword ? (
              <EyeOffIcon className="form-input-icon hover:text-action-lighter dark:hover:text-action-light" />
            ) : (
              <EyeIcon className="form-input-icon hover:text-action-lighter dark:hover:text-action-light" />
            )}
          </div>
        </div>
        {registerFormik.errors.password && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {registerFormik.errors.password}
          </p>
        )}
      </div>

      <div className="flex w-full">
        <button type="submit" className="form-button">
          <p className="mr-2">Sign Up</p>
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

export default Register;
