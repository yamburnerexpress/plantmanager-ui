import React from 'react';

export const Button = ({onClick, label, className="", params=null, children}) => {
  return (
    <button aria-label={label} onClick={() => onClick(params)} className={className + 'shadow-md bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full'}>{children}</button>
  )
}