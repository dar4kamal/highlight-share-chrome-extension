import React, { useState, useEffect } from "react";

import {
  StarIcon,
  GlobeIcon,
  LockClosedIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline";

import Modal from "./Modal";
import IconWrapper from "./IconWrapper";
import UpdateHighlight from "../forms/UpdateHighlight";

import { getItem } from "../../utils/handleStorage";

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
          <div className="flex">
            <IconWrapper
              className="action-icon"
              onAction={() => privacySet(!privacy)}
              Icon={privacy ? LockClosedIcon : GlobeIcon}
              // TODO: updated through API
            />
            <IconWrapper
              Icon={StarIcon}
              className={`action-icon ${favourite && "fill-yellow-500"}`}
              onAction={() => favouriteSet(!favourite)}
              // TODO: updated through API
            />
          </div>
        </div>
      </div>
    </blockquote>
  );
};

export default HighlightCard;
