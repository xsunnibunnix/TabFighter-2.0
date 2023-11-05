import React, { useContext, useState } from 'react';
import Tabs from '../components/Tabs';
import { Tab } from '../../types';
import { SelectContext } from '../context/SelectContext';

interface WindowProps {
  id: string,
  tabs: Tab[],
  windowName: string
}

const WindowContainer = ({id, tabs, windowName}: WindowProps) => {
  const addToSelectedTabs = useContext(SelectContext)?.addToSelectedTabs;
  const removeFromSelectedTabs = useContext(SelectContext)?.removeFromSelectedTabs;
  
  const [clicked, setClicked] = useState<boolean>(false);

  const tabIds: Array<number>  = [];
  const handleClick = () => { 
    clicked ? (removeFromSelectedTabs ? removeFromSelectedTabs(...tabIds) : null) 
      : (addToSelectedTabs ? addToSelectedTabs(...tabIds) : null);

    setClicked(prev => !prev);
  }

  return (
    <div className='window flex justify-center w-full my-1' id={id}>
      <div className='text-center py-3 w-1/4'>
        <button className={`text-center window-btn ${clicked ? 'window-btn-selected' : 'window-btn-unselected'}`} onClick={handleClick}>{windowName}</button>
      </div>
      <ul className='w-3/4 box-border m-1 p-1'>
        {tabs.map(tab => {
          const { active, tabId, title, height, width } = tab;
          if (tabId) tabIds.push(tabId);
          return <Tabs tabId={tabId} active={active} title={title} windowId={id} height={height} width={width} />
        })}
      </ul>
    </div>
  )
}

export default WindowContainer;