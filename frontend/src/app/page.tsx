"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/common"
import { GalleryPhotos } from "@/components/ui"
import { useGetPhotos } from "@/hooks/requests/useGetPhotos"

const Home = () => {
  const [search, setSearch] = useState("")
  const { data, isSuccess } = useGetPhotos({
    search,
  })

  return (
    <div className="flex h-full w-full flex-col p-2 md:p-4">
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
      {!!data && (
        <GalleryPhotos photos={data instanceof Array ? data : data.results} />
      )}
      {isSuccess && !data && (
        <p className="my-4 text-center text-xl font-bold">
          Nenhuma foto encontrada
        </p>
      )}
    </div>
  )
}

export default Home
