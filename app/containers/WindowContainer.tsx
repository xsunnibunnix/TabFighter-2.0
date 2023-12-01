import React, { useContext, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Tabs from '../components/Tabs';
import { Tab } from '../../types';
import { SelectContext } from '../context/SelectContext';
import { SoundContext } from '../context/SoundContext';
import { Yahoo } from '../components/Sounds/Yahoo';

interface WindowProps {
  id: string,
  tabs: Tab[],
  windowName: string
}

const WindowContainer = ({id, tabs, windowName}: WindowProps) => {
  const addToSelectedTabs = useContext(SelectContext)?.addToSelectedTabs;
  const removeFromSelectedTabs = useContext(SelectContext)?.removeFromSelectedTabs;
  const soundOn = useContext(SoundContext)?.soundOn;
  
  const [clicked, setClicked] = useState<boolean>(false);
  const [yahoo, setYahoo] = useState<boolean>(false);

  const tabIds: Array<number>  = [];
  const handleClick = () => { 
    if (!clicked) { 
      if (soundOn) { 
        setYahoo(true);
        setTimeout(() => setYahoo(false), 1100);
        if (addToSelectedTabs) addToSelectedTabs(...tabIds);
      }
    } else { 
      if (removeFromSelectedTabs) removeFromSelectedTabs(...tabIds);
    }

    setClicked(prev => !prev);
  }

  const tabsList = tabs.map(tab => {
    const { tabId } = tab;
    // const { active, tabId, title, height, width, audible, mutedInfo, index } = tab;
    if (tabId) tabIds.push(tabId);
    return <Tabs /*tabId={tabId} active={active} title={title} windowId={id} height={height} width={width} index={index}*/ {...tab} />
  })

  return (
    <div className='window flex justify-center w-full my-1' id={id}>
      <div className='text-center py-3 w-1/4'>
        <button className={`text-center window-btn ${clicked ? 'window-btn-selected' : 'window-btn-unselected'}`} onClick={handleClick}>{windowName}</button>
        {yahoo && soundOn && <Yahoo play={yahoo}/>}
      </div>
      <Droppable droppableId={`${windowName}-list`}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className='w-3/4 box-border m-1 p-1'>
            {tabsList}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
    </div>
  )
}

export default WindowContainer;