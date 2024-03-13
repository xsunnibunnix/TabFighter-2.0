import React from 'react';

type YahooProps = {
  play: boolean
}

export const Yahoo = ({ play }: YahooProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/yahoo.mp3" />
  )
};