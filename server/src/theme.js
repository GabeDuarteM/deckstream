import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#e64a19',
    },
  },
  color: {
    primary: ['#29506D', '#7994A8', '#4C6F8A', '#113551', '#031F34'],
    font: 'white',
  },
  font: 'Roboto',
})

const getTheme = () => theme

export default getTheme
