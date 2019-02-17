import 'package:flutter/material.dart';

import '../utils/Deck.dart';

class DeckSelectorDrawer extends StatelessWidget {
  final List<Deck> _decks;
  final Function _setActiveDeck;

  DeckSelectorDrawer(this._decks, this._setActiveDeck);

  @override
  Widget build(BuildContext context) {
    List<Widget> listViewChildren = [
      Center(
        child: Container(
          child: Text("Decks available: "),
          padding: EdgeInsets.all(16),
        ),
      ),
    ];

    if (_decks != null) {
      listViewChildren.addAll(_decks
          .map(
            (Deck deck) => ListTile(
                  title: Text(deck.id),
                  onTap: () {
                    _setActiveDeck(deck);
                    Navigator.pop(context);
                  },
                ),
          )
          .toList());
    }
    return Drawer(
      child: ListView(
        children: listViewChildren,
      ),
    );
  }
}
