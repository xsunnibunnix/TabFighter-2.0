import React, { useState, useContext } from 'react';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

const Header = () => {
   return (
    <>
      <h3>TabFighter</h3>
      <div className="options">
        <HeaderLeft />
        <HeaderRight />
      </div>
    </>
  )
}

export default Header;