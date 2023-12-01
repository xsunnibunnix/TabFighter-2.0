import React, { useContext } from 'react';
import { FontContext } from '../context/FontContext';

interface SelectButtonProps {
  selectTab: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  tabId: string; 
  checked: boolean;
}

export const SelectButton = ({ selectTab, tabId, checked }: SelectButtonProps) => {
  const smallActive = useContext(FontContext)?.smallActive;
  return (
    <span className='select-btn flex items-center justify-center h-10 m-auto' id={'selecting-'+tabId}>
      <input type='checkbox' checked={checked} className={`checkbox checkbox-primary ${smallActive ? 'checkbox-sm mx-0.5' : 'checkbox-md mx-1'}`} onClick={selectTab} />
    </span>
  );
};
