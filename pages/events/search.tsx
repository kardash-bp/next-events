import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config'
import { Events } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
type SearchTermProps = {
  query: { term: string }
}
export async function getServerSideProps({ query: { term } }: SearchTermProps) {
  console.log(term)
  const res = await fetch(
    `${API_URL}/api/events?filters[$or][0][name][$containsi]=${term}&filters[$or][1][venue][$containsi]=${term}&filters[$or][2][performers][$containsi]=${term}&populate=*`
  )
  const evt = await res.json()
  console.log(evt.data)
  return {
    props: { events: evt.data },
  }
}

const Search = ({ events }: Events) => {
  const router = useRouter()
  return (
    <Layout title='Search Results'>
      <h1>Search Result for: {router.query.term}</h1>
      {events.length === 0 ? (
        <h3>No events to show.</h3>
      ) : (
        events.map((e, i) => <EventItem key={i} evt={e.attributes} id={e.id} />)
      )}
      <Link href='/events'>Back to all events</Link>
    </Layout>
  )
}

export default Search
