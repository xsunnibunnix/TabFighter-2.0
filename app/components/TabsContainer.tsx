import React, { useState, useEffect } from "react";
import WindowContainer from "./WindowContainer";
import getTabs from "../utils/getTabs";
import { AllTabs } from "../../types";

const TabsContainer = () => {
  const [allTabs, setAllTabs] = useState<AllTabs>({});
  useEffect(() => {
    getTabs()
      .then(tabs => setAllTabs(tabs))
  }, []);

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