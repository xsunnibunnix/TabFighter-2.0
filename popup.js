console.log('popup.js')
window.addEventListener("DOMContentLoaded", function () {
  console.log('DOM loaded');
  let allTabs = [];
  chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
    allTabs = res;
    res.forEach((tab) => {
      const tabs = document.querySelector('#tabs');
      console.log(tabs);
      const tabEl = document.createElement('li');
      tabEl.innerText = tab.title;
      if (tab.active) {
        tabEl.classList.add('active');
      }
      tabEl.addEventListener('click', function () {
        chrome.tabs.update(tab.id, { active: true });
        window.close();
      });
      tabEl.addEventListener('dblclick', function () {
        chrome.tabs.remove(tab.id);
      })
      tabs.appendChild(tabEl)
    });
  });
});
  // chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
  //   console.log(res)
  // })