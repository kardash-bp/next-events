import type { NextApiRequest, NextApiResponse } from 'next'
import { events } from './data.json'

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const slug = req.query.slug
//   const evt = events.find((e) => e.slug === slug)
//   if (req.method === 'GET') {
//     res.status(200).json(evt)
//   } else {
//     res.setHeader('Allow', ['GET'])
//     res.status(405).json({ message: `Method ${req.method} not allowed.` })
//   }
// }
