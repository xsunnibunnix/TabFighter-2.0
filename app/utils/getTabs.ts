import { AllTabs } from "../../types";

const getTabs = async () => {
  const tabs = await chrome.tabs.query({});
  const windows = await chrome.windows.getAll({});
  console.log(windows);
  const allTabs = tabs.reduce((acc: AllTabs, curr):AllTabs => {
    const { active, id, title, windowId } = curr;
    if (!(windowId in acc)) acc[windowId] = [];
    acc[windowId].push({
      active, tabId: id, title, windowId
    });
    return acc;
  }, {})
  return allTabs;
}

export default getTabs;