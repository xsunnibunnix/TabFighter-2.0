import React from 'react';

interface ShrinkProps {
  play: boolean
}

export const Shrink = ({ play }: ShrinkProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/shrink.mp3" />
  )
};