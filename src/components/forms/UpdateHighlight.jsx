import React, { useState } from "react";
import {
  BookOpenIcon,
  CollectionIcon,
  AnnotationIcon,
  IdentificationIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Spinner from "../units/Spinner";
import SelectInput from "../units/SelectInput";

import { HighlightSrcType } from "../../utils/types";
import { apiPatchRequest } from "../../utils/api/apiMethods";

const updateHighlightSchema = Yup.object({
  src: Yup.string(),
  srcType: Yup.mixed().oneOf(Object.keys(HighlightSrcType)),
  srcAuthor: Yup.string(),
  content: Yup.string(),
});

const UpdateHighlight = ({ closeModal, highlightId, details }) => {
  const [loading, loadingSet] = useState(null);

  const isHighlightChanged = (changes) => {
    const { src, srcType, srcAuthor, content } = details;
    if (
      src !== changes.src ||
      srcType !== changes.srcType ||
      srcAuthor !== changes.srcAuthor ||
      content !== changes.content
    )
      return true;
    else return false;
  };

  const updateProfileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      src: details?.src,
      srcType: details?.srcType,
      srcAuthor: details?.srcAuthor,
      content: details?.content,
    },
    validationSchema: updateHighlightSchema,
    onSubmit: async (values) => {
      const { src, srcType, srcAuthor, content } = values;

      console.log({ values, isChanged: isHighlightChanged(values) });

      if (isHighlightChanged(values)) {
        loadingSet(true);
        const updateResult = await apiPatchRequest(
          `highlights/${highlightId}`,
          {
            src,
            srcType,
            srcAuthor,
            content,
          }
        );
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
            updateProfileFormik.errors.src ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <AnnotationIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            id="src"
            name="src"
            type="text"
            placeholder="Enter highlight's source"
            onBlur={updateProfileFormik.handleBlur}
            value={updateProfileFormik.values.src}
            onChange={updateProfileFormik.handleChange}
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {updateProfileFormik.errors.src && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {updateProfileFormik.errors.src}
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
            updateProfileFormik.errors.srcType ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <CollectionIcon className="w-6 h-6 text-blue-500" />
          </div>

          <SelectInput
            title="Select Type"
            options={Object.keys(HighlightSrcType)}
            selectedOption={updateProfileFormik.values.srcType}
            setSelectedOption={(option) =>
              updateProfileFormik.setFieldValue("srcType", option)
            }
          />
        </div>
        {updateProfileFormik.errors.srcType && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {updateProfileFormik.errors.srcType}
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
            updateProfileFormik.errors.srcAuthor ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <IdentificationIcon className="w-6 h-6 text-blue-500" />
          </div>
          <input
            type="text"
            id="srcAuthor"
            name="srcAuthor"
            placeholder="Enter Highlight Author"
            onBlur={updateProfileFormik.handleBlur}
            value={updateProfileFormik.values.srcAuthor}
            onChange={({ target: { value } }) =>
              updateProfileFormik.setFieldValue("srcAuthor", value)
            }
            className="py-2 mr-2 placeholder-gray-500 bg-transparent focus:border-blue-400 focus:outline-none"
          />
        </div>
        {updateProfileFormik.errors.srcAuthor && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {updateProfileFormik.errors.srcAuthor}
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
            updateProfileFormik.errors.content ? "border-red-500" : ""
          }`}
        >
          <div className="w-10 h-full pl-2 text-gray-400">
            <BookOpenIcon className="w-6 h-6 text-blue-500" />
          </div>
          <textarea
            cols="50"
            id="content"
            name="content"
            autoCorrect="on"
            onBlur={updateProfileFormik.handleBlur}
            placeholder="Enter Highlight's Content"
            value={updateProfileFormik.values.content}
            onChange={({ target: { value } }) =>
              updateProfileFormik.setFieldValue("content", value)
            }
            class="mr-2 w-full resize-none appearance-none rounded bg-transparent py-2 px-4 leading-relaxed tracking-wide placeholder-gray-500 focus:border-blue-400 focus:bg-white focus:outline-none"
          />
        </div>
        {updateProfileFormik.errors.content && (
          <p className="pt-2 pl-2 text-sm text-red-500">
            {updateProfileFormik.errors.content}
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
            <Spinner size={6} />
          ) : (
            <ArrowCircleRightIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateHighlight;
