import React from 'react';

export const Modal = (props) => {

  return (
    <div className='bg-slate-700 bg-opacity-70 fixed z-50 justify-center items-center w-full h-full'>
      <div className='relative p-4 w-full mx-auto max-w-2xl max-h-full'>
        <div className='w-full px-3 bg-white rounded-md py-6 px-6'>
          <div className='modal-header w-full flex justify-between items-start h-12'>
            <h2 className='text-xl font-bold'>{props.title}</h2>
            <button onClick={props.onClose} className='text-xl font-bold'>X</button>
          </div>
          <div className='modal-body'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}