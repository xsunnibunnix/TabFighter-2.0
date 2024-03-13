import React from 'react';

type GrowProps = {
  play: boolean
}

export const Grow = ({ play }: GrowProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/grow.mp3" />
  )
};