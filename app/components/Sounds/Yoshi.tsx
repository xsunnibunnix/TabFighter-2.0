import React from 'react';

interface YoshiProps {
  play: boolean
}

export const Yoshi = ({play}:YoshiProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/yoshi.mp3"/>
  )
}