chrome.runtime.onMessage.addListener(function (req, sender, sendResponse){
  if (req.type === "getTabs") {
    chrome.tabs.query({}, function (tabs) {
      sendResponse(tabs);
    })
    return true;
  }
})

// function logListener(info) {
//   let tabInfo = browser.tabs.get(info.tabId);
//   sendResponse(tabInfo);
// }

// chrome.runtime.onMessage.addListener(logListener);