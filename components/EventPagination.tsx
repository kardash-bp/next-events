import { Pagination } from '@/types'
import Link from 'next/link'
import React from 'react'
import s from '@/styles/EventPagination.module.css'
const EventPagination = ({ pagination }: { pagination: Pagination }) => {
  console.log(pagination.page)
  const { page, pageCount } = pagination
  return (
    <div className={s.pagination}>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`} className='btn-secondary'>
          Prev
        </Link>
      )}
      page {page}
      {page < pageCount && (
        <Link href={`/events?page=${page + 1}`} className='btn-secondary'>
          Next
        </Link>
      )}
    </div>
  )
}

export default EventPagination
