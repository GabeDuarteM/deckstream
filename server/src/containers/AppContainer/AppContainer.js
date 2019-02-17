import React, { useEffect } from 'react'
import ws from '../../utils/socket'
import App from '../../components/App'

const AppContainer = () => {
  const [connected, setConnected] = React.useState(false)
  const [decks, setDecks] = React.useState(null)
  const [activeDeckId, setActiveDeckId] = React.useState(null)

  const waitForSocket = async () => {
    ws.on('DECKS:SEED', (seedDecks) => {
      setDecks(seedDecks)
    })

    await ws.waitConnection()

    ws.emit('DECKS:REQUEST_SEED')
    setConnected(true)
  }

  useEffect(() => {
    waitForSocket()
  }, [])

  return (
    <App
      decks={decks}
      activeDeck={(decks && decks.find((x) => x.id === activeDeckId)) || null}
      setActiveDeckId={setActiveDeckId}
      loading={!connected}
    />
  )
}

export default AppContainer
