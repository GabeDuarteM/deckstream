import 'package:meta/meta.dart';

class Action {
  final String id;
  final String type;
  final String name;

  Action({@required this.id, @required this.type, @required this.name});
}

class PressAction implements Action {
  final Press press;
  final String id;
  final String type;
  final String name;

  PressAction({
    @required this.id,
    @required this.type,
    @required this.name,
    @required this.press,
  });
}

class Press {
  final String key;
  final List modifier;

  Map<String, dynamic> toMap() {
    final map = Map<String, dynamic>();
    map["modifier"] = modifier;
    map["key"] = key;

    return map;
  }

  Press(this.key, {this.modifier});
}
