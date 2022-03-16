import { useState, useEffect } from "react";

const useTodayDate = () => {
  const [todayDate, todayDateSet] = useState("");

  useEffect(() => {
    todayDateSet(
      new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  return todayDate;
};

export default useTodayDate;
