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

import FormItem from "../units/FormItem";
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
      <FormItem
        required
        name="src"
        type="text"
        label="Source"
        SideIcon={AnnotationIcon}
        placeholder="Enter highlight's source"
        errorValue={addHighlightFormik.errors.src}
        inputValue={addHighlightFormik.values.src}
        onBlurAction={addHighlightFormik.handleBlur}
        onChangeAction={addHighlightFormik.handleChange}
      />

      {/* Source Type */}
      <FormItem
        required
        label="Source Type"
        isCustomInput={true}
        SideIcon={CollectionIcon}
        CustomInput={
          <SelectInput
            title="Select Type"
            options={Object.keys(HighlightSrcType)}
            setSelectedOption={(option) =>
              addHighlightFormik.setFieldValue("srcType", option)
            }
          />
        }
        errorValue={addHighlightFormik.errors.srcType}
      />

      {/* Source Author */}
      <FormItem
        required
        type="text"
        label="Author"
        name="srcAuthor"
        SideIcon={IdentificationIcon}
        placeholder="Enter Highlight Author"
        onBlurAction={addHighlightFormik.handleBlur}
        errorValue={addHighlightFormik.errors.srcAuthor}
        inputValue={addHighlightFormik.values.srcAuthor}
        onChangeAction={({ target: { value } }) =>
          addHighlightFormik.setFieldValue("srcAuthor", value)
        }
      />

      {/* Content */}
      <FormItem
        label="Content"
        isCustomInput={true}
        SideIcon={BookOpenIcon}
        errorValue={addHighlightFormik.errors.content}
        CustomInput={
          <textarea
            required
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
        }
      />

      {/* Submit Button */}
      <div className="flex w-full">
        <button type="submit" className="form-button">
          <p className="mr-2">Add</p>
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

export default AddHighlight;
