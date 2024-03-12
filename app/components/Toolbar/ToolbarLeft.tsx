import React, { useState, useEffect } from 'react';
import { Fatality } from '../Sounds/Fatality';
import { useTabContext } from '../../context/TabContext';
import { useSoundContext } from '../../context/SoundContext';
import { useThemeContext } from "../../context/ThemeContext";
import { useSelectContext } from '../../context/SelectContext';
import { Tab } from '../../../types';
import getTabs from '../../utils/getTabs';
import darkRandom from '../../icons/darkrandom.svg';
import lightRandom from '../../icons/lightrandom.svg';

const ToolbarLeft = () => {
  const [fatality, setFatality] = useState(false);
  const { setTabToDelete, allTabs, setAllTabs } = useTabContext();
  const { darkMode } = useThemeContext();
  const { soundOn } = useSoundContext();
  const { selectAll, setSelectAll, selectedTabs, addToSelectedTabs, removeFromSelectedTabs } = useSelectContext();

  // TODO Add select button to toolbar. On click will select all tabs
  // TODO If a tab is selected, delete button will replace random button
  
    // Reduce all tabs to one array used in selectHandler and randomClick functions
    const tabsList = Object.values(allTabs).reduce((acc, curr): Tab[] => {
      acc.push(...curr);
      return acc;
    }, []);

  useEffect(() => {
    const checkbox = document.getElementById('select-all') as HTMLInputElement;

    if (checkbox && !selectAll) {
      if (selectedTabs.length) {
        if (tabsList.length === selectedTabs.length) {
          setSelectAll(true);
          checkbox.indeterminate = false;
        } else checkbox.indeterminate = true;
      }
      else checkbox.indeterminate = false;
    }
  }, [selectedTabs, selectAll]);

  // Event handler for select all checkbox
  const selectHandler = () => {
    if (selectAll) {
      setSelectAll(false);
      removeFromSelectedTabs();
    } else {
      if (selectedTabs.length > 0) {
        selectedTabs.forEach(tab => removeFromSelectedTabs(tab));
      } else {
        setSelectAll(true);
        tabsList.forEach(({ tabId }) => {
          if (tabId) addToSelectedTabs(tabId)
        });
      }
    }
  }

  // Selects a tab at random to delete from the tabsList array above
  const randomClick = async () => {
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

  return (
    <div className='flex items-center'>
      <input type="checkbox" id="select-all" className='checkbox checkbox-primary mx-0.5' checked={selectAll} onChange={selectHandler} />
      <button className={ `tooltip tooltip-right btn btn-primary btn-square btn-sm h-9 w-9 mx-1 ${!darkMode ? 'btn-outline' : ''}` } id="random" data-tip='Close a tab at random' onClick={randomClick}>
      <img className='flex justify-center items-center w-fit h-fit p-[.175rem] stroke-current' src={darkMode ? darkRandom : lightRandom} alt="Random mode button" />
      </button>
      {fatality && soundOn && <Fatality play={fatality}/>}
    </div>
  )
}

export default ToolbarLeft;