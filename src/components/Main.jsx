import React from "react";

import Highlights from "./Highlights";
import QuoteCard from "./units/QuoteCard";

const Main = ({ currentOption, currentUser, onAction, onActionSet }) => {
  return (
    <div className="relative m-5 grid grid-flow-row-dense grid-cols-5 gap-5 text-xl">
      <div className="col-span-5 lg:col-span-1">
        <QuoteCard />
      </div>
      <div className="col-span-5 lg:col-span-4">
        <Highlights
          currentOption={currentOption}
          currentUser={currentUser}
          onAction={onAction}
          onActionSet={onActionSet}
        />
      </div>
    </div>
  );
};

export default Main;
