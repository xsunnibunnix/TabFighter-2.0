import React, { createContext, useState, useEffect } from 'react';

interface SoundContextProps {
  soundOn: boolean,
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>
}

export const SoundContext = createContext<SoundContextProps | null>(null);

export default function SoundProvider ({ children }: { children: React.ReactNode }) {
  let localSound = localStorage.getItem('sound');
  const [soundOn, setSoundOn] = useState<boolean>(localSound ? (localSound === 'on' ? true : false) : true);

  useEffect(() => {
    localStorage.setItem('sound', soundOn ? 'on' : 'off');
    localSound = localStorage.getItem('sound');
    setSoundOn(() => localSound === 'on' ? true : false)
  }, [soundOn]);

  return <SoundContext.Provider value={{ soundOn, setSoundOn }}>{children}</SoundContext.Provider>;
}