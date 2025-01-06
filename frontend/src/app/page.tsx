"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/common"
import { GalleryPhotos } from "@/components/ui"

const Home = () => {
  const [search, setSearch] = useState("")

  return (
    <div className="flex h-full w-full flex-1 flex-col p-2 md:p-4">
      <form
        className="flex gap-4"
        onSubmit={e => {
          e.preventDefault()
          const target = e.target as HTMLFormElement
          const input = target[0] as HTMLInputElement
          const value = input.value as string
          setSearch(value)
        }}
      >
        <Input placeholder="Pesquise fotos" />
        <button
          type="submit"
          className="my-auto h-fit rounded-md bg-zinc-300 p-2 transition-all hover:bg-zinc-400 hover:shadow"
        >
          <Search size={24} />
        </button>
      </form>
      <GalleryPhotos search={search} />
    </div>
  )
}

export default Home
