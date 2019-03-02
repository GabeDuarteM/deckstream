import 'package:flutter/material.dart';
import 'dart:io';

import './Deck.dart' as DeckWidget;
import './SocketConnector.dart';
import '../utils/SocketUtils.dart';
import '../utils/Deck.dart';
import '../utils/Action.dart';

class Home extends StatefulWidget {
  final Function setDecks;
  final Deck activeDeck;
  Home(this.setDecks, this.activeDeck);

  @override
  State<StatefulWidget> createState() => HomeState();
}

class HomeState extends State<Home> {
  bool socketConnected;
  WebSocket _socket;
  String _ip;
  String _error;
  bool _loading = false;

  void setIp(newIp) {
    _ip = newIp;
  }

  void setLoading(loading) {
    setState(() {
      _loading = loading;
    });
  }

  void showErrorMessage() {
    showDialog(
        context: context,
        builder: (dialogContext) {
          return AlertDialog(
            title: Text('Error'),
            content:
                Text("Unable to connect to the server. Please, check the IP."),
            actions: <Widget>[
              // usually buttons at the bottom of the dialog
              new FlatButton(
                child: new Text("Close"),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              )
            ],
          );
        });
  }

  void dataHandler(data) {
    final SocketMessage message = SocketMessageParser.toSocketMessage(data);

    switch (message.type) {
      case "DECKS:SEED":
        setLoading(false);
        widget.setDecks(message.data.map<Deck>((obj) => Deck(obj)).toList());
        if (widget.activeDeck == null) {
          Scaffold.of(context).openDrawer();
        }

        break;
      default:
    }
  }

  void errorHandler(err) {
    print("Unable to connect: $err");
  }

  void onConnect() async {
    _error = null;

    setLoading(true);

    WebSocket.connect('ws://$_ip:8080').then((WebSocket socket) {
      _socket = socket;

      _socket.listen(dataHandler, onError: errorHandler);

      String requestSeed =
          SocketMessageParser.toJson(SocketMessage('DECKS:REQUEST_SEED'));

      _socket.add(requestSeed);
    }).catchError((e) {
      setLoading(false);

      showErrorMessage();
    });
  }

  void setSocketConnected(bool connected) {
    setState(() {
      socketConnected = connected;
    });
  }

  void performAction(Action action) {
    Map data = action.extras;
    SocketMessage message = SocketMessage(action.type, data: data);

    _socket.add(message.toJson());
  }

  @override
  Widget build(BuildContext context) {
    if (_loading == true) {
      return Center(child: Text("Loading..."));
    }

    return _socket != null && _error == null
        ? DeckWidget.Deck(widget.activeDeck, performAction)
        : SocketConnector(
            onIpChange: setIp,
            onConnect: onConnect,
            error: _error,
          );
  }
}
