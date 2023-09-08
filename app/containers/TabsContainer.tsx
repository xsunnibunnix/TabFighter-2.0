import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import WindowContainer from "./WindowContainer";
import { TabContext } from "../context/TabContext";
import { FontContext } from "../context/FontContext";
import { WindowNames } from "../../types";

const TabsContainer = () => {
  const [currentWindow, setCurrentWindow] = useState<chrome.windows.Window | null>(null);
  const [selected, setSelected] = useState<number | null>(null)
  const allTabs = useContext(TabContext)?.allTabs;
  const smallActive = useContext(FontContext)?.smallActive;

  useEffect(() => {
    chrome.windows.getCurrent().then(window => setCurrentWindow(window));
  }, [])

  const allWindows = allTabs ? Object.keys(allTabs) : [];
  const windowList: React.JSX.Element[] = [];
  const windowNames:WindowNames = {};
  let i = 0;
  allWindows.forEach(window => {
    const windowId = Number(window);
    if (windowId !== currentWindow?.id) {
      i++;
      windowList.push(<option id={window} key={window} >{`Window ${i}`}</option>);
      windowNames[window] = `Window ${i}`;
    } else if (windowId === currentWindow?.id) {
      windowList.unshift(<option id={window} key={window}>Current Window</option>);
      windowNames[window] = 'Current Window';
    }
  });

  const windows = [];
  for (const window in allTabs) {
    if (!selected) {
      if (Number(window) === currentWindow?.id) {
        windows.unshift(<WindowContainer id={window} tabs={allTabs[window]} windowName={windowNames[window]} />)
      } else {
        windows.push(<WindowContainer id={window} tabs={allTabs[window]} windowName={windowNames[window]} />)
      };
    } else {
      if (Number(window) === selected) {
        windows.push(<WindowContainer id={window} tabs={allTabs[window]} windowName={windowNames[window]} />)
      }
    }
  }

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    const windowId = target.selectedOptions[0].id;
    setSelected(() => windowId !== '' ? Number(windowId) : null);
  }

  return (
    <div className={`myTabs flex flex-col items-center justify-center m-auto py-2 box-border ${smallActive ? 'sm-font' : 'lg-font'}`}>
      <select className="select select-bordered w-full max-w-xs mb-2" onChange={e => handleChange(e)} >
        <option selected>All Windows</option>
        {windowList}
      </select>
      {windows}
    </div>
  )
}

export default TabsContainer;