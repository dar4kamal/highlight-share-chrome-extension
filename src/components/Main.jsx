import { PlusCircleIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

import { getItem } from "../utils/handleStorage";

import Highlights from "./Highlights";
import QuoteCard from "./units/QuoteCard";

const Main = () => {
  const [currentOption, currentOptionSet] = useState(null);

  useEffect(async () => {
    currentOptionSet(await getItem("currentOption"));
  }, [currentOption]);

  return (
    <div className="relative grid grid-flow-row-dense grid-cols-5 gap-5 m-5 text-xl">
      <div className="col-span-5 lg:col-span-1">
        <QuoteCard />
      </div>
      <div className="col-span-5 lg:col-span-4">
        <Highlights currentOption={currentOption} />
      </div>
    </div>
  );
};

export default Main;
