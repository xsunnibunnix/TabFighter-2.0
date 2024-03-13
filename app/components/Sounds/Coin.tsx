import React from 'react';

type CoinProps = {
  play: boolean
}

export const Coin = ({ play }: CoinProps) => {
  return (
    <audio autoPlay={play} src="../../soundFiles/coin.mp3" />
  )
};