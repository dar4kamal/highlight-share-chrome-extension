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

import Spinner from "../units/Spinner";

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
        <label
          htmlFor="email"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Email Address
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            loginFormik.errors.email ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <AtSymbolIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            required
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {loginFormik.errors.email && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {loginFormik.errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Password
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            loginFormik.errors.password ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <LockClosedIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            required
            id="password"
            name="password"
            onBlur={loginFormik.handleBlur}
            placeholder="Enter your password"
            value={loginFormik.values.password}
            type={showPassword ? "text" : "password"}
            onChange={({ target: { value } }) =>
              loginFormik.setFieldValue("password", value)
            }
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
          <div
            onClick={() => showPasswordSet(!showPassword)}
            className="w-10 h-full pl-2 text-blue-500 cursor-pointer hover:text-blue-800"
          >
            {showPassword ? (
              <EyeOffIcon className="w-6 h-6" />
            ) : (
              <EyeIcon className="w-6 h-6" />
            )}
          </div>
        </div>
        {loginFormik.errors.password && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {loginFormik.errors.password}
          </p>
        )}
      </div>

      <div className="flex w-full">
        <button
          type="submit"
          className="flex items-center justify-center w-full py-2 mt-2 text-sm text-white transition duration-150 ease-in bg-blue-500 rounded-2xl hover:bg-blue-600 focus:outline-none sm:text-base"
        >
          <p className="mr-2">Sign In</p>
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

export default Login;
