import React from "react";
import { Picker } from "native-base";
import styled from "styled-components/native";

const StyledDeckSelector = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 48px;
`;

const DeckSelector = ({ decks }) => {
  return (
    <StyledDeckSelector>
      <Picker
        note
        mode="dropdown"
        style={{ width: 120 }}
        selectedValue={decks[0] && decks[0].id}
        // onValueChange={this.onValueChange.bind(this)}
      >
        {decks.map(x => (
          <Picker.Item label={x.id} value={x.id} key={x.id} />
        ))}
      </Picker>
    </StyledDeckSelector>
  );
};

export default DeckSelector;
