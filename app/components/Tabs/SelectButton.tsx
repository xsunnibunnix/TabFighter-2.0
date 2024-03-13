import React from 'react';
import { useFontContext } from '../../context/FontContext';

interface SelectButtonProps {
  checkTab: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabId: string; 
  checked: boolean;
}

const SelectButton = ({ checkTab, tabId, checked }: SelectButtonProps) => {
  const { smallActive } = useFontContext();
  return (
    <span className='select-btn flex items-center justify-center h-10 m-auto' id={'selecting-'+tabId}>
      <input type='checkbox' checked={checked} className={`checkbox checkbox-primary ${smallActive ? 'checkbox-sm mx-0.5' : 'checkbox-md mx-1'}`} onChange={checkTab} />
    </span>
  );
};

export default SelectButton;