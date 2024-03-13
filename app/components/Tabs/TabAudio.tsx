import React from "react";
import { useThemeContext } from '../../context/ThemeContext';
import { useTabContext } from '../../context/TabContext';
import { useFontContext } from '../../context/FontContext';
import volOn from '../../icons/volon.svg';
import lightVolOff from '../../icons/lightvoloff.svg';
import darkVolOff from '../../icons/darkvoloff.svg'
import { TabAudio } from "../../../types";

type volOn = string

const TabAudio = ({ mutedInfo, tabId }: TabAudio) => {
  const { darkMode } = useThemeContext();
  const { updateTabs } = useTabContext();
  const { smallActive } = useFontContext();
  const tabMuted = mutedInfo?.muted;
  const volOff:string = darkMode ? darkVolOff : lightVolOff;

  const muteTab = async () => {
    await chrome.tabs.update(tabId!, { muted: !tabMuted });
    await updateTabs();
  };

  return (
    <div className="flex items-center mr-1">
      <button className={ `flex items-center btn btn-ghost ${smallActive ? 'btn-xs h-7 w-7': 'btn-sm h-9 w-9'}` } onClick={ muteTab }>
        <img className={`${smallActive ? 'max-w-[1.2rem]' : 'max-w-[1.8rem]'}`} src={ tabMuted ? volOff : volOn } alt="sound-button" />
      </button>
    </div>
  )

};

export default TabAudio;