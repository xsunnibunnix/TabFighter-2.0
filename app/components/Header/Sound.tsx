import React, {useContext} from "react";
import darkVolOn from '../../icons/darkvolon.svg';
import darkVolOff from '../../icons/darkvoloff.svg';
import lightVolOn from '../../icons/lightvolon.svg';
import lightVolOff from '../../icons/lightvoloff.svg';
import { SoundContext } from "../../context/SoundContext";
import { ThemeContext } from "../../context/ThemeContext";

const Sound = () => {
  const soundOn = useContext(SoundContext)?.soundOn;
  const setSoundOn = useContext(SoundContext)?.setSoundOn;
  const darkMode = useContext(ThemeContext)?.darkMode;

  let volOn;
  let volOff;

  if (darkMode) volOn = darkVolOn;
  else volOn = lightVolOn;
  if (darkMode) volOff = darkVolOff;
  else volOff = lightVolOff;

  const handleMute = () => {
    if (setSoundOn) setSoundOn(prev => !prev);
  }

  return (
    <div className='flex items-center px-5 pt-5 pb-2'>
      <button className={`btn btn-square btn-sm h-[2.5rem] w-[2.5rem] ${soundOn ? `btn-primary ${!darkMode ? 'btn-outline': ''}`: 'btn-ghost'}`} onClick={handleMute}>
        <img className='flex justify-center items-center w-6 h-6 stroke-current' src={soundOn ? volOn : volOff} alt="sound-button" />
      </button>
    </div>
  )

};

export default Sound;