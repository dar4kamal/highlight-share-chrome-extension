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

const defaultNotificationParams = {
  type: "basic",
  title: "highlight-share",
  iconUrl: "/images/Book-Shelf-48.png",
};

function showNotification(message) {
  chrome.notifications.create({ message, ...defaultNotificationParams });
}

chrome.contextMenus.onClicked.addListener(async (info) => {
  const user = await chrome.storage.local.get("userInfo");

  if (info.menuItemId === "highlight-share-context-menu") {
    if (Object.keys(user).length === 0) showNotification("Please Login, First");
    else {
      if (!info.selectionText)
        showNotification("Please highlight Some Text, First");
      else {
        const { selectionText } = info;
        chrome.storage.local.set({ selectionText });

        const { id } = await chrome.windows.create({
          url: "contextmenu.html",
          width: 400,
          height: 430,
          type: "popup",
        });

        chrome.storage.local.set({ addWindowId: id });
      }
    }
  }
});
