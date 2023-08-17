import React from 'react';

interface DeleteButtonProps {
  closeTab: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
  tabId: string
}

export const DeleteButton = ({ closeTab, tabId }: DeleteButtonProps) => {
  return (
    <span className='delete-btn flex items-center justify-center h-10 m-auto' id={tabId} onClick={closeTab}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </span>
  )
}
