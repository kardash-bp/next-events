import Head from 'next/head'
import React, { ReactNode } from 'react'
import s from '@/styles/Layout.module.css'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  title?: string
  keywords?: string
  description?: string
  children: ReactNode | ReactNode[]
}

const Layout = ({
  title = 'Next Events | visit or organize events',
  keywords = 'film, music, dj, festival, theatre ',
  description = 'Find and visit or create and organize events',
  children,
}: Props) => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='keywords' content={keywords} />

        <meta name='description' content={description} />
      </Head>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={s.container}> {children}</div>
      <Footer />
    </div>
  )
}

export default Layout
