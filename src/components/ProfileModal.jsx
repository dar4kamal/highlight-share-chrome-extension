import React, { useState } from "react";

import UpdateProfile from "./forms/UpdateProfile";
import ChangePassword from "./forms/ChangePassword";

import MultiFormOption from "./units/MultiFormOption";

const ProfileModal = (props) => {
  const [isToUpdateProfile, isToUpdateProfileSet] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col py-5 border-b border-solid">
        {isToUpdateProfile ? (
          <UpdateProfile {...props} />
        ) : (
          <ChangePassword {...props} />
        )}
      </div>
      <div className="flex items-center justify-center mt-6">
        <div className="inline-flex items-center text-base font-medium text-center text-gray-700">
          <MultiFormOption
            actionText={
              isToUpdateProfile ? "Change Password" : "Update Profile"
            }
            title="Wanna"
            updateOption={() => isToUpdateProfileSet(!isToUpdateProfile)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
