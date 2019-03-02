import React from 'react'
import cuid from 'cuid'
import produce from 'immer'

import ws from '../../utils/socket'
import Deck from '../../components/Deck'
import { useModalContext } from '../../context/ModalContext/ModalContext'

const DeckContainer = ({ deck }) => {
  const updateAction = (action) => {
    const newDeck = produce(deck, (draftDeck) => {
      if (action.id) {
        const oldActionIndex = draftDeck.actions.findIndex(
          (x) => x.id === action.id,
        )

        draftDeck.actions[oldActionIndex] = action

        return
      }

      draftDeck.actions.push({ ...action, id: cuid() })
    })

    ws.emit('DECKS:UPDATE', { id: newDeck.id, deck: newDeck })
  }
  const { toggleOpenModal } = useModalContext()

  return (
    <Deck
      {...deck}
      toggleOpenModal={toggleOpenModal}
      updateAction={updateAction}
    />
  )
}

export default DeckContainer
