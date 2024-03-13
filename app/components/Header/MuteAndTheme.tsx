import React from 'react';
import Toggle from './Toggle';
import Sound from './Sound';

const MuteAndTheme = () => {
  return (
    <div className='flex items-center justify-between m-0 w-screen max-w-[525px]'>
      <Sound />
      <Toggle />
    </div>
  )
};

export default MuteAndTheme;