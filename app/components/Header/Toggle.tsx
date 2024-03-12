import React, { useContext, useState } from 'react';
import darkMoon from '../../icons/darkmoon.svg';
import lightMoon from '../../icons/lightmoon.svg';
import darkSun from '../../icons/darksun.svg';
import lightSun from '../../icons/lightsun.svg';
import { useThemeContext } from '../../context/ThemeContext';
import { useSoundContext } from '../../context/SoundContext';
import { Coin } from '../Sounds/Coin';

const Toggle = () => {
 const { darkMode, setDarkMode, theme, setTheme } = useThemeContext();
  const { soundOn } = useSoundContext();
  const [coin, setCoin] = useState<boolean>(false);

  const handleToggle = () => {
    setDarkMode(prev => !prev);
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
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
          onChange={handleToggle}
          checked={!darkMode}
        />
        {coin && soundOn && <Coin play={coin} />}
      <img className='flex justify-center items-center w-7 h-7 mx-1.5' src={darkMode ? darkSun : lightSun} alt="" />
    </div>
  )
}

export default Toggle;