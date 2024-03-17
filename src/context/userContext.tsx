import { createContext, useState, useEffect, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { LOCAL_STORAGE_KEYS, User } from '../helpers'
import { createUser } from '../services'

export type CurrentUser = Pick<User, 'id' | 'firstName'> | null

type UserData = {
  username: string
  firstName: string
  lastName: string
}

export type UserContextType = {
  currentUser: CurrentUser
  login: (userData: UserData) => Promise<void>
  logout: () => void
  hasInitializedAuthState: boolean
}

export const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null)
  const [hasInitializedAuthState, setHasInitializedAuthState] = useState(false)
  const history = useHistory()

  function clearLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.user)
  }

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token)
    const user = localStorage.getItem(LOCAL_STORAGE_KEYS.user)
    if (token && user) {
      setCurrentUser(JSON.parse(user))
      setHasInitializedAuthState(true)
    } else {
      clearLocalStorage()
      setHasInitializedAuthState(true)
    }
  }, [])

  const login = async (userData: UserData) => {
    try {
      const user = await createUser(userData)
      const newCurrentUser = { id: user.id, firstName: user.firstName }

      localStorage.setItem(LOCAL_STORAGE_KEYS.token, user.token)
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.user,
        JSON.stringify(newCurrentUser)
      )

      setCurrentUser(newCurrentUser)

      history.push('/')
    } catch (error) {
      throw new Error(`An error occurred while logging in: ${error}`)
    }
  }

  const logout = () => {
    clearLocalStorage()
    setCurrentUser(null)
    history.push('/signin')
  }

  return (
    <UserContext.Provider
      value={{ currentUser, login, logout, hasInitializedAuthState }}
    >
      {children}
    </UserContext.Provider>
  )
}
