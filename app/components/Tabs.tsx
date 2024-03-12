import React, { useState, useEffect } from 'react';
import { Tab } from '../../types';
import { Draggable } from 'react-beautiful-dnd';
import { DeleteButton } from './DeleteButton';
import { Yoshi } from './Sounds/Yoshi';
import { Hadouken } from './Sounds/Hadouken';
import getTabs from '../utils/getTabs';
import { useTabContext } from '../context/TabContext';
import { useSoundContext } from '../context/SoundContext';
import { useSelectContext } from '../context/SelectContext';
import { useFontContext } from '../context/FontContext';
import { SelectButton } from './SelectButton';
import TabAudio from './TabAudio';

const Tabs = ({ tabId, active, title, height, width, index, audible, mutedInfo, windowId }: Tab) => {
  const { selectedTabs, selectAll, setSelectAll, removeFromSelectedTabs, addToSelectedTabs } = useSelectContext();
  const { allTabs, setAllTabs, updateTabs, tabToDelete } = useTabContext();
  const { soundOn } = useSoundContext();
  const { smallActive } = useFontContext();
  const [yoshi, setYoshi] = useState<boolean>(false);
  const [hadouken, setHadouken] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);

  // console.log('selected tabs', selectedTabs);

  useEffect(() => {
    const tabSelected = selectedTabs.find(tab => tab === tabId!);
    setChecked(selectAll ? selectAll : (tabSelected ? true : false));
  }, [selectAll, selectedTabs]);

  const goToTab = () => {
    if (soundOn) {
      setYoshi(true);
      setTimeout(() => setYoshi(false), 2000);
    }

    let timeoutTime = soundOn ? 800 : 300;
    if (!active) {
      setTimeout(chrome.tabs.update, timeoutTime, tabId, { active: true });
    }
    setTimeout(() => window.close(), timeoutTime);
    setTimeout(chrome.windows.update, timeoutTime, windowId, { focused: true, state: 'normal', height, width });
  };

  const removeTabs = (...tabs: Array<number>) => {
    setTimeout(
      () => tabs.forEach(tab => chrome.tabs.remove(tab)),
      soundOn ? (active ? 1500 : 1250) : 300
    );
  }

  // const closeTab = () => {
  //   if (soundOn) {
  //     setHadouken(true);
  //     setTimeout(() => setHadouken(prev => !prev), 2000);
  //   }

  //   if (checked && selectedTabs) removeTabs(...selectedTabs)
  //   else if (tabId) removeTabs(tabId);

  //   setTimeout(() => getTabs().then(tabs => {
  //     if (setAllTabs) setAllTabs(tabs);
  //   }), soundOn ? 1300 : 400);

  //   // if (updateTabs) {
  //   //   setTimeout(() => {
  //   //     if (removeFromSelectedTabs && allTabs) removeFromSelectedTabs(allTabs);
  //   //     updateTabs();
  //   //   }, soundOn ? 1300 : 400)
  //   // }
  // };

  const checkTab = () => {
    if (tabId) {
      const tabSelected = selectedTabs.find(tab => tab === tabId!);
      if (tabSelected) {
        removeFromSelectedTabs(tabId);
        if (selectAll) setSelectAll(false);
      } else addToSelectedTabs(tabId);
      console.log('do I run first Tabs')
    }
  };

  return (
    <Draggable draggableId={ String(tabId) } index={ index } key={ String(tabId) }>
      { (provided, snapshot) => (
        <div
          ref={ provided.innerRef }
          className={ `tab-li flex w-full ${tabToDelete === tabId ? 'delete' : ''} ${checked ? 'bg-neutral/10 rounded-md p-0.5' : ''}` }
          id={ String(tabId) }
          { ...provided.draggableProps }
        >
          <SelectButton checkTab={ checkTab } tabId={ String(tabId) } checked={ checked } />
          { audible && <TabAudio audible={ audible } mutedInfo={ mutedInfo } tabId={ tabId } /> }
          <li
            { ...provided.dragHandleProps }
            className={ `flex items-center list-none w-full cursor-pointer ${smallActive ? 'p-1 pl-2' : 'p-2.5 pl-3.5'} ${active || snapshot.isDragging ? 'active' : ''}` }
            onClick={ goToTab }
          // {...LiProps}
          >
            { title }
          </li>
          { yoshi && soundOn && <Yoshi play={ yoshi } /> }
        </div>
      ) }
    </Draggable>
  )
}

export default Tabs;