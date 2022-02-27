import React, { useState } from "react";

import {
  StarIcon,
  GlobeIcon,
  DotsVerticalIcon,
  LockClosedIcon,
} from "@heroicons/react/outline";

import Spinner from "./Spinner";
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

  return !highlight ? (
    <Spinner />
  ) : (
    <blockquote className="relative flex col-span-2 p-5 border-2 border-red-600">
      <DotsVerticalIcon
        className="absolute action-icon top-3 right-3"
        onClick={() => alert("options")}
      />
      <div className="grid w-full gap-2">
        <p className="pr-5">{content}</p>
        <div className="flex flex-row-reverse items-center justify-between">
          <div className="text-right">
            <p className="">{src}</p>
            <p className="">{srcAuthor}</p>
          </div>
          <div className="flex">
            <IconWrapper
              className="action-icon"
              onAction={() => privacySet(!privacy)}
              Icon={privacy ? LockClosedIcon : GlobeIcon}
            />
            <IconWrapper
              Icon={StarIcon}
              className={`action-icon ${favourite && "fill-yellow-500"}`}
              onAction={() => favouriteSet(!favourite)}
            />
          </div>
        </div>
      </div>
    </blockquote>
  );
};

export default HighlightCard;
