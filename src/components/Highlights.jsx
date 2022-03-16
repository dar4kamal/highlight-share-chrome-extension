import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import ErrorCard from "./units/ErrorCard";
import HighlightCard from "./units/HighlightCard";
import Spinner, { SpinnerTypes } from "./units/Spinner";

import { FilterOptions } from "../utils/types";
import getSelectedHighlights from "../utils/getSelectedHighlights";

const Highlights = ({ currentUser, onAction, onActionSet }) => {
  const [loading, setLoading] = useState(true);
  const [highlights, highlightsSet] = useState(null);

  const viewOption = useSelector((state) => state.view);

  useEffect(async () => {
    highlightsSet(await getSelectedHighlights(viewOption));
    setLoading(false);
  }, [viewOption?.value, onAction]);

  if (loading) return <Spinner type={SpinnerTypes.LARGE} />;
  if (!loading && !highlights)
    return (
      <ErrorCard message="Sorry, There was a server problems or you should login" />
    );

  if (highlights?.length < 1)
    switch (viewOption?.value) {
      case FilterOptions.Private:
        return (
          <ErrorCard message="Either, There are no available highlights Or all of them are public" />
        );
      case FilterOptions.Favourite:
        return (
          <ErrorCard
            message="Either, There are no available highlights Or you have not favorited
          any one yet"
          />
        );
      default:
        return <ErrorCard message="There are no available highlights yet" />;
    }
  else
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-center text-primary dark:text-secondary lg:hidden">
          Highlights
        </p>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
          {highlights.map((item) => (
            <HighlightCard
              key={item?.id}
              highlight={item}
              onAction={onAction}
              onActionSet={onActionSet}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    );
};

export default Highlights;
