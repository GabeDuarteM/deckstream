import React, { useEffect } from 'react'
import ws from '../../utils/socket'
import App from '../../components/App'

const AppContainer = () => {
  const { connected, setConnected } = React.useState(false)

  const waitForSocket = async () => {
    await ws.waitConnection()
    setConnected(true)
  }

  useEffect(() => {
    waitForSocket()
  }, [])

  return <App loading={connected} />
}

export default AppContainer
