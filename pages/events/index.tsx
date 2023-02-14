import EventItem from '@/components/EventItem'
import EventPagination from '@/components/EventPagination'
import Layout from '@/components/Layout'
import { API_URL, PER_PAGE } from '@/config'
import { Pagination, StrapiEvent } from '@/types'
import React from 'react'

export async function getServerSideProps({ query: { page = 1 } }) {
  const res = await fetch(
    `${API_URL}/api/events?pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}&sort[0]=date%3Adesc&populate=*`
  )
  const events = await res.json()
  return {
    props: { events: events.data, pagination: events.meta.pagination },
  }
}

const Events = ({
  events,
  pagination,
}: {
  events: StrapiEvent[]
  pagination: Pagination
}) => {
  console.log(events)
  console.log(pagination)

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 ? (
        <h3>No events to show.</h3>
      ) : (
        events.map((e, i) => <EventItem key={i} evt={e.attributes} id={e.id} />)
      )}
      <EventPagination pagination={pagination} />
    </Layout>
  )
}

export default Events
