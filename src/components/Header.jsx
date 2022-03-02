import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  CogIcon,
  LogoutIcon,
  FingerPrintIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";

import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";

import Modal from "./units/Modal";
import FilterMenu from "./units/FilterMenu";

import setAuthToken from "../utils/api/setAuthToken";
import { FilterDisplayOptions } from "../utils/types";
import { apiGetRequest } from "../utils/api/apiMethods";
import { getItem, removeItems, setItem } from "../utils/handleStorage";

const Header = ({ todayDate, currentOption, updateOption }) => {
  const [user, userSet] = useState(null);
  const [token, tokenSet] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(async () => {
    const authToken = await getItem("authToken");
    tokenSet(authToken);
    setAuthToken(authToken);

    if (authToken) {
      const { id: userId } = jwt_decode(authToken);
      const userInfo = await apiGetRequest(`user/${userId}`);
      userSet(userInfo);
      setItem("userInfo", userInfo);
    }
  }, [token]);

  const logout = async () => {
    await removeItems(["userInfo", "authToken"]);
    userSet(null);
    tokenSet(null);
  };

  return (
    <>
      <Modal
        Body={() => <ProfileModal />}
        showModal={showProfileModal}
        closeModal={() => setShowProfileModal(false)}
      />
      <Modal
        Body={() => (
          <AuthModal
            tokenSet={tokenSet}
            closeModal={() => setShowAuthModal(false)}
          />
        )}
        showModal={showAuthModal}
        closeModal={() => setShowAuthModal(false)}
      />
      <div className="flex items-center justify-between h-16 text-xl text-white bg-blue-800">
        <div className="ml-5">{todayDate}</div>
        <FilterMenu
          UpdateOption={updateOption}
          currentOption={currentOption}
          options={FilterDisplayOptions}
          MenuIcon={() => (
            <div className="p-2">
              <AdjustmentsIcon className="w-8 h-8" />
            </div>
          )}
        />
        {token ? (
          <div className="flex gap-1 p-5">
            <p>{user?.name}</p>
            <div title="Profile Setting">
              <CogIcon
                onClick={() => setShowProfileModal(true)}
                className="w-8 h-8 cursor-pointer hover:bg-white hover:bg-opacity-10 hover:text-white"
              />
            </div>
            <div title="Logout">
              <LogoutIcon
                onClick={logout}
                className="w-8 h-8 cursor-pointer hover:bg-white hover:bg-opacity-10 hover:text-white"
              />
            </div>
          </div>
        ) : (
          <div
            onClick={() => setShowAuthModal(true)}
            className="flex gap-1 p-5 mr-5 cursor-pointer hover:bg-white hover:bg-opacity-10 hover:text-white"
          >
            <FingerPrintIcon className="w-8 h-8" />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
