import React, { useState, useEffect } from 'react';
import { Tab } from '../../../types';
import { Draggable } from 'react-beautiful-dnd';
import { Yoshi } from '../Sounds/Yoshi';
import { useTabContext } from '../../context/TabContext';
import { useSoundContext } from '../../context/SoundContext';
import { useSelectContext } from '../../context/SelectContext';
import { useFontContext } from '../../context/FontContext';
import SelectButton from './SelectButton';
import TabAudio from './TabAudio';

const Tabs = ({ tabId, active, title, height, width, index, audible, mutedInfo, windowId }: Tab) => {
  const { selectedTabs, selectAll, setSelectAll, removeFromSelectedTabs, addToSelectedTabs } = useSelectContext();
  const { tabsToDelete } = useTabContext();
  const { soundOn } = useSoundContext();
  const { smallActive } = useFontContext();
  const [yoshi, setYoshi] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);

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

  const checkTab = () => {
    if (tabId) {
      const tabSelected = selectedTabs.find(tab => tab === tabId!);
      if (tabSelected) {
        removeFromSelectedTabs(tabId);
        if (selectAll) setSelectAll(false);
      } else addToSelectedTabs(tabId);
    }
  };


  return (
    <Draggable draggableId={ String(tabId) } index={ index } key={ String(tabId) }>
      { (provided, snapshot) => (
        <div
          ref={ provided.innerRef }
          className={ `tab-li flex w-full ${(tabsToDelete.find(tab => tab === tabId!) === tabId) ? 'delete' : ''} ${checked ? 'bg-neutral/10 rounded-md p-0.5' : ''}` }
          id={ String(tabId) }
          { ...provided.draggableProps }
        >
          <SelectButton checkTab={ checkTab } tabId={ String(tabId) } checked={ checked } />
          { audible && <TabAudio audible={ audible } mutedInfo={ mutedInfo } tabId={ tabId } /> }
          <li
            { ...provided.dragHandleProps }
            className={ `flex items-center list-none w-full cursor-pointer ${smallActive ? 'p-1 pl-2' : 'p-2.5 pl-3.5'} ${active || snapshot.isDragging ? 'active' : ''}` }
            onClick={ goToTab }
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