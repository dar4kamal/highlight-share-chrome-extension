import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import AddHighlight from "../components/forms/AddHighlight";

import { HighlightSrcType } from "../utils/types";

import { getItem } from "../utils/handleStorage";
import setAuthToken from "../utils/api/setAuthToken";
import { showNotification } from "../utils/handleNotifications";

const ContextMenu = () => {
  const [selectedContent, selectedContentSet] = useState("");
  const [addWindowId, addWindowIdSet] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      selectedContentSet(await getItem("selectionText"));
      const authToken = await getItem("authToken");
      setAuthToken(authToken);
      addWindowIdSet(await getItem("addWindowId"));
    };

    fetchContent();
  }, [selectedContent]);

  return (
    <div className="m-5">
      <AddHighlight
        closeModal={() => {
          showNotification("Your Highlight have been added successfully", () =>
            chrome.windows.remove(addWindowId)
          );
        }}
        initialValues={{
          src: "",
          srcType: HighlightSrcType.Book,
          srcAuthor: "",
          content: selectedContent,
        }}
      />
    </div>
  );
};

render(<ContextMenu />, document.querySelector("#context-menu"));
