import React, { useContext, useState } from 'react';
import darkMoon from '../../icons/darkmoon.svg';
import lightMoon from '../../icons/lightmoon.svg';
import darkSun from '../../icons/darksun.svg';
import lightSun from '../../icons/lightsun.svg';
import { ThemeContext } from '../../context/ThemeContext';
import { Coin } from '../Sounds/Coin';
import { SoundContext } from '../../context/SoundContext';

const Toggle = () => {
  const darkMode = useContext(ThemeContext)?.darkMode;
  const setDarkMode = useContext(ThemeContext)?.setDarkMode;
  const setTheme = useContext(ThemeContext)?.setTheme;

  const soundOn = useContext(SoundContext)?.soundOn;
  const [coin, setCoin] = useState<boolean>(false);

  if (setTheme) {
    if (darkMode) setTheme('dark');
    else setTheme('light')
  }

  const handleToggle = (e:any) => {
    if (setDarkMode) setDarkMode(prev => !prev);
    if (soundOn) { 
      setCoin(true); 
      setTimeout(() => setCoin(false), 600);
    }
  }

  return (
    <div className='flex items-center px-5 pt-5 pb-2'>
      <img className='flex justify-center items-center w-6 h-6 mx-1.5' src={darkMode ? darkMoon : lightMoon} />
        <input
          type='checkbox'
          className='toggle toggle-primary'
          onChange={(e) => handleToggle(e)}
          checked={!darkMode}
        />
        {coin && soundOn && <Coin play={coin} />}
      <img className='flex justify-center items-center w-7 h-7 mx-1.5' src={darkMode ? darkSun : lightSun} alt="" />
    </div>
  )
}

export default Toggle;