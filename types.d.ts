export type Evt = {
  name: string
  slug: string
  venue: string
  address: string
  performers: string
  date: string
  time: string
  description: string
  image: any
}
export type StrapiEvent = {
  id: number
  attributes: Evt
}
export type Events = {
  events: StrapiEvent[]
}
export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}