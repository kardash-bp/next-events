import { useState, FormEvent } from 'react'
import s from '@/styles/Search.module.css'
import { useRouter } from 'next/router'
import { FiSearch } from 'react-icons/fi'
const Search = () => {
  const [term, setTerm] = useState('')
  const router = useRouter()
  const handleClick = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
    setTerm('')
  }
  return (
    <form onSubmit={handleClick} className={s.searchForm}>
      <input
        type='search'
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className={s.search}
        placeholder='Search'
      />
      <button>
        <FiSearch size={24} />
      </button>
    </form>
  )
}

export default Search
