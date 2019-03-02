import React, { useContext, createContext, useState } from 'react'

const ModalContext = createContext()

const ModalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    macroDetails: { open: false, action: null },
  })

  const toggleOpenModal = (modalName, content = {}) => {
    const open = !state[modalName].open

    setState({
      ...state,
      [modalName]: { open, ...content },
    })
  }

  return (
    <ModalContext.Provider value={{ ...state, toggleOpenModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  return useContext(ModalContext)
}

export default ModalContextProvider
