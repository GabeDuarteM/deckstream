import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'
import styled from 'styled-components/macro'

const StyledList = styled(List)`
  && {
    width: 250px;
    margin-top: ${({ theme }) => theme.headerHeight};
  }
`

const DecksDrawer = ({ decks, setActiveDeckId, activeDeck }) => {
  return (
    <Drawer open={!activeDeck}>
      <StyledList>
        {decks &&
          decks.map((deck) => (
            <ListItem
              onClick={() => setActiveDeckId(deck.id)}
              button
              key={deck}
            >
              <ListItemText primary={deck.id} />
            </ListItem>
          ))}
        <Divider />
      </StyledList>
    </Drawer>
  )
}

export default DecksDrawer
