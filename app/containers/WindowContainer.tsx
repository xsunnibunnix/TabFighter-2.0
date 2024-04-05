import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Tabs from '../components/Tabs/Tabs';
import Yahoo from '../components/Sounds/Yahoo';
import { useSoundContext } from '../context/SoundContext';
import { useSelectContext } from '../context/SelectContext';
import { Tab } from '../../types';

type WindowProps = {
  id: string,
  tabs: Tab[],
  windowName: string
}

const WindowContainer = ({ id, tabs, windowName }: WindowProps) => {
  const { soundOn } = useSoundContext();
  const { addToSelectedTabs, removeFromSelectedTabs, selectAll, setSelectAll, selectedTabs } = useSelectContext();
  const [clicked, setClicked] = useState(false);
  const [yahoo, setYahoo] = useState(false);

  // Validates whether the window should be highlighted
  useEffect(() => {
    if (selectAll) setClicked(true);
    else {
      for (let tab of tabs) {
        const isTabSelected = selectedTabs.find(selectedTab => selectedTab === tab.tabId);
        if (!isTabSelected) {
          setClicked(false);
          return;
        }
      };
      setClicked(true);
    }
  }, [selectAll, selectedTabs]);

  // Adds or removes all tabs in the window from selected tabs and highlight or un-highlight the window accordingly
  const handleClick = () => {
    if (!clicked) {
      if (soundOn) {
        setYahoo(true);
        setTimeout(() => setYahoo(false), 1100);
      }
      tabs.forEach(({ tabId }) => {
        if (tabId) addToSelectedTabs(tabId)
      });
    } else {
      if (selectAll) setSelectAll(false);
      tabs.forEach(({ tabId }) => {
        if (tabId) removeFromSelectedTabs(tabId);
      })
    };

    setClicked(prev => !prev);
  };


  return (
    <div className='window flex justify-center w-full my-1' id={ id }>
      <div className='text-center py-3 w-1/4'>
        <button className={ `text-center window-btn ${clicked ? 'window-btn-selected' : 'window-btn-unselected'}` } onClick={ handleClick }>{ windowName }</button>
        { yahoo && soundOn && <Yahoo /> }
      </div>
      <Droppable droppableId={ id }>
        { provided => (
          <div ref={ provided.innerRef } { ...provided.droppableProps } className='w-3/4 box-border m-1 p-1'>
            { tabs.map(tab => <Tabs { ...tab } />) }
            { provided.placeholder }
          </div>
        ) }
      </Droppable>
    </div>
  )
}

export default WindowContainer;