import React from 'react'
import cuid from 'cuid'
import produce from 'immer'

import ws from '../../utils/socket'
import Deck from '../../components/Deck'
import { useModalContext } from '../../context/ModalContext/ModalContext'

const isFolder = (action) => {
  return Boolean(action && action.extras && action.extras.folderActions)
}

const getActions = (actions, actionFromStack) => {
  if (isFolder(actionFromStack)) {
    return actionFromStack.extras.folderActions
  }

  return actions
}

const findAndMutateAction = (draftActions, newAction, actionsStack) => {
  const [currentStack, ...restActionsStack] = actionsStack

  const currentDraftActionFromStack = draftActions.find(
    (action) => action.id === currentStack,
  )
  const correctActions = getActions(draftActions, currentDraftActionFromStack)

  if (restActionsStack.length === 0) {
    if (newAction.id) {
      const currentStackIndex = correctActions.findIndex(
        (x) => x.id === newAction.id,
      )
      if (currentStackIndex === -1) {
        throw new Error(`Action with id ${newAction.id} was not found`)
      }

      correctActions[currentStackIndex] = newAction

      return
    }

    correctActions.push({ ...newAction, id: cuid() })

    return
  }

  const nextDraftAction = correctActions.find(
    (action) => action.id === restActionsStack[0],
  )

  findAndMutateAction(
    nextDraftAction.extras.folderActions,
    newAction,
    restActionsStack,
  )
}

const getLastActionsFromStack = (actionsStack, deck) => {
  let actions = deck.actions
  for (let i = 0; i < actionsStack.length; i++) {
    const nextActionId = actionsStack[i]
    actions = actions.find((x) => x.id === nextActionId).extras.folderActions
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
