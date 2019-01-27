import io from "socket.io-client";
const ws = io("ws://192.168.123.175:8080");

export default ws;
