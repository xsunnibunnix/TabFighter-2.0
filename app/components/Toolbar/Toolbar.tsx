import React from 'react';
import ToolbarLeft from '../Toolbar/ToolbarLeft';
import ToolbarRight from '../Toolbar/ToolbarRight';

const Toolbar = () => {
  return (
    <div className="options flex items-center justify-between my-3.5 mx-auto box-border py-1 px-3.5">
      <ToolbarLeft />
      <ToolbarRight />
    </div>
  )
}

export default Toolbar