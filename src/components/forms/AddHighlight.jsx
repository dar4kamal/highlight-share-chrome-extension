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

import Spinner from "../units/Spinner";
import SelectInput from "../units/SelectInput";

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

const AddHighlight = ({ closeModal }) => {
  const [loading, loadingSet] = useState(null);

  const addHighlightFormik = useFormik({
    initialValues: {
      src: "",
      srcType: HighlightSrcType.Book,
      srcAuthor: "",
      content: "",
    },
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
        <label
          htmlFor="src"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Source
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            addHighlightFormik.errors.src ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <AnnotationIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            required
            id="src"
            name="src"
            type="text"
            placeholder="Enter highlight's source"
            onBlur={addHighlightFormik.handleBlur}
            value={addHighlightFormik.values.src}
            onChange={addHighlightFormik.handleChange}
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {addHighlightFormik.errors.src && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {addHighlightFormik.errors.src}
          </p>
        )}
      </div>

      {/* Source Type */}
      <div className="flex flex-col">
        <label
          htmlFor="srcType"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Source Type
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            addHighlightFormik.errors.srcType ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <CollectionIcon className="w-6 h-6 text-blue-500" />
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
          <p className="pt-2 pl-2 text-sm text-red-500">
            {addHighlightFormik.errors.srcType}
          </p>
        )}
      </div>

      {/* Source Author */}
      <div className="flex flex-col">
        <label
          htmlFor="srcAuthor"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Author
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            addHighlightFormik.errors.srcAuthor ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <IdentificationIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            required
            type="text"
            id="srcAuthor"
            name="srcAuthor"
            placeholder="Enter Highlight Author"
            onBlur={addHighlightFormik.handleBlur}
            value={addHighlightFormik.values.srcAuthor}
            onChange={({ target: { value } }) =>
              addHighlightFormik.setFieldValue("srcAuthor", value)
            }
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {addHighlightFormik.errors.srcAuthor && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {addHighlightFormik.errors.srcAuthor}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <label
          htmlFor="content"
          className="mb-1 text-sm tracking-wide text-gray-600"
        >
          Content
        </label>
        <div
          className={`flex items-center justify-start rounded-2xl border-2 border-gray-400 text-sm ${
            addHighlightFormik.errors.content ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <BookOpenIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            required
            type="text"
            id="content"
            name="content"
            onBlur={addHighlightFormik.handleBlur}
            placeholder="Enter Highlight's Content"
            value={addHighlightFormik.values.content}
            onChange={({ target: { value } }) =>
              addHighlightFormik.setFieldValue("content", value)
            }
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {addHighlightFormik.errors.content && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {addHighlightFormik.errors.content}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex w-full">
        <button
          type="submit"
          className="flex items-center justify-center w-full py-2 mt-2 text-sm text-white transition duration-150 ease-in bg-blue-500 rounded-2xl hover:bg-blue-600 focus:outline-none sm:text-base"
        >
          <p className="mr-2">Add</p>
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

export default AddHighlight;
