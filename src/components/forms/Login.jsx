import React, { useState } from "react";
import {
  AtSymbolIcon,
  LockClosedIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";

import FormItem from "../units/FormItem";
import TogglePassword from "../units/TogglePassword";
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
      {/* Email */}
      <FormItem
        required
        type="email"
        name="email"
        label="Email Address"
        SideIcon={AtSymbolIcon}
        placeholder="Enter your email"
        errorValue={loginFormik.errors.email}
        inputValue={loginFormik.values.email}
        onBlurAction={loginFormik.handleBlur}
        onChangeAction={({ target: { value } }) =>
          loginFormik.setFieldValue("email", value)
        }
      />

      {/* Password */}
      <FormItem
        required
        name="password"
        label="Password"
        SideIcon={LockClosedIcon}
        placeholder="Enter your password"
        onBlurAction={loginFormik.handleBlur}
        errorValue={loginFormik.errors.password}
        inputValue={loginFormik.values.password}
        type={showPassword ? "text" : "password"}
        onChangeAction={({ target: { value } }) =>
          loginFormik.setFieldValue("password", value)
        }
        isPasswordInput={true}
        TogglePassword={
          <TogglePassword
            showPassword={showPassword}
            showPasswordSet={showPasswordSet}
          />
        }
      />

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
