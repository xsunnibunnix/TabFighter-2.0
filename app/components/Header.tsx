import React from 'react';

const Header = () => {
  return (
    <>
      <h3>TabFighter</h3>
      <div className="options">
        <div id="options-left">
          <button className="font-btn active" id="sm-font" >A</button>
          <button className="font-btn" id="lg-font">A</button>
        </div>
        <div id="options-right">
          <button id="random">Random Mode</button>
        </div>
      </div>
    </>
  )
}

export default Header;