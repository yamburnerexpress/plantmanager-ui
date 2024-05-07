import React from "react";

export const SelectInput = ({children, label, onChange, ...props}) => {
  return (
    <>
      <label htmlFor={props.id} className="font-semibold mb-px">{label}</label>
      <select {...props} onChange={onChange} className="border border-black rounded mb-3 px-2 py-px">
        {children}
      </select>
    </>
    
  )
}