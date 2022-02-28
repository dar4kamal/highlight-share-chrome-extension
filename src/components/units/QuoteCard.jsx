import React, { useState, useEffect } from "react";
import { defaultGetRequest } from "../../utils/axiosMethods";

import Spinner from "./Spinner";

const QuoteCard = () => {
  const [dailyQuote, dailyQuoteSet] = useState(null);

  useEffect(async () => {
    const quoteList = await defaultGetRequest(
      "https://zenquotes.io/api/random"
    );
    dailyQuoteSet(quoteList[0]);
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
