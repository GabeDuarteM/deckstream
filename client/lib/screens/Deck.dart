import 'package:flutter/material.dart';

import '../widgets/DeckButton.dart';
import '../utils/Deck.dart' as DeckUtils;
import '../utils/Action.dart';

class Deck extends StatefulWidget {
  final DeckUtils.Deck _deck;
  final Function _performAction;

  Deck(this._deck, this._performAction);

  @override
  State<StatefulWidget> createState() => DeckState();
}

class DeckState extends State<Deck> {
  final List<String> _actionStack = [];

  List<Action> getActions() {
    if (this._actionStack.length > 0) {
      List<Action> actions = this._actionStack.fold(
        widget._deck.actions,
        (actions, actionId) {
          final currAction =
              actions.singleWhere((action) => action.id == actionId);
          final folderActions =
              mapToActions(currAction.extras["folderActions"]);

          return folderActions;
        },
      );

      return actions;
    }
    return widget._deck.actions;
  }

  List<DeckButton> transformActionToDeckButton(List<Action> actions) {
    final deckButtons = actions.map((Action action) {
      final isFolder = action.type == "FOLDER";
      final tapAction = isFolder
          ? () {
              setState(() {
                this._actionStack.add(action.id);
              });
            }
          : () {
              widget._performAction(action);
            };

      return DeckButton(action.name, tapAction);
    });

    return deckButtons.toList();
  }

  List<DeckButton> _addBackButton(List<DeckButton> buttons) {
    final backButton = DeckButton(
      "<",
      () {
        setState(() {
          this._actionStack.removeLast();
        });
      },
    );

    final List<DeckButton> allButtons = List.from([backButton])
      ..addAll(buttons);

    return allButtons;
  }

  @override
  Widget build(BuildContext context) {
    if (widget._deck == null) {
      return Center(child: Text("Select a deck"));
    }

    final actions = getActions();
    final deckButtons = transformActionToDeckButton(actions);

    final List<DeckButton> allButtons = this._actionStack.length > 0
        ? _addBackButton(deckButtons)
        : deckButtons;

    return Center(
      child: Container(
        width: 530,
        child: GridView.count(
          crossAxisCount: 5,
          // padding: const EdgeInsets.all(4.0),
          children: allButtons,
        ),
      ),
    );
  }
}
