import React, { useEffect, useState } from 'react'
import cuid from 'cuid'
import ws from '../../utils/socket'
import Deck from '../../components/Deck'

const DeckContainer = () => {
  const [deck, setDeck] = useState(null)
  useEffect(() => {
    ws.on('DECKS:SEED', (decks) => {
      setDeck(decks[0])
    })

    ws.emit('DECKS:REQUEST_SEED')
  }, [])

  const updateAction = (action) => {
    const newDeck = {
      ...deck,
      actions: action.id
        ? deck.actions.map((x) => (x.id === action.id ? action : x))
        : [...deck.actions, { ...action, id: cuid() }],
    }
    setDeck(newDeck)
    ws.emit('DECKS:UPDATE', { id: newDeck.id, deck: newDeck })
  }

  return <Deck {...deck} updateAction={updateAction} />
}

export default DeckContainer
