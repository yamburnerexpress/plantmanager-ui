import React, {useRef, useEffect} from 'react';
import { useModalContext } from '../hooks/ModalProvider';
import { trapFocus } from '../helpers/trapFocus';

export const ModalHeader = (props) => {
  const {closeModal} = useModalContext();

  return (
    <div className='flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
      <span className='flex'>
        {props.children}
      </span>
      <button onClick={closeModal} className='text-xl font-bold'>X</button>
    </div>
  )
}

export const ModalContent = (props) => {
  return (
    <div className='flex-auto overflow-y-auto relative p-4'>
      {props.children}
    </div>
  )
}

export const ModalFooter = (props) => {
  return (
    <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-3 border-t border-gray-200 rounded-b-md">
      {props.children}
    </div>
  )
}

export const Modal = (props) => {
  const {modalOpen, closeModal} = useModalContext();
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalOpen) {
      trapFocus(modalRef, closeModal)
    }
  }, [modalOpen, closeModal]);

  return (
    <div onClick={closeModal} className='bg-slate-700 bg-opacity-70 z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto'>
      <div ref={modalRef} className='min-h-fit h-[calc(100%-3rem)] max-w-lg my-6 px-4 mx-auto relative w-auto pointer-events-none'>
        <div onClick={(e) => e.stopPropagation()} className='max-h-full overflow-hidden border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
          {props.children}
        </div>
      </div>
    </div>
  )
}