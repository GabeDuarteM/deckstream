import React from 'react'
import styled from 'styled-components/macro'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core'
import Select from '../Select'

const MainFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-bottom: 8px;
`

const AdditionalFields = styled.div`
  display: grid;
  grid-template: ${({ columns = 1 }) => `1fr / repeat(${columns}, 1fr)`};
  grid-gap: 8px;
  margin-top: 8px;
`

const TYPES = {
  'OBS:CHANGE_SCENE': {
    value: 'OBS:CHANGE_SCENE',
    text: 'OBS: Change scene',
  },
  'OBS:TOGGLE_MIC_MUTE': {
    value: 'OBS:TOGGLE_MIC_MUTE',
    text: 'OBS: Toggle microphone mute',
  },
  PRESS: {
    value: 'PRESS',
    text: 'Press',
  },
  TEXT: {
    value: 'TEXT',
    text: 'Text',
  },
}

const getAdditionalFieldsByType = (state) => {
  switch (state.type) {
    case TYPES['OBS:CHANGE_SCENE'].value:
      return {
        columns: 1,
        fields: [
          <Select
            key="scene"
            label="Scene"
            value={state.scene}
            onChange={state.setScene}
            items={
              state.scenes &&
              state.scenes.map((item) => ({
                value: item.name,
                text: item.name,
              }))
            }
          />,
        ],
      }

    case TYPES.PRESS.value:
      return {
        columns: 2,
        fields: [
          <TextField
            key="key"
            label="Key"
            value={state.press.key}
            onChange={(evt) => state.setKey(evt.target.value)}
          />,
          <Select
            key="modifiers"
            label="Modifiers"
            multiple
            value={state.press.modifier}
            onChange={state.setModifier}
            items={[
              { value: 'control', text: 'Ctrl' },
              { value: 'alt', text: 'Option' },
              { value: 'command', text: 'Command' },
              { value: 'shift', text: 'Shift' },
            ]}
          />,
        ],
      }

    case '':
    case undefined:
    case null:
      return {
        columns: 0,
        fields: [],
      }

    default:
      throw new Error(`Unknown type ${state.type}`)
  }
}

const MacroDetails = (props) => {
  const { name, type, setType, setName, open, onSave, onClose } = props
  const types = Object.values(TYPES)

  const additonalFields = getAdditionalFieldsByType(props)

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Macro</DialogTitle>
      <DialogContent>
        <MainFields>
          <TextField
            label="Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <Select label="Type" value={type} onChange={setType} items={types} />
        </MainFields>
        <AdditionalFields columns={additonalFields.columns}>
          {additonalFields.fields}
        </AdditionalFields>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" autoFocus onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MacroDetails
