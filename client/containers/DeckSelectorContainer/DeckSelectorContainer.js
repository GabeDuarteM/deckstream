import React from "react";
import DeckSelector from "../../components/DeckSelector";
import getWs from "../../utils/socket";

class DeckSelectorContainer extends React.Component {
  state = {
    decks: [],
    ws: getWs()
  };
  componentDidMount = () => {
    this.state.ws.on("DECKS:SEED", decks => {
      this.setState({ decks });
    });
  };

  render = () => {
    return <DeckSelector decks={this.state.decks} />;
  };
}

export default DeckSelectorContainer;
