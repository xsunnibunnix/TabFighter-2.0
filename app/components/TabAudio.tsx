import React, { useContext } from "react";
import { useThemeContext } from '../context/ThemeContext';
import { useTabContext } from '../context/TabContext';
import darkVolOn from '../icons/darkvolon.svg'
import darkVolOff from '../icons/darkvoloff.svg';
import lightVolOn from '../icons/lightvolon.svg';
import lightVolOff from '../icons/lightvoloff.svg';
import { TabAudio } from "../../types";


const TabAudio = ({audible, mutedInfo, tabId}:TabAudio) => {
  const { darkMode } = useThemeContext();
  const { updateTabs } = useTabContext();
  const volOn = darkMode ? darkVolOn : lightVolOn;
  const volOff = darkMode ? darkVolOff : lightVolOff;
  const tabMuted = mutedInfo?.muted;

  const muteTab = async () => {
    await chrome.tabs.update(tabId!, { muted: !tabMuted });
    await updateTabs();
  };

  return (
    <div className="flex items-center mx-0.5">
      <button className={`btn btn-xs h-7 w-7 ${audible && !tabMuted ? `btn-primary ${!darkMode ? 'btn-outline': ''}`: 'btn-ghost'}`} onClick={muteTab}>
          <img className='flex justify-center items-center max-w-[1.2rem] stroke-current' src={tabMuted ? volOff : volOn} alt="sound-button" />
      </button>
    </div>
  )

};

export default TabAudio;