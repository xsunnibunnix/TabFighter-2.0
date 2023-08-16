import React from 'react';

interface HadoukenProps {
  play: boolean
}

export const Hadouken = ({ play }: HadoukenProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/Hadouken.mp3" />
  )
};