import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3E546A',
    },
    secondary: {
      main: '#009686',
    },
  },
  color: {
    primary: ['#5B6F83', '#3E546A', '#283C50', '#182E43', '#0A1D2F'],
    secondary: ['#42B2A6', '#20A294', '#009686', '#00776A', '#005D53'],
    font: 'white',
  },
  font: 'Roboto',
  typography: {
    useNextVariants: true,
  },
  headerHeight: '32px',
})

const getTheme = () => theme

export default getTheme
