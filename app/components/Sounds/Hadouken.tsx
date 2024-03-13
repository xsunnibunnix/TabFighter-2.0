import React from 'react';

type HadoukenProps = {
  play: boolean
}

export const Hadouken = ({ play }: HadoukenProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/Hadouken.mp3" />
  )
};