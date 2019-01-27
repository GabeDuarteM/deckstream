import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const StyledDeckButton = styled.TouchableOpacity`
  width: 112px;
  height: 112px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primary[2]};
  border-radius: 4px;
`;

const DeckButton = ({ className, name, ...rest }) => {
  return (
    <StyledDeckButton className={className} {...rest}>
      <Text>{name}</Text>
    </StyledDeckButton>
  );
};

export default DeckButton;
