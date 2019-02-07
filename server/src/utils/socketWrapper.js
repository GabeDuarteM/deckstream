const log = (data) => {
  console.log()
  console.log('######### Received message #########')
  console.log(`TYPE: ${data.type}`)
  console.log(`CONTENT: ${JSON.stringify(data.content)}`)
  console.log()
}

const handleMessage = (on, handlers, isBrowser) => {
  on('message', (message) => {
    const internalMessage = isBrowser ? message.data : message
    let data
    try {
      data = JSON.parse(internalMessage)
    } catch (e) {
      data = { type: internalMessage, content: undefined }
    }

    if (handlers[data.type]) {
      handlers[data.type](data.content)
    }

    log(data)
  })
}

const createEmitter = (ws) => (type, content) => {
  const message = {
    type,
    content,
  }
  ws.send(JSON.stringify(message))
}

class SocketWrapper {
  constructor(ws) {
    this.handlers = {}
    this.ws = ws
    this.isServer = !ws.url
    this.isBrowser = !!window

    if (this.isServer) {
      this._on(ws, 'connection', (client) => {
        console.log('client connected')

        handleMessage(client.on, this.handlers)
        this.emit = createEmitter(client)
      })
    } else {
      this._on(ws, 'open', () => {
        console.log('connected to server')

        handleMessage(
          this._on.bind(null, this.ws),
          this.handlers,
          this.isBrowser,
        )
      })

      this.emit = createEmitter(ws)
    }
  }

  _on(ws, ...rest) {
    if (ws.on) {
      ws.on(...rest)
    } else {
      ws.addEventListener(...rest)
    }
  }

  on(event, handler) {
    const defaultEvents = ['open', 'connection']

    if (defaultEvents.includes(event)) {
      this._on(this.ws, event, handler)
      return
    }

    this.handlers[event] = handler
  }

  waitForConnection() {
    const event = this.isServer ? 'connection' : 'open'
    return new Promise((resolve) => {
      this._on(this.ws, event, () => resolve())
    })
  }
}

export default SocketWrapper
