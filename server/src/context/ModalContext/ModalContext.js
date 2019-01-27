import React, { createContext, useState } from 'react'

const ModalContext = createContext()

export const ModalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    macroDetails: { open: false, action: null },
  })
  const toggleOpenModal = (modalName, content) =>
    setState({
      ...state,
      [modalName]: { open: !state[modalName].open, ...content },
    })

  return (
    <ModalContext.Provider value={{ ...state, toggleOpenModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
