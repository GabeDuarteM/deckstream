import './Action.dart';

class Deck {
  final String id;
  final List<Action> actions;

  Deck(Map<String, dynamic> deckMap)
      : id = deckMap["id"],
        actions = mapToActions(deckMap["actions"]);
}
