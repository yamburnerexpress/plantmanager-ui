import React from 'react';

export const Button = ({onClick, label, className="", params=null, children, variant}) => {
  
  let classStr;
  switch (variant) {
    case "square":
      classStr = 'shadow-md bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded';
      break;
    default:
      classStr = 'shadow-md bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full';
  }

  return (
    <button aria-label={label} onClick={onClick ? () => onClick(params) : null} className={`${className} ${classStr}`}>{children}</button>
  )

  
}