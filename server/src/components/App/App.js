import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import Header from '../Header'
import getTheme from '../../theme'
import { ModalContextProvider } from '../../context/ModalContext/ModalContext'
import DeckContainer from '../../containers/DeckContainer'

const GlobalStyles = createGlobalStyle`
  html,
  body,
  #root {
    font-family: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.color.primary[0]};
    user-select: none;
    color: ${({ theme }) => theme.color.font};
    height: 100%;
  }
`

const theme = getTheme()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <ModalContextProvider>
          <>
            <GlobalStyles />
            <CssBaseline />
            <Header />
            <DeckContainer />
          </>
        </ModalContextProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

export default App
