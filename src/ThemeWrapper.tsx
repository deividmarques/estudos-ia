import React from 'react'
import { ThemeProvider, useMediaQuery } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { lightTheme, darkTheme } from './themes'
import { BrowserRouter } from 'react-router-dom'

// Chave para persistência no localStorage
const STORAGE_KEY = 'theme-mode'

const getInitialMode = (prefersDarkMode: boolean): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  }
  return prefersDarkMode ? 'dark' : 'light'
}

const ThemeWrapper: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = React.useState<'light' | 'dark'>(() =>
    getInitialMode(prefersDarkMode)
  )

  // Atualiza o tema se o sistema mudar e o usuário não tiver escolhido manualmente
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setMode(prefersDarkMode ? 'dark' : 'light')
    }
  }, [prefersDarkMode])

  // Salva a escolha do usuário
  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

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
