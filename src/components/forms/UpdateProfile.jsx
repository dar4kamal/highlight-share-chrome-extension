import React, { useState, useEffect } from "react";
import {
  AtSymbolIcon,
  UserCircleIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import FormItem from "../units/FormItem";
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
      email: user?.email ?? "",
      name: user?.name ?? "",
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
      <FormItem
        required
        type="text"
        name="name"
        label="Name"
        SideIcon={UserCircleIcon}
        placeholder="Enter your name"
        errorValue={updateProfileFormik.errors.name}
        inputValue={updateProfileFormik.values.name}
        onBlurAction={updateProfileFormik.handleBlur}
        onChangeAction={({ target: { value } }) =>
          updateProfileFormik.setFieldValue("name", value)
        }
      />

      {/* Email Section  */}
      <FormItem
        required
        type="email"
        name="email"
        label="Email Address"
        SideIcon={AtSymbolIcon}
        placeholder="Enter your email"
        errorValue={updateProfileFormik.errors.email}
        inputValue={updateProfileFormik.values.email}
        onBlurAction={updateProfileFormik.handleBlur}
        onChangeAction={({ target: { value } }) =>
          updateProfileFormik.setFieldValue("email", value)
        }
      />

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
