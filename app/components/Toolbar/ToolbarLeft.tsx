import React, { useState, useEffect } from 'react';
import { Fatality } from '../Sounds/Fatality';
import { Hadouken } from '../Sounds/Hadouken';
import ToolbarButton from './ToolbarButton';
import { useTabContext } from '../../context/TabContext';
import { useSoundContext } from '../../context/SoundContext';
import { useSelectContext } from '../../context/SelectContext';
import { useFontContext } from '../../context/FontContext';
import { Tab } from '../../../types';
import random from '../../icons/random.svg';
import trash from '../../icons/trash.svg';

const ToolbarLeft = () => {
  const [fatality, setFatality] = useState(false);
  const [hadouken, setHadouken] = useState<boolean>(false);
  const { updateTabs, setTabsToDelete, allTabs } = useTabContext();
  const { smallActive } = useFontContext();
  const { soundOn } = useSoundContext();
  const { selectAll, setSelectAll, selectedTabs, addToSelectedTabs, removeFromSelectedTabs } = useSelectContext();

  // Reduce all tabs to one array used in selectHandler and randomClick functions
  const tabsList = Object.values(allTabs).reduce((acc, curr): Tab[] => {
    acc.push(...curr);
    return acc;
  }, []);

  // Checking if there are any selected tabs to set indeterminate property on the select-all checkbox
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
      const { active, tabId } = randTab;
      if (soundOn) setFatality(prev => !prev);
      setTabsToDelete([tabId!]);
      const timeToRemove: number = active ? 1500 : 500;

      setTimeout(chrome.tabs.remove, timeToRemove, tabId);
      setTimeout(updateTabs, timeToRemove + 100);
      if (soundOn) setTimeout(() => setFatality(prev => !prev), 1500);
    }
  };

  const removeTabs = () => {
    let activeTab = false;
    for (let tab of selectedTabs) {
      const isTabActive = tabsList.find(tabInList => tabInList.tabId === tab)
      if (isTabActive) {
        activeTab = true;
        break;
      }
    }

    const timeout = soundOn ? (activeTab ? 900 : 400) : 250;
    setTabsToDelete([...selectedTabs]);
    setTimeout(
      () => selectedTabs.forEach(tab => {
        chrome.tabs.remove(tab);
        removeFromSelectedTabs(tab);
      }),
      timeout
    );

    if (soundOn) {
      setHadouken(true);
      setTimeout(() => setHadouken(prev => !prev), 1500);
    };

    setTimeout(updateTabs, timeout + 50);
  };

  return (
    <div className='flex items-center'>
      <input type="checkbox" id="select-all" className={ `checkbox checkbox-primary mx-0.5 ${smallActive ? '' : 'checkbox-lg'}` } checked={ selectAll } onChange={ selectHandler } />

      {/* Random Button */ }
      <span className={ `tooltip tooltip-right flex items-center transition-opacity duration-300 ${selectedTabs.length ? 'hidden opacity-0' : 'opacity-100'}` } data-tip='Close a tab at random'>
        <ToolbarButton clickFunc={ randomClick } smallActive={smallActive}>
          <img className='flex justify-center items-center w-fit h-fit p-[.175rem]' src={ random } alt="Random mode button" />
        </ToolbarButton>
      </span>

      {/* Delete Button */ }
      <span className={ `flex items-center transition-opacity duration-300 ${selectedTabs.length ? 'opacity-100' : 'hidden opacity-0'}` }>
        <ToolbarButton clickFunc={ removeTabs } smallActive={smallActive}>
          <img className='flex justify-center items-center w-6 h-6' src={ trash } alt="Delete button" />
        </ToolbarButton>
      </span>

      { fatality && soundOn && <Fatality play={ fatality } /> }
      { hadouken && soundOn && <Hadouken play={ hadouken } /> }
    </div>
  )
}

export default ToolbarLeft;