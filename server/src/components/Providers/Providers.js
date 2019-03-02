import React from 'react'
import { ThemeProvider } from 'styled-components/macro'
import { MuiThemeProvider } from '@material-ui/core'
import ModalContextProvider from '../../context/ModalContext/ModalContext'
import getTheme from '../../theme'

const theme = getTheme()

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <ModalContextProvider>{children}</ModalContextProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

export default Providers
