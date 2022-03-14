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

import SelectInput from "../units/SelectInput";
import Spinner, { SpinnerTypes } from "../units/Spinner";

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
        <label htmlFor="src" className="form-label">
          Source
        </label>
        <div
          className={`form-input-container ${
            updateProfileFormik.errors.src
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="w-10 h-full pl-2">
            <AnnotationIcon className="form-input-icon" />
          </div>
          <input
            id="src"
            name="src"
            type="text"
            className="form-input"
            placeholder="Enter highlight's source"
            onBlur={updateProfileFormik.handleBlur}
            value={updateProfileFormik.values.src}
            onChange={updateProfileFormik.handleChange}
          />
        </div>
        {updateProfileFormik.errors.src && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {updateProfileFormik.errors.src}
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
            updateProfileFormik.errors.srcType
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
            selectedOption={updateProfileFormik.values.srcType}
            setSelectedOption={(option) =>
              updateProfileFormik.setFieldValue("srcType", option)
            }
          />
        </div>
        {updateProfileFormik.errors.srcType && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {updateProfileFormik.errors.srcType}
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
            updateProfileFormik.errors.srcAuthor
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="w-10 h-full pl-2">
            <IdentificationIcon className="form-input-icon" />
          </div>
          <input
            type="text"
            id="srcAuthor"
            name="srcAuthor"
            className="form-input"
            placeholder="Enter Highlight Author"
            onBlur={updateProfileFormik.handleBlur}
            value={updateProfileFormik.values.srcAuthor}
            onChange={({ target: { value } }) =>
              updateProfileFormik.setFieldValue("srcAuthor", value)
            }
          />
        </div>
        {updateProfileFormik.errors.srcAuthor && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {updateProfileFormik.errors.srcAuthor}
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
            updateProfileFormik.errors.content
              ? "border-error-dark dark:border-error-dark"
              : ""
          }`}
        >
          <div className="w-10 h-full pl-2">
            <BookOpenIcon className="form-input-icon" />
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
          />
        </div>
        {updateProfileFormik.errors.content && (
          <p className="pt-2 pl-2 text-sm text-error-dark dark:text-error-light">
            {updateProfileFormik.errors.content}
          </p>
        )}
      </div>

      <div className="flex w-full">
        <button type="submit" className="form-button">
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

export default UpdateHighlight;
