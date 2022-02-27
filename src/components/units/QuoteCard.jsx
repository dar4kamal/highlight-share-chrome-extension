import React, { useState, useEffect } from "react";

import Spinner from "./Spinner";

const fetchQuote = async () => {
  const res = await fetch(`https://zenquotes.io/api/random`);
  return await res.json();
};

const QuoteCard = () => {
  const [dailyQuote, dailyQuoteSet] = useState(null);

  useEffect(async () => {
    const fetchedQuote = await fetchQuote();
    dailyQuoteSet(fetchedQuote[0]);
  }, []);

  return !dailyQuote ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <p className="">Quote of The Day</p>
      <div className="grid gap-2 p-5 border-2 border-red-600">
        <p className="pr-5">{dailyQuote?.q}</p>
        <p className="text-right">{dailyQuote?.a}</p>
      </div>
    </div>
  );
};

export default QuoteCard;
