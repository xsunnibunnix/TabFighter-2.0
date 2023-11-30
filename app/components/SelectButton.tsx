import React, { useState, useContext } from 'react';

interface SelectButtonProps {
  selectTab: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  tabId: string; 
  checked: boolean;
}

export const SelectButton = ({ selectTab, tabId, checked  }: SelectButtonProps) => {
  return (
    <span className='select-btn flex items-center justify-center h-10 m-auto' id={'selecting-'+tabId}>
      <input type='checkbox' checked={checked} className='checkbox checkbox-primary checkbox-sm' onClick={selectTab} />
    </span>
  );
};
