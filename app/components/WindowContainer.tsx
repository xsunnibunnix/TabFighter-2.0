import React from 'react';
import Tabs from './Tabs';
import { Tab } from '../../types';

interface WindowProps {
  id: string,
  tabs: Tab[]
}

const WindowContainer = ({id, tabs}: WindowProps) => {
  
  return (
    <div className='window' id={id}>
      <p>{id}</p>
      <ul id="tabs">
        {tabs.map(tab => {
          const { active, tabId, title } = tab;
          return <Tabs tabId={tabId} active={active} title={title} windowId={id} />
        })}
      </ul>
    </div>
  )
}

export default WindowContainer;