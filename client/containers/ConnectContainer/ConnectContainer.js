import React from "react";
import Connect from "../../components/Connect";
import { createConnection } from "../../utils/socket";

class ConnectContainer extends React.Component {
  state = {
    ip: "192.168.123.175"
  };

  handleConnect = () => {
    const ws = createConnection(this.state.ip);
    ws.on("connect", () => {
      this.props.setConnect(true);
    });
  };

  handleChangeIp = ip => {
    this.setState({ ip });
  };

  render = () => {
    return (
      <Connect
        ip={this.state.ip}
        onConnect={this.handleConnect}
        onChangeIp={this.handleChangeIp}
      />
    );
  };
}

export default ConnectContainer;
