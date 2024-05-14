import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
  const [modalOpen, setModalOpen] = useState(null);

  const closeModal = () => {
    setModalOpen(null);
  }

  return (
    <ModalContext.Provider value={{modalOpen, setModalOpen, closeModal}}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  return useContext(ModalContext);
}