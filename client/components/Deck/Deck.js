import React from "react";
import styled from "styled-components/native";
import DeckButton from "../DeckButton";

const StyledRootDeck = styled.View`
  margin: 48px;
  margin-top: 0px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDeck = styled.View`
  background-color: ${({ theme }) => theme.color.primary[1]};
  border-radius: 8px;
  padding: 8px;
  flex-direction: row;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
`;

const gridOptions = {
  col: 4,
  row: 2
};

const Deck = ({ actions }) => {
  const row =
    actions &&
    actions.map(action => (
      <DeckButton name={action.name} key={action.id} onPress={action.onPress} />
    ));
  // const cols = [...new Array(gridOptions.col)].map(() => row);
  return (
    <StyledRootDeck>
      <StyledDeck>{row}</StyledDeck>
    </StyledRootDeck>
  );
};

export default Deck;
