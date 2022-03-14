import React, { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  AtSymbolIcon,
  LockClosedIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";

import Spinner, { SpinnerTypes } from "../units/Spinner";

import setAuthToken from "../../utils/api/setAuthToken";
import { apiPostRequest } from "../../utils/api/apiMethods";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = ({ tokenSet, closeModal }) => {
  const [showPassword, showPasswordSet] = useState(false);
  const [loading, loadingSet] = useState(null);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;

      loadingSet(true);
      const token = await apiPostRequest("auth/login", { email, password });
      loadingSet(false);

      if (token) {
        setAuthToken(token);
        tokenSet(token);
        closeModal();
      }
    },
  });

  return (
    <form onSubmit={loginFormik.handleSubmit} className="space-y-5">
      <div className="flex flex-col">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <div
          className={`form-input-container ${
            loginFormik.errors.email
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
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
          />
        </div>
        {loginFormik.errors.email && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {loginFormik.errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div
          className={`form-input-container ${
            loginFormik.errors.password
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
            onBlur={loginFormik.handleBlur}
            placeholder="Enter your password"
            value={loginFormik.values.password}
            type={showPassword ? "text" : "password"}
            onChange={({ target: { value } }) =>
              loginFormik.setFieldValue("password", value)
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
        {loginFormik.errors.password && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {loginFormik.errors.password}
          </p>
        )}
      </div>

      <div className="flex w-full">
        <button type="submit" className="form-button">
          <p className="mr-2">Sign In</p>
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

export default Login;
