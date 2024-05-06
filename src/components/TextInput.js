import React from "react";

export const TextInput = ({label, onChange, ...props}) => {
  console.log({...props})
  return (
    <>
      <label htmlFor={props.id} className="font-semibold mb-px">{label}</label>
      <input {...props} onChange={onChange} className="border border-black rounded mb-3 px-2 py-px" />
    </>
    
  )
}