const WebSocket = require('ws')
const robot = require('robotjs')
// const OBSWebSocket = require('obs-websocket-js')
const SocketWrapper = require('simple-ws-wrapper')
const { getDecks, saveDeck } = require('./db-service')

;(() => {
  const socket = new SocketWrapper(new WebSocket.Server({ port: 8080 }))
  socket.on('connection', () => {
    console.log('client connected')
  })
  socket.on('DECKS:REQUEST_SEED', () => {
    socket.emit('DECKS:SEED', getDecks())
  })

  socket.on('DECKS:UPDATE', ({ deck }) => {
    saveDeck(deck)
    socket.emit('DECKS:SEED', getDecks())
  })

  socket.on('PRESS', ({ key, modifier }) => {
    robot.keyTap(key, modifier)
  })
})()

// const obs = new OBSWebSocket()
// obs.connect({ address: '', password: '' })
// obs.on('error', (evt) => {
//   console.log(JSON.stringify(evt))
// })

// ws.on('message', async (message) => {
//   const obj = parseWsMessage(message)
//   console.log(
//     `received: type: ${obj.type}, content: ${JSON.stringify(obj.content)}`,
//   )
//   switch (obj.type) {
//     case 'TYPE':
//       robot.typeString(obj.content)
//       break
//     case 'PRESS':
//       robot.keyTap(obj.content.key, obj.content.modifier)
//       break
//     case 'OBS':
//       obs.send(obj.content.type, obj.content.content)
//       break
//     case 'GET_SCENES':
//       try {
//         const scenes = await obs.send('GetSceneList')
//         console.log(scenes)
//         try {
//           ws.send(prepareWsObject({ type: 'GET_SCENES', content: scenes }))
//         } catch (error) {
//           console.log('object')
//         }
//       } catch (err) {
//         console.log(JSON.stringify(err))
//       }
//       break
//     case 'DECKS:REQUEST_SEED': {
//       const seed = prepareWsObject({
//         type: 'DECKS:SEED',
//         content: getDecks(),
//       })

//       ws.send(seed)
//       console.log(seed)
//       break
//     }
//     case 'DECKS:UPDATE':
//       saveDeck(obj.content.deck)
//       break

//     default:
//       break
//   }
// })
