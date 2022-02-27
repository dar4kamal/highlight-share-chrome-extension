import React, { useEffect, useState } from "react";

import HighlightCard from "./units/HighlightCard";
import Spinner from "./units/Spinner";

const API_URL = "http://localhost:5000/api";

const fetchAPI = async () => {
  const res = await fetch(`${API_URL}/highlights/all`);
  return await res.json();
};

/* 
TODO 
- cases to count for
? >> request success
  ? >> data fetched
  ? >> no data yet 
? >> Errors
  ? >> server error
  ? >> network error 
*/

const Highlights = ({ currentOption }) => {
  const [data, dataSet] = useState(null);

  useEffect(async () => {
    dataSet(await fetchAPI());
  }, []);

  return !data ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center justify-center gap-5">
      <p className="text-center lg:hidden">Highlights</p>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        {data.result.map((item) => (
          <HighlightCard highlight={item} key={item.content} />
        ))}
        {data.result.map((item) => (
          <HighlightCard highlight={item} key={item.content} />
        ))}
      </div>
    </div>
  );
};

export default Highlights;
