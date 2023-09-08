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
    <div className='window flex justify-center w-full my-1' id={id}>
      <p className='text-center py-3 w-1/4'>{windowName}</p>
      <ul className='w-3/4 box-border m-1 p-1'>
        {tabs.map(tab => {
          const { active, tabId, title, height, width } = tab;
          return <Tabs tabId={tabId} active={active} title={title} windowId={id} height={height} width={width} />
        })}
      </ul>
    </div>
  )
}

export default WindowContainer;