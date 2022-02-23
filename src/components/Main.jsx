import React, { useEffect, useState } from "react";
import { getItem } from "../utils/handleStorage";

const Main = () => {
  const [currentOption, currentOptionSet] = useState(null);

  useEffect(async () => {
    currentOptionSet(await getItem("currentOption"));
  }, [currentOption]);

  return (
    <div className="flex-auto text-3xl bg-blue-300">{currentOption?.title}</div>
  );
};

export default Main;
