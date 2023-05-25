console.log('popup.js')
window.addEventListener("DOMContentLoaded", function () {
  console.log('DOM loaded');
  const tabs = document.querySelector('#tabs');
  const allTabs = [];
  chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
    console.log(res)
    // res.forEach(el => {
    //   console.log(el.Tab)
    // })
  });
  chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
    console.log(res)
  })
});