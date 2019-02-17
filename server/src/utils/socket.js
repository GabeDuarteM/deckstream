import SocketWrapper from 'simple-ws-wrapper'

const ws = new SocketWrapper(new WebSocket('ws://localhost:8080'))

export default ws
