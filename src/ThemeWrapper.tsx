import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { lightTheme, darkTheme } from './themes'
import { BrowserRouter } from 'react-router-dom'

const ThemeWrapper: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App toggleMode={toggleMode} mode={mode} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default ThemeWrapper
