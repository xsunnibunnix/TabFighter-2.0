import React, {ReactEventHandler, useState, useContext, ChangeEventHandler} from 'react';
import { DeleteButton } from './DeleteButton';
import { Yoshi } from './Sounds/Yoshi';
import { TabContext } from '../context/TabContext';
import getTabs from '../utils/getTabs';
import { Hadouken } from './Sounds/Hadouken';

interface TabsProps {
  tabId: number | undefined,
  active: boolean,
  title: string | undefined,
  windowId: string
}

export interface LiProps extends React.LiHTMLAttributes<HTMLLIElement> {
  windowId: string
}

const Tabs = ({ tabId, active, title, ...LiProps }: TabsProps) => {
  const [remove, setRemove] = useState(false);
  const [yoshi, setYoshi] = useState(false);
  const [hadouken, setHadouken] = useState(false);

  const goToTab = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;
    const windowId: number = Number(target.attributes[1].value);
    setYoshi(true);
    setTimeout(chrome.tabs.update, 800, tabId, { active: true });
    setTimeout(() => window.close(), 800);
    setTimeout(chrome.windows.update, 800, windowId, { focused: true, state: 'normal' });
    setTimeout(() => setYoshi(false), 2000);
  };

  const closeTab = (e: React.MouseEvent) => {
    console.dir(e.target);
    setHadouken(true);
    setTimeout(chrome.tabs.remove, 2000, tabId);
    setTimeout(() => setHadouken(false), 2000);

  };

  return (
    <div className={`tab ${remove ? 'delete' : ''}`} id={String(tabId)} >
      <DeleteButton closeTab={closeTab} />
      {hadouken &&
      <Hadouken play={hadouken} />
      }
      <li className={active ? 'active' : ''} onClick={(e) => goToTab(e)} {...LiProps}>{title}</li>
      {yoshi &&
      <Yoshi play={yoshi} />
      }
    </div>
  )
}

export default Tabs;