import s from '@/styles/Header.module.css'
import Link from 'next/link'
import Search from './Search'

const Header = () => {
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
          <li>
            <Link href='/events/add'>Add Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
