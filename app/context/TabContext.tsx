import React, { createContext, useState, useEffect, useContext } from 'react';
import getTabs from '../utils/getTabs';
import { AllTabs, TabsArray, Tab } from '../../types';

type TabContextProps = {
  allTabs: AllTabs,
  setAllTabs: React.Dispatch<React.SetStateAction<AllTabs>>,
  updateTabs: () => void,
  tabsToDelete: TabsArray,
  setTabsToDelete: React.Dispatch<React.SetStateAction<TabsArray>>
}

export const TabContext = createContext<TabContextProps | null>(null);

export default function TabProvider({ children }: { children: React.ReactNode }) {
  const [allTabs, setAllTabs] = useState<AllTabs>({});
  const [tabsToDelete, setTabsToDelete] = useState<TabsArray>([]);
  const updateTabs = () => {
    getTabs()
      .then((allTabs ) => setAllTabs(allTabs));
    setTabsToDelete([]);
  };
  useEffect(() => updateTabs(), []);
  return <TabContext.Provider value={{ allTabs, setAllTabs, updateTabs, tabsToDelete, setTabsToDelete }}>{children}</TabContext.Provider>
};

export const useTabContext = () => {
  const tabContext = useContext(TabContext);
  if (!tabContext) {
    throw new Error('TabContext must be used within the TabContext Provider');
  }
  return tabContext;
}
