console.log('popup.js')
window.addEventListener("DOMContentLoaded", function () {
  console.log('DOM loaded');
  let allTabs = [];
  chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
    allTabs = res;
    res.forEach((tab) => {
      const tabs = document.querySelector('#tabs');
      const div = document.createElement('div');
      div.classList.add('tab')
      const tabEl = document.createElement('li');
      tabEl.innerText = tab.title;
      const deleteButton = document.createElement('span');
      deleteButton.innerHTML = '<i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></i>';
      if (tab.active) {
        tabEl.classList.add('active');
      }
      tabEl.addEventListener('click', function () {
        chrome.tabs.update(tab.id, { active: true });
        window.close();
      });
      deleteButton.addEventListener('click', function (e) {
        this.classList.add('delete');
        chrome.tabs.remove(tab.id);
        this.parentElement.remove()
      })
      div.appendChild(deleteButton);
      div.appendChild(tabEl)
      tabs.appendChild(div);
    });
  });
});
  // chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
  //   console.log(res)
  // })