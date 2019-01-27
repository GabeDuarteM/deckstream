import React from "react";
import { TextInput, Button } from "react-native";
import styled from "styled-components/native";

const StyledConnect = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledTextInput = styled.TextInput`
  border-bottom-color: black;
`;

const Connect = ({ ip, onConnect, onChangeIp }) => {
  return (
    <StyledConnect>
      <StyledTextInput value={ip} onChangeText={onChangeIp} />
      <Button title="Connect" onPress={onConnect} />
    </StyledConnect>
  );
};

export default Connect;
