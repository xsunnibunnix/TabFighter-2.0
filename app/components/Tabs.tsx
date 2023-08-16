import React, {useState, useContext} from 'react';
import { DeleteButton } from './DeleteButton';
import { Yoshi } from './Sounds/Yoshi';
import { Hadouken } from './Sounds/Hadouken';
import { TabContext } from '../context/TabContext';
import getTabs from '../utils/getTabs';
import { RemoveContext } from '../context/RemoveContext';

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
  const [yoshi, setYoshi] = useState(false);
  const [hadouken, setHadouken] = useState(false);
  const [remove, setRemove] = useState(false);
  const setAllTabs = useContext(TabContext)?.setAllTabs;
  const tabToDelete = useContext(RemoveContext)?.tabToDelete;

  const goToTab = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;
    const windowId: number = Number(target.attributes[1].value);
    setYoshi(true);
    setTimeout(chrome.tabs.update, 800, tabId, { active: true });
    setTimeout(() => window.close(), 800);
    setTimeout(chrome.windows.update, 800, windowId, { focused: true, state: 'normal' });
    setTimeout(() => setYoshi(false), 2000);
  };

  const closeTab = () => {
      setHadouken(prev => !prev);
      let timeToRemove:number;
      if (active) timeToRemove = 1500;
      else timeToRemove = 500;
      setTimeout(chrome.tabs.remove, timeToRemove, tabId);
      if(setRemove) setTimeout(() => setRemove(prev => !prev), timeToRemove);
      setTimeout(() => getTabs().then(tabs => {
        if (setAllTabs) setAllTabs(tabs);
      }), timeToRemove + 100);
        setTimeout(() => setHadouken(prev => !prev), 1500);
  };

  return (
    <div className={`tab ${remove || tabToDelete === tabId ? 'delete' : ''}`} id={String(tabId)} >
      <DeleteButton closeTab={closeTab} tabId={String(tabId)} />
      {hadouken && <Hadouken play={hadouken} />}
      <li className={active ? 'active' : ''} onClick={(e) => goToTab(e)} {...LiProps}>{title}</li>
      {yoshi && <Yoshi play={yoshi} />}
    </div>
  )
}

  export default Tabs;