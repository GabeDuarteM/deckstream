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
