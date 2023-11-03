import React, {useState, useContext} from 'react';
import { DeleteButton } from './DeleteButton';
import { Yoshi } from './Sounds/Yoshi';
import { Hadouken } from './Sounds/Hadouken';
import { TabContext } from '../context/TabContext';
import getTabs from '../utils/getTabs';
import { RemoveContext } from '../context/RemoveContext';
import { SoundContext } from '../context/SoundContext';
import { SelectButton } from './SelectButton';
import { SelectContext, tabs } from '../context/SelectContext';

interface TabsProps {
  tabId: number | undefined,
  active: boolean,
  title: string | undefined,
  windowId: string,
  height: number | undefined,
  width: number | undefined
}

export interface LiProps extends React.LiHTMLAttributes<HTMLLIElement> {
  windowId: string
}

const Tabs = ({ tabId, active, title, height, width, ...LiProps }: TabsProps) => {
  const [yoshi, setYoshi] = useState<boolean>(false);
  const [hadouken, setHadouken] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const setAllTabs = useContext(TabContext)?.setAllTabs;
  const tabToDelete = useContext(RemoveContext)?.tabToDelete;
  const soundOn = useContext(SoundContext)?.soundOn;

  const selectedTabs = useContext(SelectContext)?.selectedTabs;
  const addToSelectedTabs = useContext(SelectContext)?.addToSelectedTabs; 
  const removeFromSelectedTabs = useContext(SelectContext)?.removeFromSelectedTabs;

  const goToTab = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;
    const windowId: number = Number(target.attributes[1].value);
    if (soundOn) {
      setYoshi(true);
      setTimeout(() => setYoshi(false), 2000);
    }

    let timeoutTime = soundOn ? 800 : 300;
    if (!active) {
      setTimeout(chrome.tabs.update, timeoutTime, tabId, { active: true });
    }
    setTimeout(() => window.close(), timeoutTime);
    setTimeout(chrome.windows.update, timeoutTime, windowId, { focused: true, state: 'normal', height, width });
  };

  const removeTabs = (...inputs: Array<number>) => { 
    setTimeout(() => { 
      inputs.forEach(item => { 
        try { 
        if (item) chrome.tabs.remove(item)
        } catch (e) { 
          console.warn("Failed to remove tab with " + item + " id");
        }
      });
    }, soundOn ? (active ? 1500 : 1250) : 300);
  }

  // Refactored to support closing all checked tabs if the current tab is also checked
  const closeTab = () => {
    if (soundOn) { 
      setHadouken(true); 
      setTimeout(() => setHadouken(prev => !prev), 2000);
    }

    if (tabId) { 
      if (!checked) removeTabs(tabId);
      else if (selectedTabs) removeTabs(...selectedTabs);
    }

    setTimeout(() => getTabs().then(tabs => {
      if (setAllTabs) setAllTabs(tabs);
      setChecked(false);
    }), soundOn ? 1300 : 400);
  };

  const selectTab = () => { 
    if (removeFromSelectedTabs && addToSelectedTabs) { 
      if (!checked) addToSelectedTabs(tabId)
      else removeFromSelectedTabs(tabId); 
    }
  }

  return (
    <div className={`tab-li flex w-full ${tabToDelete === tabId ? 'delete' : ''} ${checked ? 'is-selected' : ''}`} id={String(tabId)} >
      <DeleteButton closeTab={closeTab} tabId={String(tabId)} />
      {hadouken && soundOn && <Hadouken play={hadouken} />}
      <SelectButton selectTab={selectTab} checked={checked} tabId={String(tabId)}/>
      <li className={`flex items-center list-none w-full cursor-pointer p-1 pl-2.5 ${active ? 'active' : ''}`} onClick={(e) => goToTab(e)} {...LiProps}>{title}</li>
      {yoshi && soundOn && <Yoshi play={yoshi} />}
    </div>
  )
}

  export default Tabs;