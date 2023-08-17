import React from 'react';
import Tabs from '../components/Tabs';
import { Tab } from '../../types';

interface WindowProps {
  id: string,
  tabs: Tab[],
  windowName: string
}

const WindowContainer = ({id, tabs, windowName}: WindowProps) => {
  
  return (
    <div className='window my-1' id={id}>
      <p className='text-center py-3 w-1/4'>{windowName}</p>
      <ul className='w-3/4' id="tabs">
        {tabs.map(tab => {
          const { active, tabId, title } = tab;
          return <Tabs tabId={tabId} active={active} title={title} windowId={id} />
        })}
      </ul>
    </div>
  )
}

export default WindowContainer;