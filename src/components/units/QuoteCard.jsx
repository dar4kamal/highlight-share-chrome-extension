import React, { useState, useEffect } from "react";

import Spinner, { SpinnerTypes } from "./Spinner";

import { defaultGetRequest } from "../../utils/axiosMethods";

const QuoteCard = () => {
  const [loading, loadingSet] = useState(null);
  const [dailyQuote, dailyQuoteSet] = useState(null);

  useEffect(async () => {
    loadingSet(true);
    const quoteList = await defaultGetRequest(
      "https://zenquotes.io/api/random"
    );
    loadingSet(false);
    dailyQuoteSet(quoteList[0]);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <p className="text-primary dark:text-secondary">Quote of The Day</p>
      {loading ? (
        <Spinner type={SpinnerTypes.LARGE} />
      ) : (
        <div className="grid gap-2 rounded-xl bg-white p-5 text-primary dark:bg-secondary">
          {!dailyQuote || !dailyQuote?.q ? (
            <p className="pr-5">Oops!! A problem has occurred </p>
          ) : (
            <>
              <p className="pr-5">{dailyQuote?.q}</p>
              <p className="text-right">{`― ${dailyQuote?.a}`}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
