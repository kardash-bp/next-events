import Layout from '@/components/Layout'
import s from '@/styles/404.module.css'
import Image from 'next/image'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <Layout title='Page Not Found'>
      <div className={s.error}>
        <Image src='/404.png' alt='Not Found Page' fill />
        <Link href='/'>Go Back Home</Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
