import 'package:flutter/material.dart';

class SocketConnector extends StatelessWidget {
  final Function onIpChange;
  final Function onConnect;
  final String error;
  final ipController = TextEditingController();

  SocketConnector({
    @required this.onIpChange,
    @required this.onConnect,
    this.error,
  }) {
    ipController.addListener(() {
      onIpChange(ipController.text);
    });
    ipController.text = "192.168.123.175";
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Container(
          padding: EdgeInsets.fromLTRB(50, 0, 50, 0),
          child: new TextFormField(
            decoration: InputDecoration(labelText: 'Server IP'),
            controller: ipController,
          ),
        ),
        Container(
          padding: EdgeInsets.fromLTRB(50, 0, 50, 0),
          child: new FlatButton(
            child: Text('Connect'),
            onPressed: onConnect,
          ),
        ),
      ],
    );
  }
}
