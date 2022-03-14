import React, { useState, useEffect } from "react";
import { defaultGetRequest } from "../../utils/axiosMethods";

import Spinner, { SpinnerTypes } from "./Spinner";

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

  if (loading) return <Spinner type={SpinnerTypes.LARGE} />;

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <p className="text-primary dark:text-secondary">Quote of The Day</p>
      <div className="grid gap-2 p-5 bg-white rounded-xl text-primary dark:bg-secondary">
        {!dailyQuote ? (
          <p className="pr-5">Oops !! A problem has occurred </p>
        ) : (
          <>
            <p className="pr-5">{dailyQuote?.q}</p>
            <p className="text-right">{`― ${dailyQuote?.a}`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
