import React from 'react';
import { DeleteButton } from './DeleteButton';

interface TabsProps {
  tabId: number | undefined,
  active: boolean,
  title: string | undefined,
  windowId: string
}

export interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  windowId: string
}

const Tabs = ({tabId, active, title, ...DivProps}:TabsProps) => {
  return (
    <div className='tab' id={String(tabId)} {...DivProps}>
      <DeleteButton/>
      <li className={active ? 'active' : ''}>{title}</li>
    </div>
  )
}

export default Tabs;