import React from 'react'
import styled from 'styled-components/macro'
import DeckButton from '../DeckButton'
import ModalContext from '../../context/ModalContext'
import MacroDetailsContainer from '../../containers/MacroDetailsContainer'

const StyledDeckRoot = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledDeck = styled.div`
  background-color: ${({ theme }) => theme.color.primary[1]};
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
  padding: 8px;
`

const Deck = ({ actions, updateAction }) => {
  const { toggleOpenModal } = React.useContext(ModalContext)

  return (
    <StyledDeckRoot>
      <StyledDeck>
        {actions &&
          actions.map((x) => (
            <DeckButton
              onClick={() => toggleOpenModal('macroDetails', { action: x })}
              name={x.name}
              key={x.id}
            />
          ))}
        <DeckButton name="+" onClick={() => toggleOpenModal('macroDetails')} />
        <MacroDetailsContainer onSave={updateAction} />
      </StyledDeck>
    </StyledDeckRoot>
  )
}

export default Deck
