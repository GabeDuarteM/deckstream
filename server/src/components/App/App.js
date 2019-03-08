import React from 'react'
import { createGlobalStyle } from 'styled-components/macro'
import { CssBaseline } from '@material-ui/core'
import Header from '../Header'
import DeckContainer from '../../containers/DeckContainer'
import Providers from '../Providers'
import DecksDrawer from '../DecksDrawer'

const GlobalStyles = createGlobalStyle`
  html,
  body,
  #root {
    font-family: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.color.primary[2]};
    user-select: none;
    color: ${({ theme }) => theme.color.font};
    height: 100%;
  }
`

const App = ({ loading, decks, activeDeck, setActiveDeckId }) => {
  return (
    <Providers>
      <>
        <GlobalStyles />
        <CssBaseline />
        <Header />
        <DecksDrawer
          activeDeck={activeDeck}
          decks={decks}
          setActiveDeckId={setActiveDeckId}
        />
        {loading || !activeDeck ? (
          'loading'
        ) : (
          <DeckContainer deck={activeDeck} />
        )}
      </>
    </Providers>
  )
}

export default App
