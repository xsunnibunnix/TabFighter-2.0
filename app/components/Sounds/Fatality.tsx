import React from 'react';

interface FatalityProps {
  play: boolean
}

export const Fatality = ({ play }: FatalityProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/FinishHim.mp3" />
  )
};