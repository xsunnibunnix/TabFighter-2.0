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
        const yoshi = document.createElement('audio');
        yoshi.setAttribute('src', 'assets/yoshi.wav');
        const boundDelete = yoshi.remove.bind(yoshi);
        this.appendChild(yoshi);
        yoshi.play();
        // chrome.tabs.update(tab.id, { active: true });
        setTimeout(chrome.tabs.update, 800, tab.id, { active: true })
        setTimeout(boundDelete, 2000, yoshi)
        // tabEl.removeChild(grow);
        // setTimeout(deleteGrow, 2000, grow)
        // window.close();
      });
      deleteButton.addEventListener('click', function (e) {
        this.parentElement.classList.add('delete');
        const boundDelete = this.parentElement.remove.bind(this.parentElement)
        chrome.tabs.remove(tab.id);
        const hadouken = document.createElement('audio');
        hadouken.setAttribute('src', 'assets/Hadouken.mp3');
        // const play = hadouken.play.bind(hadouken);
        this.appendChild(hadouken);
        hadouken.play();
        setTimeout(boundDelete, 2000);
      })
      div.appendChild(deleteButton);
      div.appendChild(tabEl)
      tabs.appendChild(div);
    });
  });

  const random = document.querySelector('#random');
  random.addEventListener('click', () => {
    const tabs = document.querySelector('#tabs');
    const randNum = Math.floor(Math.random() * allTabs.length);
    const randTab = allTabs[randNum].id
    const tabToDelete = document.getElementById(randTab);
    chrome.tabs.remove(allTabs[randNum].id);
    tabToDelete.classList.add('delete');
    const parentDelete = tabToDelete.parentElement.remove.bind(tabToDelete.parentElement);

    // play sound
    const fatality = document.createElement('audio');
    fatality.setAttribute('src', 'assets/FinishHim.mp3');
    const boundDelete = tabs.removeChild.bind(fatality);
    tabs.appendChild(fatality);
    fatality.play();
    this.setTimeout(parentDelete, 500);
    setTimeout(boundDelete, 2000);
    allTabs.splice(randNum, 1);
  })

  const smFont = document.querySelector('#sm-font');
  const lgFont = document.querySelector('#lg-font');
  smFont.addEventListener('click', () => {
    const tabs = document.querySelector('#tabs');
    if (!smFont.classList.contains('active')) {
      // play sound
      const shrink = document.createElement('audio');
      shrink.setAttribute('src', 'assets/shrink.mp3');
      tabs.appendChild(shrink);
      shrink.play();
      const deleteShrink = tabs.removeChild.bind(shrink) 
      smFont.classList.add('active');
      lgFont.classList.remove('active');
      tabs.style.fontSize = '14px';
      setTimeout(deleteShrink, 2000, shrink)
    } else return;
  })
  lgFont.addEventListener('click', () => {
    const tabs = document.querySelector('#tabs');
    if (!lgFont.classList.contains('active')) {
      // play sound
      const grow = document.createElement('audio');
      grow.setAttribute('src', 'assets/grow.mp3');
      tabs.appendChild(grow);
      grow.play();
      const deleteGrow = tabs.removeChild.bind(tabs) 
      lgFont.classList.add('active');
      smFont.classList.remove('active');
      tabs.style.fontSize = '20px';
      setTimeout(deleteGrow, 2000, grow)
    } else return;
  })

});
  // chrome.runtime.sendMessage({ type: "getTabs" }, function (res) {
  //   console.log(res)
  // })