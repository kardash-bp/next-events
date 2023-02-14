import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, FormEvent, ChangeEvent } from 'react'
import s from '@/styles/Form.module.css'
import { toast } from 'react-toastify'
import { API_URL } from '@/config'
import { Evt } from '@/types'
import moment from 'moment'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

type Props = {
  params: { id: string }
}

export async function getServerSideProps({ params: { id } }: Props) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)

  const evt = await res.json()

  return { props: { id, evt: evt.data.attributes } }
}

const EditEvent = ({ id, evt }: { id: string; evt: Evt }) => {
  const [values, setValues] = useState({
    ...evt,
  })
  const [imgPreview, setImgPreview] = useState(
    evt.image
      ? evt.image.data?.attributes.formats.thumbnail.url
      : '/images/event-default.png'
  )
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()
  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/api/events/${id}`)
    const data = await res.json()
    setImgPreview(data.image.data?.attributes.formats.thumbnail.url)
    setShowModal(false)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name === 'name') {
      const slugValue = value.split(' ').join('-').toLowerCase()
      setValues((prev: Evt) => ({ ...prev, [name]: value, slug: slugValue }))
    } else {
      setValues((prev: Evt) => ({ ...prev, [name]: value }))
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isEmptyField = Object.values(values).some((item) => item === '')
    if (isEmptyField) {
      toast.error('Please fill in all fields.')
    }
    const res = await fetch(`${API_URL}/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: { ...values } }),
    })
    if (!res.ok) {
      toast.error('Something went wrong!')
    }
    const evt = await res.json()
    console.log(evt)

    router.push(`/events`)
    toast.success(`Event ${values.name} added.`)
  }

  console.log(values)
  return (
    <Layout title='Edit Event'>
      <Link href='/events'>Back to all events</Link>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleChange}
            />{' '}
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleChange}
            />{' '}
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              value={values.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Performers</label>
            <input
              type='text'
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='address'>
              Date{' '}
              {/* Date: {new Date(values.date).toLocaleDateString('sr-RS')} */}
            </label>
            <input
              type='date'
              id='date'
              name='date'
              value={moment(values.date).format('DD-MMM-yyyy')}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Time</label>
            <input
              type='text'
              id='time'
              name='time'
              value={values.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <label htmlFor='desc'>Description</label>
        <textarea
          id='desc'
          name='description'
          value={values.description}
          onChange={handleChange}
        ></textarea>
        <input type='submit' className='btn' value='Edit Event' />
      </form>
      <h2>Image Preview</h2>
      {imgPreview ? (
        <Image
          src={`${API_URL}${imgPreview}`}
          width={170}
          height={100}
          alt={values.name}
        />
      ) : (
        <div>
          <p>No image uploaded.</p>
        </div>
      )}
      <div>
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage /> Change Image
        </button>
      </div>

      <Modal
        title='Upload Image'
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <ImageUpload evtId={id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}

export default EditEvent
