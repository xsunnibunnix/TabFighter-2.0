import React, { useState, useContext } from 'react';
import { Grow } from '../Sounds/Grow';
import { Shrink } from '../Sounds/Shrink';
import { FontContext } from '../../context/FontContext';

const HeaderLeft = () => {
  const [shrink, setShrink] = useState(false);
  const [grow, setGrow] = useState(false);

  const smallActive = useContext(FontContext)?.smallActive;
  const setSmallActive = useContext(FontContext)?.setSmallActive;

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.id === 'sm-font' && smallActive || target.id === 'lg-font' && !smallActive) return;
    else if (smallActive) {
      setGrow(prev => !prev);
      setTimeout(() => setGrow(prev => !prev), 2000)
    } else {
      setShrink(prev => !prev);
      setTimeout(() => setShrink(prev => !prev), 2000)
    }
    if(setSmallActive) setSmallActive(prev => !prev);
  }
  return (
    <div id="options-left">
      <button className={`font-btn sm ${smallActive ? 'active' : ''}`} onClick={e => handleClick(e)} >A</button>
      {shrink && <Shrink play={shrink} />}

      <button className={`font-btn lg-font ${smallActive ? '' : 'active'}`} onClick={e => handleClick(e)}>A</button>
      {grow && <Grow play={grow} />}
    </div>
  )
}

export default HeaderLeft;