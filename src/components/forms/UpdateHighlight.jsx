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

import FormItem from "../units/FormItem";
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
      src: details?.src ?? "",
      srcType: details?.srcType ?? HighlightSrcType.Quote,
      srcAuthor: details?.srcAuthor ?? "",
      content: details?.content ?? "",
    },
    validationSchema: updateHighlightSchema,
    onSubmit: async (values) => {
      const { src, srcType, srcAuthor, content } = values;

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
      <FormItem
        name="src"
        type="text"
        label="Source"
        SideIcon={AnnotationIcon}
        placeholder="Enter highlight's source"
        errorValue={updateProfileFormik.errors.src}
        inputValue={updateProfileFormik.values.src}
        onBlurAction={updateProfileFormik.handleBlur}
        onChangeAction={updateProfileFormik.handleChange}
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
            selectedOption={updateProfileFormik.values.srcType}
            setSelectedOption={(option) =>
              updateProfileFormik.setFieldValue("srcType", option)
            }
          />
        }
        errorValue={updateProfileFormik.errors.srcType}
      />

      {/* Source Author */}
      <FormItem
        type="text"
        label="Author"
        name="srcAuthor"
        SideIcon={IdentificationIcon}
        placeholder="Enter Highlight Author"
        onBlurAction={updateProfileFormik.handleBlur}
        errorValue={updateProfileFormik.errors.srcAuthor}
        inputValue={updateProfileFormik.values.srcAuthor}
        onChangeAction={({ target: { value } }) =>
          updateProfileFormik.setFieldValue("srcAuthor", value)
        }
      />

      {/* Content */}
      <FormItem
        label="Content"
        isCustomInput={true}
        SideIcon={BookOpenIcon}
        errorValue={updateProfileFormik.errors.content}
        CustomInput={
          <textarea
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

export default UpdateHighlight;
