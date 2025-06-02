import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0057B7', // Azul vibrante, acessível
    },
    secondary: {
      main: '#FFB300', // Amarelo escuro, vibrante
    },
    background: {
      default: '#FFFFFF', // Branco
      paper: '#F5F7FA', // Cinza muito claro
    },
    text: {
      primary: '#1A1A1A', // Quase preto
      secondary: '#333333', // Cinza escuro
    },
  }
})

export default theme