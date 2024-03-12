import React, { useState, useContext } from 'react';
import { Fatality } from '../Sounds/Fatality';
import { useTabContext } from '../../context/TabContext';
import { useSoundContext } from '../../context/SoundContext';
import { useThemeContext } from "../../context/ThemeContext";
import { Tab } from '../../../types';
import getTabs from '../../utils/getTabs';
import darkRandom from '../../icons/darkrandom.svg';
import lightRandom from '../../icons/lightrandom.svg';

const HeaderLeft = () => {
  const [fatality, setFatality] = useState(false);
  const { setTabToDelete, allTabs, setAllTabs } = useTabContext();
  const { darkMode } = useThemeContext();
  const { soundOn } = useSoundContext();

  // Reduces all tabs on all windows to a single array and selects a tab at random to delete
  const randomClick = async () => {
    if (allTabs) {
      const tabsList = Object.values(allTabs).reduce((acc, curr): Tab[] => {
        acc.push(...curr);
        return acc;
      }, []);
      const randNum = Math.floor(Math.random() * tabsList.length);
      const randTab = tabsList[randNum];

      if (randTab) {
        if(soundOn) setFatality(prev => !prev);
        if (setTabToDelete) setTabToDelete(randTab.tabId!);
        const { active } = randTab;
        let timeToRemove: number;
        if (active) timeToRemove = 1500;
        else timeToRemove = 500;
    
        setTimeout(chrome.tabs.remove, timeToRemove, randTab.tabId);
        setTimeout(() => getTabs().then(tabs => {
          if (setAllTabs) setAllTabs(tabs);
        }), timeToRemove + 100);
        if(soundOn) setTimeout(() => setFatality(prev => !prev), 1500);
      }
    };
  };

  return (
    <div className='flex items-center'>
      <button className={ `tooltip tooltip-right btn btn-primary btn-square btn-sm h-[2.5rem] w-[2.5rem] ${!darkMode ? 'btn-outline' : ''}` } id="random" data-tip='Close a tab at random' onClick={randomClick}>
      <img className='flex justify-center items-center w-fit h-fit p-1 stroke-current' src={darkMode ? darkRandom : lightRandom} alt="Random mode button" />
      </button>
      {fatality && soundOn && <Fatality play={fatality}/>}
    </div>
  )
}

export default HeaderLeft;