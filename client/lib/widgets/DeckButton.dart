import 'package:flutter/material.dart';

import '../utils/Action.dart';

class DeckButton extends StatelessWidget {
  final Action action;
  final Function performAction;

  DeckButton(this.action, this.performAction);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        height: 90,
        width: 90,
        child: RaisedButton(
          child: Text(action.name),
          onPressed: () {
            performAction(action);
          },
        ),
      ),
    );
  }
}
