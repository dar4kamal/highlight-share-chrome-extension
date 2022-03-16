import { useState, useEffect } from "react";

import { getItem, setItem } from "../handleStorage";

const useDarkMode = () => {
  const [isDarkModeEnabled, isDarkModeEnabledSet] = useState(null);

  useEffect(async () => {
    const darkMode = await getItem("darkMode");
    isDarkModeEnabledSet(darkMode);
  }, []);

  const toggleDarkMode = () => isDarkModeEnabledSet(!isDarkModeEnabled);

  useEffect(() => {
    !isDarkModeEnabled
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
    setItem("darkMode", isDarkModeEnabled);
  }, [isDarkModeEnabled]);

  return { darkMode: isDarkModeEnabled, toggleDarkMode };
};

export default useDarkMode;
