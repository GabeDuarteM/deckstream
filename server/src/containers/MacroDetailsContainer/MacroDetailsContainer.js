import React, { useEffect } from 'react'
import MacroDetails from '../../components/MacroDetails'
import { useModalContext } from '../../context/ModalContext/ModalContext'
import ws from '../../utils/socket'
import useActionReducer from '../../reducers/action'

const MacroDetailsContainer = ({ onSave }) => {
  const { macroDetails, toggleOpenModal } = useModalContext()
  const {
    action,
    setEdit,
    setScenes,
    setName,
    setType,
    setScene,
    setModifier,
    setKey,
    resetState,
  } = useActionReducer()
  const { extras, ...restAction } = action

  useEffect(() => {
    if (macroDetails.action) {
      setEdit(macroDetails.action)
    }
  }, [macroDetails.action])

  useEffect(() => {
    ws.on('GET_SCENES', (scenes) => {
      setScenes(scenes)
    })

    if (action.type === 'OBS:CHANGE_SCENE') {
      ws.emit('GET_SCENES')
    }
  }, [action.type])

  const onClose = () => {
    toggleOpenModal('macroDetails')
    resetState()
  }

  const handleOnSave = () => {
    onSave({ ...action })
    onClose()
  }

  return (
    <MacroDetails
      {...restAction}
      extras={extras}
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
