import 'dart:convert';

class SocketMessageParser {
  static String toJson(SocketMessage message) {
    final obj = {
      'type': message.type,
      'data': message.data,
    };

    return jsonEncode(obj);
  }

  static SocketMessage toSocketMessage(String message) {
    final mapMessage = jsonDecode(message);

    return SocketMessage(mapMessage["type"], data: mapMessage["data"]);
  }
}

class SocketMessage {
  final type;
  final data;

  SocketMessage(this.type, {this.data});

  toJson() {
    return SocketMessageParser.toJson(this);
  }
}
