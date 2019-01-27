import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import getTheme from "./theme";
import DeckContainer from "./containers/DeckContainer";
import DeckSelectorContainer from "./containers/DeckSelectorContainer/DeckSelectorContainer";
import ConnectContainer from "./containers/ConnectContainer/ConnectContainer";

const theme = getTheme();

const StyledApp = styled.View`
  background-color: #fff;
`;

class App extends React.Component {
  state = {
    connected: false,
    loadedFonts: false
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loadedFonts: true });
  }

  render = () => {
    if (!this.state.loadedFonts) {
      return null;
    } else if (!this.state.connected) {
      return (
        <ConnectContainer
          setConnect={connected => {
            this.setState({ connected });
          }}
        />
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <StyledApp>
          <DeckSelectorContainer />
          <DeckContainer />
        </StyledApp>
      </ThemeProvider>
    );
  };
}

export default App;
