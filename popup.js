console.log('popup.js')
window.addEventListener("DOMContentLoaded", function () {
  let allTabs = [];
  chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
    allTabs = res;
    res.forEach((tab) => {
      const tabs = document.querySelector('#tabs');
      const div = document.createElement('div');
      div.classList.add('tab')
      const tabEl = document.createElement('li');
      tabEl.innerText = tab.title;
      tabEl.setAttribute('id', tab.id);
      const deleteButton = document.createElement('span');
      deleteButton.innerHTML = '<i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>    </svg></i>';
      if (tab.active) {
        tabEl.classList.add('active');
      }
      tabEl.addEventListener('click', function () {
        chrome.tabs.update(tab.id, { active: true });
        window.close();
      });
      deleteButton.addEventListener('click', function (e) {
        this.parentElement.classList.add('delete');
        const boundDelete = this.parentElement.remove.bind(this.parentElement)
        chrome.tabs.remove(tab.id);
        const delSound = document.createElement('audio');
        delSound.setAttribute('src', 'assets/Hadouken.mp3')
        setTimeout(boundDelete, 500)
        // this.parentElement.remove()
      })
      div.appendChild(deleteButton);
      div.appendChild(tabEl)
      tabs.appendChild(div);
    });
  });

  const random = document.querySelector('#random');
  random.addEventListener('click', () => {
    const randNum = Math.floor(Math.random() * allTabs.length);
    const randTab = allTabs[randNum].id
    const tabToDelete = document.getElementById(randTab);
    chrome.tabs.remove(allTabs[randNum].id);
    tabToDelete.classList.add('delete');
    allTabs.splice(randNum, 1);
    const parentDelete = tabToDelete.parentElement.remove.bind(tabToDelete.parentElement);
    setTimeout(parentDelete, 500);
  })

  const smFont = document.querySelector('#sm-font');
  const lgFont = document.querySelector('#lg-font');
  smFont.addEventListener('click', () => {
    const tabs = document.querySelector('#tabs');
    if (!smFont.classList.contains('active')) {
      smFont.classList.add('active');
      lgFont.classList.remove('active');
      tabs.style.fontSize = '14px';
    } else return;
  })
  lgFont.addEventListener('click', () => {
    const tabs = document.querySelector('#tabs');
    if (!lgFont.classList.contains('active')) {
      lgFont.classList.add('active');
      smFont.classList.remove('active');
      tabs.style.fontSize = '20px';
    } else return;
  })

});
  // chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
  //   console.log(res)
  // })