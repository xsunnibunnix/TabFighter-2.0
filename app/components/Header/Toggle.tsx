import React, {useContext} from 'react';
import darkMoon from '../../icons/darkmoon.svg';
import lightMoon from '../../icons/lightmoon.svg';
import darkSun from '../../icons/darksun.svg';
import lightSun from '../../icons/lightsun.svg';
import { ThemeContext } from '../../context/ThemeContext';

const Toggle = () => {
  const darkMode = useContext(ThemeContext)?.darkMode;
  const setDarkMode = useContext(ThemeContext)?.setDarkMode;
  const setTheme = useContext(ThemeContext)?.setTheme;

  if (setTheme) {
    if (darkMode) setTheme('dark');
    else setTheme('light')
  }

  const handleToggle = (e:any) => {
    if (setDarkMode) setDarkMode(prev => !prev);
  }

  return (
    <div className='flex justify-end items-center px-5 pt-5'>
      <img className='flex justify-center items-center w-6 h-6 mx-1.5' src={darkMode ? darkMoon : lightMoon} />
        <input
          type='checkbox'
          className='toggle toggle-primary'
          onChange={(e) => handleToggle(e)}
          checked={!darkMode}
        />
      <img className='flex justify-center items-center w-7 h-7 mx-1.5' src={darkMode ? darkSun : lightSun} alt="" />
    </div>
  )
}

export default Toggle;