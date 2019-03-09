import React from 'react'
import { render, fireEvent } from '../../utils/testUtils'

import DeckContainer from './DeckContainer'
import ws from '../../utils/socket'

jest.mock('../../utils/socket')

const getEmptyDeck = () => ({
  id: 'default',
  actions: [],
})

const getDeckWithActions = () => ({
  id: 'default',
  actions: [
    {
      id: 'cjt01ffpa00004g5up2b1xmae',
      name: 'root folder',
      type: 'FOLDER',
      extras: {
        folderActions: [
          {
            id: 'cjt01fwnk00024g5ubzw5qhn4',
            name: 'subfolder 1',
            type: 'FOLDER',
            extras: {
              folderActions: [],
            },
          },
          {
            id: 'cjt01g7fa00034g5ul4x3bhlq',
            name: 'push x',
            type: 'PRESS',
            extras: {
              key: 'x',
              modifier: ['control'],
            },
          },
          {
            id: 'cjt01gfbc00044g5ujbe9p0jr',
            name: 'subfolder 2',
            type: 'FOLDER',
            extras: {
              folderActions: [
                {
                  id: 'cjt01gq8w00054g5uf44rbk42',
                  name: 'subsubfolder',
                  type: 'FOLDER',
                  extras: {
                    folderActions: [],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 'cjt01forb00014g5u9wi8hjes',
      name: 'push p',
      type: 'PRESS',
      extras: {
        key: 'p',
        modifier: [],
      },
    },
  ],
})

const getComponent = (deck) => <DeckContainer deck={deck} />

const getMuiSelectOptions = (field) => {
  return field.parentElement.querySelector("[role='button']")
}

describe('<DeckContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not have a back button on the root screen', () => {
    const deck = getEmptyDeck()
    const component = getComponent(deck)

    const { queryByLabelText } = render(component)
    const backAction = queryByLabelText(/back/i)

    expect(backAction).toBe(null)
  })

  it('should have a back button when inside of a folder', () => {
    const deck = getDeckWithActions()
    const component = getComponent(deck)

    const { getByText, getByLabelText } = render(component)
    const rootFolder = getByText('root folder')
    fireEvent.click(rootFolder)

    const backAction = getByLabelText(/back/i)
    expect(backAction).toBeInTheDocument()
  })

  it('should display an add action button when on the root screen', () => {
    const deck = getDeckWithActions()
    const component = getComponent(deck)

    const { getByLabelText } = render(component)

    expect(getByLabelText(/add/i)).toBeInTheDocument()
  })

  it('should display an add action button when inside a folder', () => {
    const deck = getDeckWithActions()
    const component = getComponent(deck)

    const { getByText, getByLabelText } = render(component)
    const rootFolder = getByText('root folder')
    fireEvent.click(rootFolder)

    expect(getByLabelText(/add/i)).toBeInTheDocument()
  })

  describe('add actions', () => {
    it('should allow adding a new folder when on the root screen', () => {
      const deck = getEmptyDeck()
      const component = getComponent(deck)

      const nameValue = 'some fancy name'

      const { getByText, getByLabelText, rerender } = render(component)

      const addButton = getByLabelText(/add/i)
      fireEvent.click(addButton)

      const nameField = getByLabelText(/name/i)
      fireEvent.change(nameField, { target: { value: nameValue } })

      const typeFieldOptions = getMuiSelectOptions(getByLabelText(/type/i))
      fireEvent.click(typeFieldOptions)
      const folderTypeOption = getByText(/folder/i)

      fireEvent.click(folderTypeOption)

      const saveField = getByText(/save/i)
      fireEvent.click(saveField)

      expect(ws.emit).toHaveBeenCalledTimes(1)

      const newDeckCall = ws.emit.mock.calls[0]
      const newDeck = newDeckCall[1].deck

      rerender(getComponent(newDeck))

      expect(getByText(nameValue)).toBeInTheDocument()
    })

    it('should allow adding a new folder while inside a folder', () => {
      const deck = getDeckWithActions()
      const component = getComponent(deck)

      const nameValue = 'some fancy name'

      const { getByText, getByLabelText, rerender, queryByLabelText } = render(
        component,
      )

      const folderButton = getByText(/root folder/i)
      fireEvent.click(folderButton)

      const addButton = getByLabelText(/add/i)
      fireEvent.click(addButton)

      const nameField = getByLabelText(/name/i)
      fireEvent.change(nameField, { target: { value: nameValue } })

      const typeFieldOptions = getMuiSelectOptions(getByLabelText(/type/i))
      fireEvent.click(typeFieldOptions)
      const folderTypeOption = getByText(/folder/i)

      fireEvent.click(folderTypeOption)

      const saveField = getByText(/save/i)
      fireEvent.click(saveField)

      expect(ws.emit).toHaveBeenCalledTimes(1)

      const newDeckCall = ws.emit.mock.calls[0]
      const newDeck = newDeckCall[1].deck

      rerender(getComponent(newDeck))

      expect(getByText(nameValue)).toBeInTheDocument()

      const backButton = getByLabelText(/back/i)
      fireEvent.click(backButton)

      expect(queryByLabelText(nameValue)).toBe(null)
    })

    it('should allow adding a new action while on the root screen', () => {
      const deck = getDeckWithActions()
      const component = getComponent(deck)

      const nameValue = 'some fancy name'
      const keyValue = 'g'

      const { getByText, getByLabelText, rerender } = render(component)

      const addButton = getByLabelText(/add/i)
      fireEvent.click(addButton)

      const nameField = getByLabelText(/name/i)
      fireEvent.change(nameField, { target: { value: nameValue } })

      const typeFieldOptions = getMuiSelectOptions(getByLabelText(/type/i))
      fireEvent.click(typeFieldOptions)
      const folderTypeOption = getByText(/Press/i)
      fireEvent.click(folderTypeOption)

      const keyField = getByLabelText(/key/i)
      fireEvent.change(keyField, { target: { value: keyValue } })

      const modifierFieldOptions = getMuiSelectOptions(
        getByLabelText(/modifier/i),
      )
      fireEvent.click(modifierFieldOptions)
      const folderModifierOption = getByText(/shift/i)
      fireEvent.click(folderModifierOption)

      const saveField = getByText(/save/i)
      fireEvent.click(saveField)

      expect(ws.emit).toHaveBeenCalledTimes(1)

      const newDeckCall = ws.emit.mock.calls[0]
      const newDeck = newDeckCall[1].deck

      rerender(getComponent(newDeck))

      expect(getByText(nameValue)).toBeInTheDocument()
    })

    it('should allow adding a new action while inside a folder', () => {
      const deck = getDeckWithActions()
      const component = getComponent(deck)

      const nameValue = 'some fancy name'
      const keyValue = 'g'

      const { getByText, getByLabelText, queryByLabelText, rerender } = render(
        component,
      )

      const folderButton = getByText(/root folder/i)
      fireEvent.click(folderButton)

      const addButton = getByLabelText(/add/i)
      fireEvent.click(addButton)

      const nameField = getByLabelText(/name/i)
      fireEvent.change(nameField, { target: { value: nameValue } })

      const typeFieldOptions = getMuiSelectOptions(getByLabelText(/type/i))
      fireEvent.click(typeFieldOptions)
      const folderTypeOption = getByText(/Press/i)
      fireEvent.click(folderTypeOption)

      const keyField = getByLabelText(/key/i)
      fireEvent.change(keyField, { target: { value: keyValue } })

      const modifierFieldOptions = getMuiSelectOptions(
        getByLabelText(/modifier/i),
      )
      fireEvent.click(modifierFieldOptions)
      const folderModifierOption = getByText(/shift/i)
      fireEvent.click(folderModifierOption)

      const saveField = getByText(/save/i)
      fireEvent.click(saveField)

      expect(ws.emit).toHaveBeenCalledTimes(1)

      const newDeckCall = ws.emit.mock.calls[0]
      const newDeck = newDeckCall[1].deck

      rerender(getComponent(newDeck))

      expect(getByText(nameValue)).toBeInTheDocument()

      const backButton = getByLabelText(/back/i)
      fireEvent.click(backButton)

      expect(queryByLabelText(nameValue)).toBe(null)
    })
  })

  describe('edit actions', () => {
    it('should allow to edit an action on the root screen', () => {
      const deck = getDeckWithActions()
      const component = getComponent(deck)

      const nameValue = 'push g'
      const keyValue = 'g'

      const { getByText, getByLabelText, rerender } = render(component)

      const pushPAction = getByText(/push p/i)
      fireEvent.click(pushPAction)

      const nameField = getByLabelText(/name/i)
      fireEvent.change(nameField, { target: { value: nameValue } })

      const keyField = getByLabelText(/key/i)
      fireEvent.change(keyField, { target: { value: keyValue } })

      const saveField = getByText(/save/i)
      fireEvent.click(saveField)

      expect(ws.emit).toHaveBeenCalledTimes(1)

      const newDeckCall = ws.emit.mock.calls[0]
      const newDeck = newDeckCall[1].deck

      rerender(getComponent(newDeck))

      expect(getByText(nameValue)).toBeInTheDocument()
    })

    it('should allow to edit an action while inside a folder', () => {
      const deck = getDeckWithActions()
      const component = getComponent(deck)

      const nameValue = 'push g'
      const keyValue = 'g'

      const { getByText, getByLabelText, rerender } = render(component)

      const rootFolder = getByText(/root folder/i)
      fireEvent.click(rootFolder)

      const pushXAction = getByText(/push x/i)
      fireEvent.click(pushXAction)

      const nameField = getByLabelText(/name/i)
      fireEvent.change(nameField, { target: { value: nameValue } })

      const keyField = getByLabelText(/key/i)
      fireEvent.change(keyField, { target: { value: keyValue } })

      const saveField = getByText(/save/i)
      fireEvent.click(saveField)

      expect(ws.emit).toHaveBeenCalledTimes(1)

      const newDeckCall = ws.emit.mock.calls[0]
      const newDeck = newDeckCall[1].deck

      rerender(getComponent(newDeck))

      expect(getByText(nameValue)).toBeInTheDocument()
    })
  })
})
