import React, { createContext, useState, useContext } from 'react';
import { SelectedTabs } from '../../types';

interface SelectContextProps {
    selectAll: boolean;
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTabs: SelectedTabs;
    setSelectedTabs: React.Dispatch<React.SetStateAction<SelectedTabs>>;
    addToSelectedTabs: (input: number) => void;
    removeFromSelectedTabs: (input?: number) => void;
}

export const SelectContext = createContext<SelectContextProps | null>(null);

export default function SelectProvider({ children }: { children: React.ReactNode }) {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTabs, setSelectedTabs] = useState<SelectedTabs>([]);

    const addToSelectedTabs = (input: number) => {
        if (!input) return;
        setSelectedTabs(prev => [...prev, input]);
    };

    const removeFromSelectedTabs = (input?: number) => {
        // Remove all if no input given
        if (!input) setSelectedTabs([]);
        // Otherwise, filter out the selected tab
        setSelectedTabs(prev => {
            return prev.filter(tab => tab !== input);
        });
    }


    return <SelectContext.Provider value={ { selectAll, setSelectAll, selectedTabs, setSelectedTabs, addToSelectedTabs, removeFromSelectedTabs } }>{ children }</SelectContext.Provider>
};

export const useSelectContext = () => {
    const selectContext = useContext(SelectContext);
    if (!selectContext) {
        throw new Error('SelectContext cannot be used outside of the SelectContext Provider');
    };
    return selectContext;
}