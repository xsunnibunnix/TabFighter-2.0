import React, { useState, useContext } from 'react';
import { Grow } from '../Sounds/Grow';
import { Shrink } from '../Sounds/Shrink';
import { useFontContext } from '../../context/FontContext';
import { useSoundContext } from '../../context/SoundContext';

const HeaderRight = () => {
  const [shrink, setShrink] = useState(false);
  const [grow, setGrow] = useState(false);
  const { smallActive, setSmallActive } = useFontContext();
  const { soundOn } = useSoundContext();

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.id === 'sm-font' && smallActive || target.id === 'lg-font' && !smallActive) return;
    else if (smallActive && soundOn) {
      setGrow(prev => !prev);
      setTimeout(() => setGrow(prev => !prev), 2000)
    } else if(!smallActive && soundOn) {
      setShrink(prev => !prev);
      setTimeout(() => setShrink(prev => !prev), 2000)
    }
    if(setSmallActive) setSmallActive(prev => !prev);
  }
  return (
    <div className='flex items-center'>
      <button id='sm-font' className={`font-btn font-medium h-8 w-8 text-sm m-0.5 ${smallActive ? 'active' : ''}`} onClick={e => handleClick(e)} >A</button>
      {shrink && soundOn && <Shrink play={shrink} />}

      <button id='lg-font' className={`font-btn font-medium h-8 w-8 lg-font m-0.5 ${smallActive ? '' : 'active'}`} onClick={e => handleClick(e)}>A</button>
      {grow && soundOn && <Grow play={grow} />}
    </div>
  )
}

export default HeaderRight;