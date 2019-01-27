import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import getTheme from "./theme";
import DeckContainer from "./containers/DeckContainer";

const theme = getTheme();

const StyledApp = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <StyledApp>
      <DeckContainer />
    </StyledApp>
  </ThemeProvider>
);

export default App;
