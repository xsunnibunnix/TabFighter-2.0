import React from 'react';
import Toggle from './Toggle';
import Sound from './Sound';

const MuteAndTheme = () => {
  return (
    <div className='flex justify-between'>
      <Sound />
      <Toggle />
    </div>
  )
};

export default MuteAndTheme;