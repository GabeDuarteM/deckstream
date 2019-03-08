import React from 'react'
import styled from 'styled-components/macro'
import DeckButton from '../DeckButton'
import MacroDetailsContainer from '../../containers/MacroDetailsContainer'
import { TYPES } from '../../constants'

const StyledDeckRoot = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledDeck = styled.div`
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
  padding: 8px;
`

const Deck = ({
  actions,
  updateAction,
  toggleOpenModal,
  addActionsToStack,
  returnOneActionsStack,
  hasPreviousActionsStack,
}) => {
  return (
    <StyledDeckRoot>
      <StyledDeck>
        {hasPreviousActionsStack && (
          <DeckButton
            aria-label="Back"
            name="<"
            onClick={returnOneActionsStack}
          />
        )}
        {actions &&
          actions.map((action) => (
            <DeckButton
              onClick={() =>
                action.type === TYPES.FOLDER
                  ? addActionsToStack(action.id, action.extras.actions)
                  : toggleOpenModal('macroDetails', { action })
              }
              name={action.name}
              key={action.id}
            />
          ))}
        <DeckButton
          aria-label="Add"
          name="+"
          onClick={() => toggleOpenModal('macroDetails')}
        />
        <MacroDetailsContainer onSave={updateAction} />
      </StyledDeck>
    </StyledDeckRoot>
  )
}

export default Deck
