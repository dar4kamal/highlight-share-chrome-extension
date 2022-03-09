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
        <label
          htmlFor="name"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Name
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            updateProfileFormik.errors.name ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <UserCircleIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            id="name"
            type="name"
            name="name"
            placeholder="Enter your name"
            onBlur={updateProfileFormik.handleBlur}
            value={updateProfileFormik.values.name}
            onChange={updateProfileFormik.handleChange}
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {updateProfileFormik.errors.name && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {updateProfileFormik.errors.name}
          </p>
        )}
      </div>

      {/* Email Section  */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Email Address
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            updateProfileFormik.errors.email ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <AtSymbolIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            onBlur={updateProfileFormik.handleBlur}
            value={updateProfileFormik.values.email}
            onChange={updateProfileFormik.handleChange}
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {updateProfileFormik.errors.email && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {updateProfileFormik.errors.email}
          </p>
        )}
      </div>

      <div className="flex w-full">
        <button
          type="submit"
          className="flex items-center justify-center w-full py-2 mt-2 text-sm text-white transition duration-150 ease-in bg-blue-500 rounded-2xl hover:bg-blue-600 focus:outline-none sm:text-base"
        >
          <p className="mr-2">Update</p>
          {loading ? (
            <Spinner type={SpinnerTypes.SMALL} />
          ) : (
            <ArrowCircleRightIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
