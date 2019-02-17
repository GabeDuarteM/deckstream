import React from 'react'
import styled from 'styled-components/macro'
import { Button } from '@material-ui/core'

const StyledDeckButton = styled(Button)`
  width: 76px;
  min-height: 76px;
  display: -webkit-box;
  align-items: center;
  justify-content: center;
  text-align: center;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  border-radius: 4px;
`

const DeckButton = ({ name, ...rest }) => {
  return (
    <StyledDeckButton variant="contained" color="secondary" {...rest}>
      {name}
    </StyledDeckButton>
  )
}

export default DeckButton
