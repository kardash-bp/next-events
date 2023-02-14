import React, { ChangeEvent, FormEvent, useState } from 'react'
import s from '@/styles/Form.module.css'
import { API_URL } from '@/config'

type Props = {
  evtId: string
  imageUploaded: () => void
}
const ImageUpload = ({ evtId, imageUploaded }: Props) => {
  const [image, setImage] = useState<any>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0])
      setImage(e.target.files[0])
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', evtId)
    formData.append('field', 'image')
    console.log(formData)
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',

      body: JSON.stringify({ data: formData }),
    })
    console.log(res)
    if (res.ok) {
      imageUploaded()
    }
  }
  return (
    <div className={s.form}>
      <form onSubmit={handleSubmit}>
        <div className={s.file}>
          <input type='file' onChange={handleChange} name='files' />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  )
}

export default ImageUpload
