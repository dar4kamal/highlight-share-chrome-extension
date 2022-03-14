import React, { useState } from "react";

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

import { apiPatchRequest } from "../../utils/api/apiMethods";

const HighlightCard = ({ onAction, onActionSet, highlight, currentUser }) => {
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

  const [loading, loadingSet] = useState(false);
  const [privacy, privacySet] = useState(isPrivate);
  const [favourite, favouriteSet] = useState(isFavorite);
  const [showUpdateModal, showUpdateModalSet] = useState(null);

  const isBelongsToUser = user?.email === currentUser?.email;

  return (
    <>
      <Modal
        title="Update Highlight"
        showModal={showUpdateModal}
        closeModal={() => showUpdateModalSet(false)}
        Body={() => (
          <UpdateHighlight
            highlightId={id}
            details={{ src, srcType, srcAuthor, content }}
            closeModal={() => {
              showUpdateModalSet(false);
              onActionSet(!onAction);
            }}
          />
        )}
      />
      <blockquote className="relative flex col-span-2 p-5 bg-white border-2 rounded-xl text-primary dark:bg-secondary">
        {isBelongsToUser && (
          <DotsVerticalIcon
            className="absolute card-action-icon top-3 right-3"
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
                    className="card-action-icon"
                    onAction={async () => {
                      loadingSet(true);
                      const updateStatus = await apiPatchRequest(
                        `highlights/privacy/${id}`,
                        {}
                      );
                      loadingSet(false);
                      if (updateStatus) {
                        onActionSet(!onAction);

                        privacySet(!privacy);
                        toast.success(updateStatus);
                      }
                    }}
                    Icon={privacy ? LockClosedIcon : GlobeIcon}
                    title={privacy ? "Set Public" : "Set Private"}
                  />
                  <IconWrapper
                    Icon={StarIcon}
                    title={favourite ? "UnFavorite" : "Favorite"}
                    className={`card-action-icon ${
                      favourite && "fill-yellow-500"
                    }`}
                    onAction={async () => {
                      loadingSet(true);
                      const updateStatus = await apiPatchRequest(
                        `highlights/fav/${id}`,
                        {}
                      );
                      loadingSet(false);
                      if (updateStatus) {
                        onActionSet(!onAction);

                        favouriteSet(!favourite);
                        toast.success(updateStatus);
                      }
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </blockquote>
    </>
  );
};

export default HighlightCard;
