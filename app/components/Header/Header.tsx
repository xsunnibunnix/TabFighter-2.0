import React, { useState, useContext } from 'react';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import Toggle from './Toggle';

const Header = () => {
   return (
     <>
      <Toggle />
      <h3>TabFighter</h3>
      <div className="options">
        <HeaderRight />
        <HeaderLeft />
      </div>
    </>
  )
}

export default Header;