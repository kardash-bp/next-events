import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, FormEvent, ChangeEvent } from 'react'
import s from '@/styles/Form.module.css'
import { toast } from 'react-toastify'
import { API_URL } from '@/config'
const AddEvent = () => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    venue: '',
    address: '',
    performers: '',
    date: '',
    time: '',
    description: '',
  })
  const router = useRouter()
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name === 'name') {
      const slugValue = value.split(' ').join('-').toLowerCase()
      setValues((prev) => ({ ...prev, [name]: value, slug: slugValue }))
    } else {
      setValues((prev) => ({ ...prev, [name]: value }))
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isEmptyField = Object.values(values).some((item) => item === '')
    if (isEmptyField) {
      toast.error('Please fill in all fields.')
    }
    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
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
  return (
    <Layout title='Add Event'>
      <Link href='/events'>Back to all events</Link>
      <h1>Add Event</h1>
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
            <label htmlFor='address'>Date</label>
            <input
              type='date'
              id='date'
              name='date'
              value={values.date}
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
        <input type='submit' className='btn' value='Add Event' />
      </form>
    </Layout>
  )
}

export default AddEvent
