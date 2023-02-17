//import { NextRequest, NextResponse } from "next/server";
import cookie from 'cookie';
import { API_URL } from "@/config"

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body
    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    const data = await strapiRes.json()
    if (strapiRes.ok) {
      // set cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: '/'
      }))

      res.status(200).json({ user: data.user })
    } else {
      res.status(strapiRes.status).json({ message: data.error.message })
    }
  } else {
    console.log(res)
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
