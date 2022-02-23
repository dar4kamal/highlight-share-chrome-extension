export const setItem = (key, value) => {
  chrome.storage.local.set({ [key]: value });
};

export const getItem = async (key) => {
  const selectedItem = await chrome.storage.local.get(key);
  return selectedItem[key];
};
