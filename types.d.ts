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
export type UserType = {
  id: number
  username: string
  email: string
  password: string
  confirm: string
}
export type AuthContextType = {
  user: Partial<UserType> | null;
  error: string | null
  register: ({ username, email, password }: Partial<UserType>) => void;
  login: ({ email, password }: Partial<UserType>) => void;
  logout: () => void;
  isLoggedIn: () => Promise<void>;
};