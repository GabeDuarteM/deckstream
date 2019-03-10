import 'package:flutter/material.dart';

class DeckButton extends StatelessWidget {
  final String text;
  final Function tapAction;

  DeckButton(this.text, this.tapAction);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        height: 90,
        width: 90,
        child: RaisedButton(
          child: Text(text),
          onPressed: tapAction,
        ),
      ),
    );
  }
}
