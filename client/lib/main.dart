import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import './utils/Deck.dart';
import './screens/Home.dart';
import './widgets/DeckSelectorDrawer.dart';

void main() async {
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
  ]);

  runApp(DeckStream());
}

class DeckStream extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => DeckstreamState();
}

class DeckstreamState extends State<DeckStream> {
  List<Deck> _decks;
  Deck activeDeck;

  void setDecks(List<Deck> decks) {
    setState(() {
      _decks = decks;
      if (activeDeck != null) {
        activeDeck =
            _decks.firstWhere((deck) => deck.id == activeDeck.id, orElse: null);
      }
    });
  }

  void setActiveDeck(Deck deck) {
    setState(() {
      activeDeck = deck;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DeckStream',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: Color.fromRGBO(40, 60, 80, 1),
        primarySwatch: Colors.teal,
      ),
      home: Scaffold(
        body: Home(setDecks, activeDeck),
        drawer: DeckSelectorDrawer(_decks, setActiveDeck),
      ),
    );
  }
}
