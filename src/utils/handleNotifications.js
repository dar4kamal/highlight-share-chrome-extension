export const defaultNotificationParams = {
  type: "basic",
  title: "highlight-share",
  iconUrl: "/images/Book-Shelf-48.png",
};

export const showNotification = (message, cb) => {
  chrome.notifications.create({ message, ...defaultNotificationParams }, cb);
};
