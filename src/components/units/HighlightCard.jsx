import React, { useState, useEffect } from "react";

import {
  StarIcon,
  GlobeIcon,
  LockClosedIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline";
import { toast } from "react-toastify";

import Modal from "./Modal";
import IconWrapper from "./IconWrapper";
import Spinner, { SpinnerTypes } from "./Spinner";
import UpdateHighlight from "../forms/UpdateHighlight";

import { getItem } from "../../utils/handleStorage";
import { apiPatchRequest } from "../../utils/api/apiMethods";

const HighlightCard = ({ highlight }) => {
  const {
    id,
    src,
    user,
    srcType,
    content,
    srcAuthor,
    createdAt,
    updatedAt,
    isPrivate,
    isFavorite,
    likesCount,
  } = highlight;

  const [currentUser, currentUserSet] = useState(null);
  const [showUpdateModal, showUpdateModalSet] = useState(null);

  useEffect(() => {
    const fetchContent = async () => currentUserSet(await getItem("userInfo"));
    fetchContent();
  }, []);

  const isBelongsToUser = user?.email === currentUser?.email;

  const [loading, loadingSet] = useState(false);
  const [privacy, privacySet] = useState(isPrivate);
  const [favourite, favouriteSet] = useState(isFavorite);

  return (
    <blockquote className="relative flex col-span-2 p-5 border-2 border-red-600">
      <Modal
        title="Update Highlight"
        showModal={showUpdateModal}
        closeModal={() => showUpdateModalSet(false)}
        Body={() => (
          <UpdateHighlight
            highlightId={id}
            details={{ src, srcType, srcAuthor, content }}
            closeModal={() => showUpdateModalSet(false)}
          />
        )}
      />
      {isBelongsToUser && (
        <DotsVerticalIcon
          className="absolute action-icon top-3 right-3"
          onClick={() => showUpdateModalSet(true)}
        />
      )}
      <div className="grid w-full gap-2">
        {/* // TODO: add Other highlight stuff (user,createdAt,updatedAt,likesCount) */}
        <p className="pr-5">{content}</p>
        <div className="flex flex-row-reverse items-center justify-between">
          <div title={srcType} className="text-right">
            <p className="">{`― ${srcAuthor}`}</p>
            <p className="">{src}</p>
          </div>
          {loading ? (
            <Spinner type={SpinnerTypes.SMALL} />
          ) : (
            isBelongsToUser && (
              <div className="flex">
                <IconWrapper
                  title="Change Privacy"
                  className="action-icon"
                  onAction={async () => {
                    loadingSet(true);
                    const updateStatus = await apiPatchRequest(
                      `highlights/privacy/${id}`,
                      {}
                    );
                    loadingSet(false);

                    privacySet(!privacy);
                    toast.success(updateStatus);
                  }}
                  Icon={privacy ? LockClosedIcon : GlobeIcon}
                />
                <IconWrapper
                  Icon={StarIcon}
                  title="Favorite/Un Favorite"
                  className={`action-icon ${favourite && "fill-yellow-500"}`}
                  onAction={async () => {
                    loadingSet(true);
                    const updateStatus = await apiPatchRequest(
                      `highlights/fav/${id}`,
                      {}
                    );
                    loadingSet(false);

                    favouriteSet(!favourite);
                    toast.success(updateStatus);
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </blockquote>
  );
};

export default HighlightCard;
