import React, {useState, useEffect} from 'react';

export const Button = (props) => {
  const [classStr, setClassStr] = useState();
  
  useEffect(() => {
    switch (props.variant) {
      case "square":
        setClassStr(`${props.className ? props.className : ''} shadow-md bg-blue-500 active:bg-blue-700 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded`);
        break;
      default:
        setClassStr(`${props.className ? props.className : ''} shadow-md bg-blue-500 active:bg-blue-700 hover:bg-blue-700 text-white font-bold p-3 rounded-full`);
    }
  }, [props])

  return (
    <button 
      {...props}
      aria-label={props.label}
      onClick={props.onClick ? () => props.onClick(props.params) : null} 
      className={classStr}
    >
      {props.children}
    </button>
  )

  
}