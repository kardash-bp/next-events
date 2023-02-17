import { NEXT_URL } from '@/config'
import { AuthContextType, UserType } from '@/types'
import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

export const AuthContext = createContext<AuthContextType | null>(null)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()
  const register = async ({ username, email, password }: Partial<UserType>) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data.user)
      router.push(`/auth/dashboard`)
    } else {
      setError(data.message)
      setTimeout(() => {
        setError(null)
      }, 500)
    }
  }

  const login = async ({ email: identifier, password }: Partial<UserType>) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data.user)
      router.push(`/auth/dashboard`)
    } else {
      setError(data.message)
      setTimeout(() => {
        setError(null)
      }, 500)
    }
  }
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, { method: 'POST' })
    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  const isLoggedIn = useCallback(async () => {
    const res = await fetch(`${NEXT_URL}/api/user`)

    const data = await res.json()
    if (res.ok) {
      setUser(data.user)
    } else {
      setUser(null)
      // setError(data.message)
    }
  }, [])
  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}
