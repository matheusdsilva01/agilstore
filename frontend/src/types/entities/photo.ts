type Nullable<T> = T | null

export interface Photo {
  id: string
  created_at: string
  updated_at: string
  urls: {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: Nullable<string>
  blur_hash: Nullable<string>
  color: Nullable<string>
  description: Nullable<string>
  height: number
  likes: number
  links: {
    self: string
    html: string
    download: string
    download_location: string
  }
  promoted_at: Nullable<string>
  width: number
}

export interface Response<A> {
  results: A[]
  total: number
  total_pages: number
}
