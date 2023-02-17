import { AuthContext } from '@/context/AuthContext'
import s from '@/styles/Header.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Search from './Search'

const Header = () => {
  const { user, logout } = useContext(AuthContext)!

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <Link href='/'>Next Events</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>Events</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href='/events/add'>Add Event</Link>
              </li>
              <li>
                <Link href='/auth/dashboard'>Dashboard</Link>
              </li>
              <li>
                <button
                  className='btn-secondary btn-icon'
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href='/auth/login' className='btn-secondary btn-icon'>
                <FaSignInAlt /> Login
              </Link>
            </li>
          )}

          {/* <li>
            <Link href='/auth/register'>Register</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}

export default Header
