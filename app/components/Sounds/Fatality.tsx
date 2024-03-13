import React from 'react';

type FatalityProps = {
  play: boolean
}

export const Fatality = ({ play }: FatalityProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/FinishHim.mp3" />
  )
};