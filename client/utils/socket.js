import io from "socket.io-client";
let ws;
export const createConnection = ip => {
  ws = io(`ws://${ip}:8080`);

  return ws;
};

const getWs = () => {
  return ws;
};

export default getWs;
