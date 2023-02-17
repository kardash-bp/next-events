import Layout from '@/components/Layout'
import { API_URL } from '@/config'
import { Evt } from '@/types'
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from 'next'
import s from '@/styles/Event.module.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import { MouseEvent } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
export const getStaticPaths: GetStaticPaths = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/api/events`)
  const ev = (await res.json()) as any
  const paths = ev.data.map((e: any) => ({
    params: { slug: e.attributes.slug },
  }))
  return { paths, fallback: true }
}
export const getStaticProps: GetStaticProps<{
  [key: string]: any
}> = async ({ params }): Promise<any> => {
  const { slug } = params as {
    slug: string
  }
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  )
  const e = await res.json()

  return {
    props: { evt: e.data[0].attributes, id: e.data[0].id },
    revalidate: 1,
  }
}
// export const getServerSideProps: GetServerSideProps<{
//   [key: string]: any
// }> = async ({ query: { slug } }): Promise<any> => {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const evt = await res.json()
//   return { props: { evt } }
// }

const EventPage = ({ evt, id }: { evt: Evt; id: number }) => {
  const router = useRouter()
  const deleteEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message)
      } else {
        toast.success('Event successfully deleted.')
        router.push('/events')
      }
    }
  }

  return (
    <Layout>
      <div className={s.event}>
        {!evt || (!Object.keys(evt).length && <h1>No Event</h1>)}
        <div className={s.controls}>
          <Link href={`/events/edit/${id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <button className={s.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </button>
        </div>
        <div>
          {evt?.date && new Date(evt.date).toLocaleDateString('sr-RS')} at{' '}
          {evt?.time}
        </div>
        <h1>{evt.name}</h1>
        {evt.image.data && Object.keys(evt.image.data) && (
          <div className={s.image}>
            <Image
              src={`${API_URL}${evt.image.data.attributes.formats.medium.url}`}
              alt='event'
              width={1024}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href='/events' className={s.back}>
          Back to all events
        </Link>
      </div>
    </Layout>
  )
}
export default EventPage
