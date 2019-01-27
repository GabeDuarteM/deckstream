import React, { useReducer, useEffect, useContext } from 'react'
import MacroDetails from '../../components/MacroDetails'
import ModalContext from '../../context/ModalContext/ModalContext'
import ws from '../../utils/socket'

const initialState = {
  name: '',
  type: '',
  scene: null,
  scenes: null,
  press: { key: '', modifier: [] },
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'name':
      return { ...state, name: payload }

    case 'type':
      return { ...state, type: payload }

    case 'scene':
      return { ...state, scene: payload }

    case 'scenes':
      return { ...state, scenes: payload }

    case 'press':
      return { ...state, press: payload }

    case 'edit':
      return { ...payload }

    case 'reset':
      return initialState

    default:
      return state
  }
}

const MacroDetailsContainer = ({ onSave }) => {
  const { macroDetails, toggleOpenModal } = useContext(ModalContext)

  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (macroDetails.action) {
      dispatch({ type: 'edit', payload: macroDetails.action })
    }
  }, [macroDetails.action])

  const setName = (payload) => dispatch({ type: 'name', payload })
  const setType = (payload) => dispatch({ type: 'type', payload })
  const setScene = (payload) => dispatch({ type: 'scene', payload })
  const setScenes = (payload) => dispatch({ type: 'scenes', payload })
  const setPress = (payload) =>
    dispatch({ type: 'press', payload: { ...state.press, ...payload } })
  const resetState = () => dispatch({ type: 'reset' })

  const setModifier = (modifier) => setPress({ modifier })
  const setKey = (key) => setPress({ key })

  useEffect(() => {
    ws.on('GET_SCENES', (scenes) => {
      setScenes(scenes)
    })

    if (state.type === 'OBS:CHANGE_SCENE') {
      ws.emit('GET_SCENES')
    }
  }, [state.type])

  const onClose = () => {
    toggleOpenModal('macroDetails', { action: null })
    resetState()
  }
  const handleOnSave = () => {
    onSave({ ...state })
    onClose()
  }

  return (
    <MacroDetails
      {...state}
      open={macroDetails.open}
      onClose={onClose}
      onSave={handleOnSave}
      setName={setName}
      setType={setType}
      setScene={setScene}
      setModifier={setModifier}
      setKey={setKey}
    />
  )
}

export default MacroDetailsContainer
