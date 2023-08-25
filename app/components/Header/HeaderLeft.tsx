import React, { useState, useContext } from 'react';
import { Fatality } from '../Sounds/Fatality';
import { TabContext } from '../../context/TabContext';
import { RemoveContext } from '../../context/RemoveContext';
import { SoundContext } from '../../context/SoundContext';
import { Tab } from '../../../types';
import getTabs from '../../utils/getTabs';

const HeaderLeft = () => {
  const [fatality, setFatality] = useState(false);
  const setTabToDelete = useContext(RemoveContext)?.setTabToDelete;
  const allTabs = useContext(TabContext)?.allTabs;
  const setAllTabs = useContext(TabContext)?.setAllTabs;
  const soundOn = useContext(SoundContext)?.soundOn;
  
  const randomClick = async () => {
    if (allTabs) {
      const tabsList = Object.values(allTabs).reduce((acc, curr): Tab[] => {
        acc.push(...curr);
        return acc;
      }, []);
      const randNum = Math.floor(Math.random() * tabsList.length);
      const randTab = tabsList[randNum].tabId;


      if(soundOn) setFatality(prev => !prev);
      if (randTab) {
        if (setTabToDelete) setTabToDelete(randTab);
        const tabToDelete = await chrome.tabs.get(randTab);
        const { active, windowId } = tabToDelete;
        let timeToRemove: number;
        if (active) timeToRemove = 1500;
        else timeToRemove = 500;
    
        setTimeout(chrome.tabs.remove, timeToRemove, randTab);
        setTimeout(() => getTabs().then(tabs => {
          if (setAllTabs) setAllTabs(tabs);
        }), timeToRemove + 100);
        if(soundOn) setTimeout(() => setFatality(prev => !prev), 1500);
      }
    };
  };

  return (
    <div className='flex items-center'>
      <button className='font-medium text-sm' id="random" onClick={randomClick}>Random Mode</button>
      {fatality && soundOn && <Fatality play={fatality}/>}
    </div>
  )
}

export default HeaderLeft;