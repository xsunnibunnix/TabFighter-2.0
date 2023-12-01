import { AllTabs, AllWindows } from "../../types";

const getTabs = async () => {
  const tabs = await chrome.tabs.query({});
  const windows = await chrome.windows.getAll({});
  const dims = windows.reduce((acc: AllWindows, curr): AllWindows => {
    const { id, height, width } = curr;
    if (id) {
      acc[id] = { height, width };
    }
    return acc;
  }, {});
  console.log(tabs);
  const allTabs = tabs.reduce((acc: AllTabs, curr): AllTabs => {
    const { active, id, title, windowId, audible, mutedInfo, index } = curr;
    if (!(windowId in acc)) acc[windowId] = [];
    acc[windowId].push({
      active,
      tabId: id,
      title,
      windowId,
      height: dims[windowId].height,
      width: dims[windowId].width,
      audible,
      mutedInfo, 
      index
    });
    return acc;
  }, {});
  return allTabs;
}

export default getTabs;