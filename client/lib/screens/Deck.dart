import 'package:flutter/material.dart';

import '../widgets/DeckButton.dart';
import '../utils/Deck.dart' as DeckUtils;
import '../utils/Action.dart';

class Deck extends StatelessWidget {
  final DeckUtils.Deck _deck;
  final Function _performAction;

  Deck(this._deck, this._performAction);

  @override
  Widget build(BuildContext context) {
    if (_deck == null) {
      return Center(child: Text("Select a deck"));
    }

    return GridView.count(
      crossAxisCount: 5,
      padding: const EdgeInsets.fromLTRB(100, 30, 100, 30),
      children: _deck.actions
          .map((Action action) => DeckButton(action, _performAction))
          .toList(),
    );
  }
}
