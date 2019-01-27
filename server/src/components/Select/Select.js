import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core'

const getValue = (givenValue, multiple) => {
  let value

  if (givenValue) {
    value = givenValue
  } else if (multiple) {
    value = []
  } else {
    value = ''
  }

  return value
}

const Select = ({
  value: givenValue,
  onChange,
  items: givenItems,
  id: givenId,
  label,
  hasNone = true,
  className,
  multiple,
}) => {
  const id = givenId || label.toLowerCase().replace(' ', '-')
  const items = givenItems || []
  const value = getValue(givenValue, multiple)

  const handleChange = (evt) => {
    return onChange(evt.target.value)
  }

  return (
    <FormControl className={className}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <MuiSelect
        value={value}
        multiple={multiple}
        inputProps={{
          name: id,
          id,
        }}
        onChange={handleChange}
      >
        {hasNone && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
