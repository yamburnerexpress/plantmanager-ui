import React from 'react';
import { useModalContext } from '../hooks/ModalProvider';

export const ModalHeader = (props) => {
  const {closeModal} = useModalContext();

  return (
    <div className='modal-header w-full flex justify-between items-start h-auto mb-6'>
      <span className='flex'>
        {props.children}
      </span>
      <button onClick={closeModal} className='text-xl font-bold'>X</button>
    </div>
  )
}

export const ModalContent = (props) => {
  return (
    <div className='modal-body flex flex-col gap-y-5'>
      {props.children}
    </div>
  )
}

export const Modal = (props) => {
  const {closeModal} = useModalContext();

  return (
    <div onClick={closeModal} className='bg-slate-700 bg-opacity-70 fixed z-50 justify-center items-center w-full h-full'>
      <div className='relative p-4 w-full mx-auto max-w-2xl max-h-full'>
        <div onClick={(e) => e.stopPropagation()} className='w-full px-3 bg-white rounded-md py-6 px-6'>
          {props.children}
        </div>
      </div>
    </div>
  )
}