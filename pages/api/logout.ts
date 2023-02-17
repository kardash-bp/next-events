//import { NextRequest, NextResponse } from "next/server";
import cookie from 'cookie';
import { API_URL } from "@/config"

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
    }))

    res.status(200).json({ message: 'Success' })


  } else {
    console.log(res)
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
