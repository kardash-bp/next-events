import Layout from '@/components/Layout'
import { FormEvent, useContext, useEffect, useState } from 'react'
import s from '@/styles/AuthForm.module.css'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { AuthContext } from '@/context/AuthContext'
const Login = () => {
  const { login, error } = useContext(AuthContext)!
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Email and Password are required!')
      return
    }
    login({ email, password })
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])
  return (
    <Layout title='Login'>
      <div className={s.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='pass'>Password</label>
            <input
              type='password'
              name='password'
              id='pass'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input type='submit' value='Login' className='btn' />
        </form>
        <p>
          Don&#39;t have an account?{' '}
          <Link href='/auth/register'>
            <FaUser /> Register
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export default Login
