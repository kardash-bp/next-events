import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import s from '@/styles/Home.module.css'
import { Events } from '@/types'
import Link from 'next/link'

export default function Home({ events }: Events) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.length === 0 ? (
        <h3>No events to show.</h3>
      ) : (
        events
          .slice(0, 3)
          .map((e, i) => <EventItem key={i} evt={e.attributes} id={e.id} />)
      )}
      {events.length && (
        <Link href='/events' className='btn-secondary'>
          View All Events
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?sort[0]=date%3Adesc&populate=*`
  )
  const events = await res.json()
  return {
    props: { events: events.data },
    revalidate: 1,
  }
}
