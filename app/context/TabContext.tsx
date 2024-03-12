import React, { createContext, useState, useEffect, useContext } from 'react';
import getTabs from '../utils/getTabs';
import { AllTabs } from '../../types';

interface TabContextProps {
  allTabs: AllTabs,
  setAllTabs: React.Dispatch<React.SetStateAction<AllTabs>>,
  updateTabs: () => void,
  tabToDelete: number,
  setTabToDelete: React.Dispatch<React.SetStateAction<number>>
}

export const TabContext = createContext<TabContextProps | null>(null);

export default function TabProvider({ children }: { children: React.ReactNode }) {
  const [allTabs, setAllTabs] = useState<AllTabs>({});
  const [tabToDelete, setTabToDelete] = useState<number>(Infinity);
  const updateTabs = () => {
    getTabs()
      .then(tabs => setAllTabs(tabs));
  };
  useEffect(() => updateTabs(), []);
  return <TabContext.Provider value={{ allTabs, setAllTabs, updateTabs, tabToDelete, setTabToDelete }}>{children}</TabContext.Provider>
};

export const useTabContext = () => {
  const tabContext = useContext(TabContext);
  if (!tabContext) {
    throw new Error('TabContext must be used within the TabContext Provider');
  }
  return tabContext;
}
