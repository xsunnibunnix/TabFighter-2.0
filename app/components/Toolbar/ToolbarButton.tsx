import React, { ReactNode } from 'react';

type ToolbarButtonProps = {
  clickFunc: () => void,
  smallActive: Boolean
  children: ReactNode
}

const ToolbarButton = ({clickFunc, smallActive, children}:ToolbarButtonProps) => {
  return (
    <button className={ `btn btn-ghost btn-square ${smallActive ? 'btn-sm h-9 w-9 ml-1' : 'btn-md w-11 h-11 ml-2' }` } onClick={ clickFunc }>
      {children}
    </button>
  )
};

export default ToolbarButton;