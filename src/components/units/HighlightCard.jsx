import React, { useState } from "react";

import {
  StarIcon,
  GlobeIcon,
  DotsVerticalIcon,
  LockClosedIcon,
} from "@heroicons/react/outline";

import IconWrapper from "./IconWrapper";

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

  const [privacy, privacySet] = useState(isPrivate);
  const [favourite, favouriteSet] = useState(isFavorite);

  return (
    <blockquote className="relative flex col-span-2 p-5 border-2 border-red-600">
      <DotsVerticalIcon
        className="absolute action-icon top-3 right-3"
        onClick={() => {
          // TODO: add options to update/ delete highlight
          alert("options");
        }}
      />
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
