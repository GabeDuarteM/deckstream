import io from 'socket.io-client'

const ws = io('ws://localhost:8080')

export default ws
