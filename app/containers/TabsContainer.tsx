import React, { useContext } from "react";
import WindowContainer from "./WindowContainer";
import { TabContext } from "../context/TabContext";
import { FontContext } from "../context/FontContext";


const TabsContainer = () => {
  const allTabs = useContext(TabContext)?.allTabs;
  const smallActive = useContext(FontContext)?.smallActive

  const windows = [];
  for (const window in allTabs) {
    windows.push(<WindowContainer id={window} tabs={allTabs[window]} />)
  }
  
  return (
    <div className={`myTabs ${smallActive ? 'sm-font': 'lg-font'}`}>
      {windows}
    </div>
  )
}

export default TabsContainer;