import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  SunIcon,
  CogIcon,
  MoonIcon,
  LogoutIcon,
  FingerPrintIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";

import Modal from "./units/Modal";
import MultiForm from "./units/MultiForm";
import FilterMenu from "./units/FilterMenu";
import IconWrapper from "./units/IconWrapper";

import Login from "./forms/Login";
import Register from "./forms/Register";
import UpdateProfile from "./forms/UpdateProfile";
import ChangePassword from "./forms/ChangePassword";

import setAuthToken from "../utils/api/setAuthToken";
import { FilterDisplayOptions } from "../utils/types";
import { apiGetRequest } from "../utils/api/apiMethods";
import { getItem, removeItems, setItem } from "../utils/handleStorage";

const Header = ({
  todayDate,
  darkMode,
  darkModeSet,
  currentUser,
  currentUserSet,
  currentOption,
  updateOption,
}) => {
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
      currentUserSet(userInfo);
      setItem("userInfo", userInfo);
    }
  }, [token]);

  const logout = async () => {
    await removeItems(["userInfo", "authToken"]);
    updateOption(FilterDisplayOptions[0]);
    currentUserSet(null);
    tokenSet(null);
  };

  return (
    <>
      <Modal
        title="Settings"
        showModal={showProfileModal}
        closeModal={() => setShowProfileModal(false)}
        Body={() => (
          <MultiForm
            tokenSet={tokenSet}
            titleOptions={new Array(2).fill("Wanna")}
            formOptions={[UpdateProfile, ChangePassword]}
            closeModal={() => setShowProfileModal(false)}
            actionTextOptions={["Change Password", "Update Profile"]}
          />
        )}
      />
      <Modal
        title="Welcome"
        Body={() => (
          <MultiForm
            titleOptions={[
              "You don't have an account ?",
              "Already have an account ?",
            ]}
            tokenSet={tokenSet}
            formOptions={[Login, Register]}
            actionTextOptions={["Sign Up", "Sign In"]}
            closeModal={() => setShowAuthModal(false)}
          />
        )}
        showModal={showAuthModal}
        closeModal={() => setShowAuthModal(false)}
      />
      <div
        className={`sticky top-0 z-50 flex h-min ${
          currentUser ? "flex-col" : "flex-row"
        } flex-wrap items-center justify-between bg-secondary text-xl text-primary shadow-md dark:bg-primary dark:text-secondary
        dark:shadow-sm dark:shadow-secondary sm:flex-row sm:justify-between xs:flex-row`}
      >
        <div className="order-1 my-5 ml-5 flex items-center justify-between gap-5 place-self-start sm:order-none">
          <IconWrapper
            title=""
            className="action-icon"
            Icon={darkMode ? SunIcon : MoonIcon}
            onAction={() => darkModeSet(!darkMode)}
          />
          <p>{todayDate}</p>
        </div>
        <div className="order-last mx-auto sm:order-none">
          <FilterMenu
            UpdateOption={updateOption}
            currentOption={currentOption}
            options={FilterDisplayOptions}
            MenuIcon={() => (
              <div className="p-2">
                <AdjustmentsIcon className="action-icon" />
              </div>
            )}
          />
        </div>
        {token && currentUser ? (
          <div className="order-2 mx-5 my-5 flex gap-1 place-self-end sm:order-none">
            <p>{currentUser?.name}</p>
            <div title="Profile Setting">
              <CogIcon
                className="action-icon"
                onClick={() => setShowProfileModal(true)}
              />
            </div>
            <div title="Logout">
              <LogoutIcon onClick={logout} className="action-icon" />
            </div>
          </div>
        ) : (
          <div className="order-2 mx-5 place-self-end py-5 sm:order-none">
            <FingerPrintIcon
              className="action-icon"
              onClick={() => setShowAuthModal(true)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
