import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Tabs from '../components/Tabs/Tabs';
import { Yahoo } from '../components/Sounds/Yahoo';
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
  const [clicked, setClicked] = useState<boolean>(false);
  const [yahoo, setYahoo] = useState<boolean>(false);

  useEffect(() => {
    if (selectAll) setClicked(true);
    if (!selectAll) {
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
  }

  const tabsList = tabs.map(tab => <Tabs { ...tab } />)

  return (
    <div className='window flex justify-center w-full my-1' id={ id }>
      <div className='text-center py-3 w-1/4'>
        <button className={ `text-center window-btn ${clicked ? 'window-btn-selected' : 'window-btn-unselected'}` } onClick={ handleClick }>{ windowName }</button>
        { yahoo && soundOn && <Yahoo play={ yahoo } /> }
      </div>
      <Droppable droppableId={ id }>
        { provided => (
          <div ref={ provided.innerRef } { ...provided.droppableProps } className='w-3/4 box-border m-1 p-1'>
            { tabsList }
            { provided.placeholder }
          </div>
        ) }
      </Droppable>
    </div>
  )
}

export default WindowContainer;