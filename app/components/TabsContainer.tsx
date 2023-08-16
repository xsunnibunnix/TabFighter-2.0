import React, { useState, useEffect, useContext } from "react";
import WindowContainer from "./WindowContainer";
import getTabs from "../utils/getTabs";
import { AllTabs } from "../../types";
import { TabContext } from "../context/TabContext";


const TabsContainer = () => {
  // const [allTabs, setAllTabs] = useState<AllTabs>({});
  // useEffect(() => {
  //   getTabs()
  //     .then(tabs => setAllTabs({...tabs}))
  // }, []);

  const allTabs = useContext(TabContext)?.allTabs;

  const windows = [];
  
  for (const window in allTabs) {
    windows.push(<WindowContainer id={window} tabs={allTabs[window]} />)
  }
  
  return (
    <div className="myTabs">
      {windows}
    </div>
  )
}

export default TabsContainer;