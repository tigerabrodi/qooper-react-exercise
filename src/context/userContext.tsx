import { createContext, useState, useEffect, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { User } from '../helpers'
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

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      setCurrentUser(JSON.parse(user))
      setHasInitializedAuthState(true)
    } else {
      localStorage.clear()
      setHasInitializedAuthState(true)
    }
  }, [])

  const login = async (userData: UserData) => {
    try {
      const user = await createUser(userData)
      const newCurrentUser = { id: user.id, firstName: user.firstName }

      localStorage.setItem('token', user.token)
      localStorage.setItem('user', JSON.stringify(newCurrentUser))

      setCurrentUser(newCurrentUser)

      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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
