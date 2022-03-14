import React, { useState } from "react";
import {
  BookOpenIcon,
  AnnotationIcon,
  CollectionIcon,
  IdentificationIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import SelectInput from "../units/SelectInput";
import Spinner, { SpinnerTypes } from "../units/Spinner";

import { HighlightSrcType } from "../../utils/types";
import { apiPostRequest } from "../../utils/api/apiMethods";

const addHighlightSchema = Yup.object({
  src: Yup.string().required("Source is Required"),
  srcType: Yup.mixed()
    .oneOf(Object.keys(HighlightSrcType))
    .required("Source Type is Required"),
  srcAuthor: Yup.string().required("Source Author is Required"),
  content: Yup.string().required("Highlight Content is Required"),
});

const AddHighlight = ({ closeModal, initialValues }) => {
  const [loading, loadingSet] = useState(null);

  const addHighlightFormik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: addHighlightSchema,
    onSubmit: async (values) => {
      loadingSet(true);
      const addResult = await apiPostRequest("highlights", values);
      loadingSet(false);

      if (addResult) {
        toast.success(addResult);
        closeModal();
      }
    },
  });

  return (
    <form onSubmit={addHighlightFormik.handleSubmit} className="space-y-5">
      {/* Source */}
      <div className="flex flex-col">
        <label htmlFor="src" className="form-label">
          Source
        </label>
        <div
          className={`form-input-container ${
            addHighlightFormik.errors.src
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="w-10 h-full pl-2">
            <AnnotationIcon className="form-input-icon" />
          </div>
          <input
            required
            id="src"
            name="src"
            type="text"
            className="form-input"
            placeholder="Enter highlight's source"
            onBlur={addHighlightFormik.handleBlur}
            value={addHighlightFormik.values.src}
            onChange={addHighlightFormik.handleChange}
          />
        </div>
        {addHighlightFormik.errors.src && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {addHighlightFormik.errors.src}
          </p>
        )}
      </div>

      {/* Source Type */}
      <div className="flex flex-col">
        <label htmlFor="srcType" className="form-label">
          Source Type
        </label>
        <div
          className={`form-input-container ${
            addHighlightFormik.errors.srcType
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="w-10 h-full pl-2">
            <CollectionIcon className="form-input-icon" />
          </div>

          <SelectInput
            title="Select Type"
            options={Object.keys(HighlightSrcType)}
            setSelectedOption={(option) =>
              addHighlightFormik.setFieldValue("srcType", option)
            }
          />
        </div>
        {addHighlightFormik.errors.srcType && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {addHighlightFormik.errors.srcType}
          </p>
        )}
      </div>

      {/* Source Author */}
      <div className="flex flex-col">
        <label htmlFor="srcAuthor" className="form-label">
          Author
        </label>
        <div
          className={`form-input-container ${
            addHighlightFormik.errors.srcAuthor
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="w-10 h-full pl-2">
            <IdentificationIcon className="form-input-icon" />
          </div>
          <input
            required
            type="text"
            id="srcAuthor"
            name="srcAuthor"
            className="form-input"
            placeholder="Enter Highlight Author"
            onBlur={addHighlightFormik.handleBlur}
            value={addHighlightFormik.values.srcAuthor}
            onChange={({ target: { value } }) =>
              addHighlightFormik.setFieldValue("srcAuthor", value)
            }
          />
        </div>
        {addHighlightFormik.errors.srcAuthor && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {addHighlightFormik.errors.srcAuthor}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <div
          className={`form-input-container ${
            addHighlightFormik.errors.content
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="w-10 h-full pl-2">
            <BookOpenIcon className="form-input-icon" />
          </div>
          <textarea
            id="content"
            name="content"
            autoCorrect="on"
            onBlur={addHighlightFormik.handleBlur}
            placeholder="Enter Highlight's Content"
            value={addHighlightFormik.values.content}
            onChange={({ target: { value } }) =>
              addHighlightFormik.setFieldValue("content", value)
            }
          />
        </div>
        {addHighlightFormik.errors.content && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {addHighlightFormik.errors.content}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex w-full">
        <button type="submit" className="form-button">
          <p className="mr-2">Add</p>
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

export default AddHighlight;
