import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { GlobalStyles, theme } from '../theme'
import { UserProvider } from '.'
import { ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <UserProvider>{children}</UserProvider>
      </Router>
    </ThemeProvider>
  )
}
