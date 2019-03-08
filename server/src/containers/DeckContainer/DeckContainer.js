import React from 'react'
import cuid from 'cuid'
import produce from 'immer'

import ws from '../../utils/socket'
import Deck from '../../components/Deck'
import { useModalContext } from '../../context/ModalContext/ModalContext'

const isFolder = (action) => {
  return action && action.extras && action.extras.actions
}

const findAndMutateAction = (draftActions, newAction, actionsStack) => {
  const [currentStack, ...restActionsStack] = actionsStack

  const currentDraftAction = draftActions.find(
    (action) => action.id === currentStack,
  )

  if (restActionsStack.length === 0) {
    if (newAction.id) {
      const currentStackIndex = draftActions.extras.actions.findIndex(
        currentStack,
      )
      draftActions[currentStackIndex] = newAction

      return
    }

    if (isFolder(currentDraftAction)) {
      currentDraftAction.extras.actions.push({ ...newAction, id: cuid() })
      return
    }

    draftActions.push({ ...newAction, id: cuid() })

    return
  }

  const nextDraftAction = currentDraftAction.extras.actions.find(
    (action) => action.id === restActionsStack[0],
  )

  findAndMutateAction(
    nextDraftAction.extras.actions,
    newAction,
    restActionsStack,
  )
}

const getLastActionsFromStack = (actionsStack, deck) => {
  let actions = deck.actions
  for (let i = 0; i < actionsStack.length; i++) {
    const nextActionId = actionsStack[i]
    actions = actions.find((x) => x.id === nextActionId).extras.actions
  }

  return actions
}

const DeckContainer = ({ deck }) => {
  const [actionsStack, setActionsStack] = React.useState([])

  const updateAction = (action) => {
    const newDeck = produce(deck, (draftDeck) => {
      findAndMutateAction(draftDeck.actions, action, actionsStack)
    })

    ws.emit('DECKS:UPDATE', { id: newDeck.id, deck: newDeck })
  }

  const { toggleOpenModal } = useModalContext()

  const addActionsToStack = (parentId) => {
    setActionsStack([...actionsStack, parentId])
  }

  const returnOneActionsStack = () => {
    setActionsStack(actionsStack.slice(0, actionsStack.length - 1))
  }

  const lastActionsStack = getLastActionsFromStack(actionsStack, deck)

  return (
    <Deck
      {...deck}
      actions={lastActionsStack}
      hasPreviousActionsStack={actionsStack.length > 0}
      addActionsToStack={addActionsToStack}
      returnOneActionsStack={returnOneActionsStack}
      toggleOpenModal={toggleOpenModal}
      updateAction={updateAction}
    />
  )
}

export default DeckContainer
