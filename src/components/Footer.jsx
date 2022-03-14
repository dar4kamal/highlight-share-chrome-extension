import React from "react";

const Footer = () => {
  return (
    <div
      className="flex h-min flex-col items-center justify-center 
    bg-secondary text-xl text-primary drop-shadow-[0_-1px_2px_rgba(16,28,47,0.25)] dark:bg-primary
    dark:text-secondary dark:drop-shadow-[0_-1px_2px_rgba(237,222,192,0.25)] sm:flex-row sm:justify-between"
    >
      <div className="w-full px-5 py-2 sm:w-auto sm:py-5">
        Inspirational quotes provided by
        <a
          target="_blank"
          className="external-link"
          href="https://zenquotes.io/"
        >
          ZenQuotes API
        </a>
      </div>
      <div className="w-full px-5 py-2 sm:w-auto sm:py-5">
        Wanna Contribute ?{" "}
        <a
          target="_blank"
          className="external-link"
          href="https://github.com/dar4kamal/highlight-share-chrome-extension"
        >
          Github Repo
        </a>
      </div>
    </div>
  );
};

export default Footer;
