import React from 'react'
import styled from 'styled-components/macro'

const StyledHeader = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary[3]};
  height: 32px;
  justify-content: center;
  align-items: center;
  display: flex;
  -webkit-app-region: drag;
`

const Header = () => {
  return <StyledHeader>DeckStream</StyledHeader>
}

export default Header
