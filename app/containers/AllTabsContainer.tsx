import React, { useState, useEffect, ChangeEvent } from "react";
import { DragDropContext, DragUpdate } from "react-beautiful-dnd";
import WindowContainer from "./WindowContainer";
import { useTabContext } from "../context/TabContext";
import { useFontContext } from "../context/FontContext";
import { WindowNames } from "../../types";

const AllTabsContainer = () => {
  const [currentWindow, setCurrentWindow] = useState<chrome.windows.Window | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { allTabs, updateTabs } = useTabContext();
  const { smallActive } = useFontContext();

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

  const windows:React.JSX.Element[] = [];
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

  const onDragEnd = async (e: DragUpdate) => {
    const { destination, draggableId, source } = e;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const index = Number(destination?.index);
    const windowId = Number(destination?.droppableId);
    await chrome.tabs.move(Number(draggableId), { index, windowId });
    if (updateTabs) updateTabs();
  }

  return (
    <div className={`myTabs flex flex-col items-center justify-center m-auto pt-1 pb-2 box-border ${smallActive ? 'sm-font' : 'lg-font'}`}>
      <select className="select select-bordered w-full max-w-xs mb-2" onChange={e => handleChange(e)} >
        <option selected>All Windows</option>
        {windowList}
      </select>
      <DragDropContext onDragEnd={e => onDragEnd(e)}>
        {windows}
      </DragDropContext>
    </div>
  )
}

export default AllTabsContainer;