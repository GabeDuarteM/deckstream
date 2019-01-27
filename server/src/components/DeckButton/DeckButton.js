import React from 'react'
import styled from 'styled-components/macro'

const StyledDeckButton = styled.div`
  width: 76px;
  min-height: 76px;
  display: -webkit-box;
  align-items: center;
  justify-content: center;
  text-align: center;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.primary[2]};
  border-radius: 4px;
`

const DeckButton = ({ name, ...rest }) => {
  return <StyledDeckButton {...rest}>{name}</StyledDeckButton>
}

export default DeckButton
