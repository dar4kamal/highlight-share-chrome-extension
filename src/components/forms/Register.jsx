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

import { apiPostRequest } from "../../utils/api/apiMethods";

const registerSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Register = ({ closeModal }) => {
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
      const registerStatus = await apiPostRequest("auth/register", {
        name,
        email,
        password,
      });

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
        <label
          htmlFor="name"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Name
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            registerFormik.errors.name ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <UserCircleIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            required
            id="name"
            type="name"
            name="name"
            placeholder="Enter your name"
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {registerFormik.errors.name && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {registerFormik.errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Email Address
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            registerFormik.errors.email ? "border-red-500" : ""
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
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {registerFormik.errors.email && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {registerFormik.errors.email}
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
            registerFormik.errors.password ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <LockClosedIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            required
            id="password"
            name="password"
            onBlur={registerFormik.handleBlur}
            placeholder="Enter your password"
            value={registerFormik.values.password}
            type={showPassword ? "text" : "password"}
            onChange={({ target: { value } }) =>
              registerFormik.setFieldValue("password", value)
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
        {registerFormik.errors.password && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {registerFormik.errors.password}
          </p>
        )}
      </div>

      <div className="flex w-full">
        <button
          type="submit"
          className="flex items-center justify-center w-full py-2 mt-2 text-sm text-white transition duration-150 ease-in bg-blue-500 rounded-2xl hover:bg-blue-600 focus:outline-none sm:text-base"
        >
          <span className="mr-2">Sign Up</span>
          <span>
            <ArrowCircleRightIcon className="w-6 h-6" />
          </span>
        </button>
      </div>
    </form>
  );
};

export default Register;
