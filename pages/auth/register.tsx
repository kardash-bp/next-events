import Layout from '@/components/Layout'
import { FormEvent, useContext, useEffect, useState } from 'react'
import s from '@/styles/AuthForm.module.css'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { AuthContext } from '@/context/AuthContext'
const Register = () => {
  const { register, error } = useContext(AuthContext)!

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!username || !email || !password || !confirm) {
      toast.error('All fields are required!')
      return
    }
    if (password !== confirm) {
      toast.error(`Passwords don't match!`)
      return
    }
    register({ username, email, password })
  }
  return (
    <Layout title='Login'>
      <div className={s.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={handleSubmit} className='form'>
          <div>
            <label htmlFor='user'>Username</label>
            <input
              type='text'
              name='username'
              id='user'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <div>
            <label htmlFor='confirm'>Confirm Password</label>
            <input
              type='password'
              name='confirm'
              id='confirm'
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <input type='submit' value='Register' className='btn-blue' />
        </form>
        <p>
          Already have an account? <Link href='/auth/login'>Login</Link>
        </p>
      </div>
    </Layout>
  )
}

export default Register
