import React, { useState, useEffect } from "react";
import {
  AtSymbolIcon,
  UserCircleIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Spinner, { SpinnerTypes } from "../units/Spinner";

import { getItem } from "../../utils/handleStorage";
import { apiPatchRequest } from "../../utils/api/apiMethods";

const profileSchema = Yup.object({
  email: Yup.string().email("Invalid email address"),
  name: Yup.string(),
});

const UpdateProfile = ({ closeModal }) => {
  const [user, userSet] = useState(null);
  const [loading, loadingSet] = useState(null);

  useEffect(() => {
    const fetchContent = async () => userSet(await getItem("userInfo"));
    fetchContent();
  }, []);

  const updateProfileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email,
      name: user?.name,
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      const { email, name } = values;

      if (name !== user?.name || email !== user?.email) {
        loadingSet(true);
        const updateResult = await apiPatchRequest("user", { email, name });
        loadingSet(false);

        if (updateResult) {
          toast.success(updateResult);
          closeModal();
        }
      } else toast.warn("Nothing Have Changed ....");
    },
  });

  return (
    <form onSubmit={updateProfileFormik.handleSubmit} className="space-y-5">
      {/* Name Section  */}
      <div className="flex flex-col">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <div
          className={`form-input-container ${
            updateProfileFormik.errors.name
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="h-full w-10 pl-2">
            <UserCircleIcon className="form-input-icon" />
          </div>
          <input
            id="name"
            type="name"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            onBlur={updateProfileFormik.handleBlur}
            value={updateProfileFormik.values.name}
            onChange={updateProfileFormik.handleChange}
          />
        </div>
        {updateProfileFormik.errors.name && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {updateProfileFormik.errors.name}
          </p>
        )}
      </div>

      {/* Email Section  */}
      <div className="flex flex-col">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <div
          className={`form-input-container ${
            updateProfileFormik.errors.email
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="h-full w-10 pl-2">
            <AtSymbolIcon className="form-input-icon" />
          </div>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            onBlur={updateProfileFormik.handleBlur}
            value={updateProfileFormik.values.email}
            onChange={updateProfileFormik.handleChange}
          />
        </div>
        {updateProfileFormik.errors.email && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {updateProfileFormik.errors.email}
          </p>
        )}
      </div>

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

export default UpdateProfile;
