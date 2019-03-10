import 'package:meta/meta.dart';

class Action {
  final String id;
  final String type;
  final String name;
  final dynamic extras;

  Action({
    @required this.id,
    @required this.type,
    @required this.name,
    @required this.extras,
  });
}

List<Action> mapToActions(actionsMapList) {
  return actionsMapList.map<Action>((obj) {
    return Action(
      id: obj["id"],
      name: obj["name"],
      type: obj["type"],
      extras: obj["extras"],
    );
  }).toList();
}
