import React, { useState, useContext } from 'react';
import { Grow } from '../Sounds/Grow';
import { Shrink } from '../Sounds/Shrink';
import { FontContext } from '../../context/FontContext';

const HeaderRight = () => {
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
    <div className='flex items-center'>
      <button className={`font-btn font-medium h-8 w-8 text-sm m-0.5 ${smallActive ? 'active' : ''}`} onClick={e => handleClick(e)} >A</button>
      {shrink && <Shrink play={shrink} />}

      <button className={`font-btn font-medium h-8 w-8 lg-font m-0.5 ${smallActive ? '' : 'active'}`} onClick={e => handleClick(e)}>A</button>
      {grow && <Grow play={grow} />}
    </div>
  )
}

export default HeaderRight;