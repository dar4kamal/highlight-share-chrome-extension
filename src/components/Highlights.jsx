import React, { useEffect, useState } from "react";

import Spinner from "./units/Spinner";
import HighlightCard from "./units/HighlightCard";

import getselectedHighlights from "../utils/getselectedHighlights";

const Highlights = ({ currentOption }) => {
  const [highlights, highlightsSet] = useState(null);

  useEffect(async () => {
    highlightsSet(await getselectedHighlights(currentOption));
  }, [currentOption]);

  return !highlights ? (
    <Spinner />
  ) : (
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
