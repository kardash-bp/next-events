import { API_URL, NEXT_URL } from './config/index';
import { NextRequest, NextResponse } from 'next/server';
export default async function middleware(req: NextRequest, res: NextResponse) {
  // const token = req.headers.get('cookie')?.slice(6)
  // if (!token) {
  //   NextResponse.redirect(`${NEXT_URL}/`)
  // }
  // const strapiRes = await fetch(`${API_URL}/users/me`, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // })
  // console.log(strapiRes)
  // if (!strapiRes.ok) {
  //   const url = req.nextUrl.clone()
  //   url.pathname = '/'
  //   return NextResponse.redirect(url)
  // }
  return NextResponse.next()

}