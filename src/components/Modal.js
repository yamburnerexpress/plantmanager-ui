import React from 'react';

export const Modal = (props) => {

  return (
    <div className='bg-slate-700 bg-opacity-70 fixed z-50 justify-center items-center w-full h-full'>
      <div className='relative p-4 w-full max-w-2xl max-h-full'>
        <div className='w-full px-3 bg-white '>
          <div className='modal-header'></div>
          <div className='modal-body'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}