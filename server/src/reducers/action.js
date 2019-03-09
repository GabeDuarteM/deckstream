import { useReducer } from 'react'
import produce from 'immer'
import { TYPES } from '../constants'

const initialState = {
  id: '',
  name: '',
  type: '',
  extras: {},
}

const getDefaultExtrasByType = (type) => {
  switch (type) {
    case TYPES.PRESS:
      return {
        key: '',
        modifier: [],
      }

    case TYPES['OBS:CHANGE_SCENE']:
      return {
        scene: '',
      }
    case TYPES.FOLDER:
      return {
        folderActions: [],
      }

    default:
      throw new Error(`Unknown type: ${type}`)
  }
}

const reducer = produce((draft, { type, payload }) => {
  switch (type) {
    case 'name':
      draft[type] = payload
      return draft

    case 'type':
      draft[type] = payload
      draft.extras = getDefaultExtrasByType(payload)
      return draft

    case 'edit':
      return payload

    case 'reset':
      return initialState

    case 'scene':
    case 'scenes':
    case 'press':
      draft.extras = { ...draft.extras, ...payload }
      return draft

    default:
      return draft
  }
})

const createDispatcher = (dispatch) => (type, payload) =>
  dispatch({ type, payload })

const useActionReducer = () => {
  const [action, internalDispatch] = useReducer(reducer, initialState)
  const dispatch = createDispatcher(internalDispatch)

  const setName = (payload) => dispatch('name', payload)
  const setType = (payload) => dispatch('type', payload)
  const setScene = (payload) => dispatch('scene', payload)
  const setScenes = (payload) => dispatch('scenes', payload)
  const setPress = (payload) =>
    dispatch('press', { ...action.press, ...payload })
  const resetState = () => dispatch('reset')
  const setEdit = (payload) => dispatch('edit', payload)

  const setModifier = (modifier) => setPress({ modifier })
  const setKey = (key) => setPress({ key })

  return {
    action,
    setEdit,
    setScenes,
    setName,
    setType,
    setScene,
    setModifier,
    setKey,
    resetState,
  }
}

export default useActionReducer
