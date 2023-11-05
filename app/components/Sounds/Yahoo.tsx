import React from 'react';

interface YahooProps {
  play: boolean
}

export const Yahoo = ({ play }: YahooProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/yahoo.mp3" />
  )
};