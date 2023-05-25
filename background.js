chrome.runtime.onMessage.addListener(function (req, sender, sendResponse){
  if (req.type === "getTabs") {
    chrome.tabs.query({}, function (tabs) {
      sendResponse(tabs);
    })
    return true;
  }
})
