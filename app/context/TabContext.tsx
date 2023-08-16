import React, { createContext, useState, useEffect } from 'react';
import getTabs from '../utils/getTabs';
import { AllTabs } from '../../types';

interface TabContextProps {
  allTabs: AllTabs,
  setAllTabs: React.Dispatch<React.SetStateAction<AllTabs>>
}

export const TabContext = createContext<TabContextProps | null>(null);

export default function TabProvider({ children }: { children: React.ReactNode }) {
  const [allTabs, setAllTabs] = useState<AllTabs>({});
  useEffect(() => {
    getTabs()
      .then(tabs => setAllTabs(tabs))
  }, [])
  return <TabContext.Provider value={{ allTabs, setAllTabs }}>{children}</TabContext.Provider>
}