import React, { useEffect, useState } from "react";

import Spinner from "./units/Spinner";
import HighlightCard from "./units/HighlightCard";

import { FilterOptions } from "../utils/types";
import getselectedHighlights from "../utils/getselectedHighlights";

const Highlights = ({ currentOption }) => {
  const [loading, setLoading] = useState(true);
  const [highlights, highlightsSet] = useState(null);

  useEffect(async () => {
    highlightsSet(await getselectedHighlights(currentOption));
    setLoading(false);
  }, [currentOption]);

  if (loading) return <Spinner />;
  if (!loading && !highlights)
    return <div>Sorry, There was a server problems or you should login</div>;

  if (highlights?.length < 1)
    switch (currentOption?.value) {
      case FilterOptions.Private:
        return (
          <div>
            Either, There are no available highlights Or all of them are public
          </div>
        );
      case FilterOptions.Favourite:
        return (
          <div>
            Either, There are no available highlights Or you have not favorited
            any one yet
          </div>
        );
      default:
        return <div>There are no available highlights yet</div>;
    }
  else
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-center lg:hidden">Highlights</p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {highlights.map((item) => (
            <HighlightCard highlight={item} key={item.content} />
          ))}
        </div>
      </div>
    );
};

export default Highlights;
