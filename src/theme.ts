import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#013220', // Verde escuro
    },
    secondary: {
      main: '#00897b', // Verde frio
    },
    background: {
      default: '#f4f6f8',
      paper: '#e3f2fd'
    }
  }
})

export default theme