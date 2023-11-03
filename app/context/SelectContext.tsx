import React, { createContext, useState } from 'react'; 

type tab = number;
type tabs = Set<tab>;

interface SelectContextProps { 
    selectedTabs: tabs;
    addToSelectedTabs: (...inputs: Array<tab>) => void; 
    removeFromSelectedTabs: (...inputs: Array<tab>) => void;
}

export const SelectContext = createContext<SelectContextProps | null >(null); 

export default function SelectProvider({ children }: { children: React.ReactNode }) { 
    const [selectedTabs, setSelectedTabs] = useState<tabs>(new Set());
    const addToSelectedTabs = (...inputs: Array<tab>) => { 
        if (!inputs.length) return;
        const newTabs = new Set(selectedTabs);
        inputs.forEach(input => newTabs.add(input));
        setSelectedTabs(newTabs);
    }

    const removeFromSelectedTabs = (...inputs: Array<tab>) => { 
        // Remove all if no input given
        if (!inputs.length) { 
            setSelectedTabs(new Set()); 
            return;
        }
        // Otherwise, filter out the selected tab
        const newTabs = new Set(selectedTabs); 
        inputs.forEach(input => newTabs.delete(input)); 
        setSelectedTabs(newTabs);
    }

    return <SelectContext.Provider value={{ selectedTabs, addToSelectedTabs, removeFromSelectedTabs }}>{children}</SelectContext.Provider> 
}