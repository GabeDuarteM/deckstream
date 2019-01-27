import React from "react";
import getWs from "../../utils/socket";
import Deck from "../../components/Deck";

class DeckContainer extends React.Component {
  state = {
    deck: null,
    ws: getWs()
  };
  componentDidMount = () => {
    this.state.ws.on("DECKS:SEED", decks => {
      this.setState({ deck: decks[0] });
    });

    this.state.ws.emit("DECKS:REQUEST_SEED");
  };

  getActions = () => {
    if (!this.state.deck) {
      return;
    }

    return this.state.deck.actions.map(action => {
      let onPress;
      switch (action.type) {
        case "PRESS":
          onPress = () => {
            this.state.ws.emit("PRESS", {
              key: action.press.key,
              modifier: action.press.modifier
            });
          };
          break;

        default:
          break;
      }
      return { name: action.name, id: action.id, onPress };
    });
  };

  render = () => <Deck {...this.state.deck} actions={this.getActions()} />;
}

export default DeckContainer;
