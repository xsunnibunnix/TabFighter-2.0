import React from 'react';
import MuteAndTheme from './MuteAndTheme';
import Toolbar from '../Toolbar/Toolbar';

const Header = () => {
   return (
     <header id='header' className='flex flex-col items-center sticky top-0 bg-base-100/95 z-10 pb-1'>
      <MuteAndTheme />
      <h3 className='text-center font-bold text-3xl m-auto p-4 tracking-wide' >TabFighter</h3>
      <Toolbar />
    </header>
  )
}

export default Header;