import React, { useState } from "react";
import {
  AtSymbolIcon,
  UserCircleIcon,
  LockClosedIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import FormItem from "../units/FormItem";
import TogglePassword from "../units/TogglePassword";
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
      {/* Name */}
      <FormItem
        required
        type="text"
        name="name"
        label="Name"
        SideIcon={UserCircleIcon}
        placeholder="Enter your name"
        errorValue={registerFormik.errors.name}
        inputValue={registerFormik.values.name}
        onBlurAction={registerFormik.handleBlur}
        onChangeAction={({ target: { value } }) =>
          registerFormik.setFieldValue("name", value)
        }
      />

      {/* Email Address */}
      <FormItem
        required
        type="email"
        name="email"
        label="Email Address"
        SideIcon={AtSymbolIcon}
        placeholder="Enter your email"
        errorValue={registerFormik.errors.email}
        inputValue={registerFormik.values.email}
        onBlurAction={registerFormik.handleBlur}
        onChangeAction={({ target: { value } }) =>
          registerFormik.setFieldValue("email", value)
        }
      />

      {/* Password */}
      <FormItem
        required
        name="password"
        label="Password"
        SideIcon={LockClosedIcon}
        placeholder="Enter your password"
        onBlurAction={registerFormik.handleBlur}
        errorValue={registerFormik.errors.password}
        inputValue={registerFormik.values.password}
        type={showPassword ? "text" : "password"}
        onChangeAction={({ target: { value } }) =>
          registerFormik.setFieldValue("password", value)
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
