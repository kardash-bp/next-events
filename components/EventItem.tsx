import { API_URL } from '@/config'
import s from '@/styles/EventItem.module.css'
import { Evt } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

const EventItem = ({ evt, id }: { evt: Evt; id: number }) => {
  return (
    <div className={s.event}>
      <div className={s.img}>
        <Image
          src={
            evt.image && evt.image.data?.attributes.formats.thumbnail.url
              ? `${API_URL}${evt.image.data.attributes.formats.thumbnail.url}`
              : '/images/event-default.png'
          }
          alt={evt.name || 'event'}
          width={170}
          height={100}
        />
      </div>
      <div className={s.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('sr-RS')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div>
        <Link href={`/events/${evt.slug}`} className='btn'>
          Details
        </Link>
      </div>
    </div>
  )
}

export default EventItem
