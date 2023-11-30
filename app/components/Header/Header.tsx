import React from 'react';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import MuteAndTheme from './MuteAndTheme';

const Header = () => {
   return (
     <header id='header' className='flex flex-col items-center sticky top-0 bg-base-100/95 z-10 pb-1'>
      <MuteAndTheme />
      <h3 className='text-center font-bold text-3xl m-auto p-4 tracking-wide' >TabFighter</h3>
      <div className="options flex items-center justify-between my-3.5 mx-auto box-border py-1 px-3.5">
        <HeaderLeft />
        <HeaderRight />
      </div>
    </header>
  )
}

export default Header;