import { Redirect, Route, Switch } from 'react-router-dom'
import { AppProviders, TodoProvider } from './context'
import { SignInRoute, TodoRoute } from './pages'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import { useUser } from './hooks'
import { Navigation } from './components'

function Routes() {
  const { currentUser, logout, hasInitializedAuthState } = useUser()

  if (!hasInitializedAuthState) {
    return null
  }

  return (
    <Switch>
      <Route exact path="/">
        {currentUser ? (
          <TodoProvider>
            <Navigation
              welcomeMessage={`Welcome, ${currentUser.firstName}`}
              logout={logout}
            />
            <TodoRoute />
          </TodoProvider>
        ) : (
          <Redirect to="/signin" />
        )}
      </Route>
      <Route exact path="/signin">
        {currentUser ? <Redirect to="/" /> : <SignInRoute />}
      </Route>
    </Switch>
  )
}

export function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  )
}
