import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between h-16 text-xl text-white bg-blue-800">
      <div className="ml-5">
        Inspirational quotes provided by
        <a
          target="_blank"
          className="external-link"
          href="https://zenquotes.io/"
        >
          ZenQuotes API
        </a>
      </div>
      <div className="mr-5">
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
