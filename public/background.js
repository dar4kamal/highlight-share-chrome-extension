chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(
    {
      title: "Add to My Highlights",
      id: "highlight-share-context-menu",
      contexts: ["all"],
    },
    () => {
      console.log("Context Menu Created");
    }
  );
});

chrome.contextMenus.onClicked.addListener(() => {
  chrome.windows.create({
    url: "contextmenu.html",
    width: 500,
    height: 500,
    type: "popup",
  });
});
