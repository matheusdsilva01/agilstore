"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { LoaderCircle } from "lucide-react"
import { useGetPhotos } from "@/hooks/requests"
import { Photo } from "@/types/entities"
import { CardPhoto } from "../CardPhoto"
import { GalleryPhotosPlaceholder } from "../GalleryPhotosPlaceholder"

interface GalleryPhotosProps {
  search: string
}

export const GalleryPhotos = ({ search }: GalleryPhotosProps) => {
  const [columns, setColumns] = useState<keyof typeof gridColumns>(3)
  const { data, isSuccess, isFetchingNextPage, fetchNextPage, isLoading } =
    useGetPhotos({
      search,
    })

  const results = data ?? []

  const ref = useRef<HTMLDivElement>(null)
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  }

  const positionPhotos = results.reduce((acc, curr, index) => {
    const colIndex = index % columns
    acc[colIndex] = acc[colIndex] ? [...acc[colIndex], curr] : [curr]
    return acc
  }, [] as Photo[][])

  useEffect(() => {
    function updateColumns() {
      if (window.innerWidth < 375) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }
    window.addEventListener("resize", updateColumns)
    updateColumns()

    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  const handleFetchNextPage = useCallback(() => {
    !isFetchingNextPage && fetchNextPage()
  }, [isFetchingNextPage])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0]
        if (target.isIntersecting) handleFetchNextPage()
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref.current, isSuccess, handleFetchNextPage])

  return (
    <>
      {isLoading && <GalleryPhotosPlaceholder />}
      {!!data && isSuccess && (
        <section
          className={`mx-auto grid h-auto w-full max-w-7xl p-3 ${gridColumns[columns]} items-start gap-x-4 md:gap-x-16`}
        >
          {positionPhotos.map((col, colIndex) => (
            <div key={colIndex} className="mx-auto grid grid-cols-1 gap-y-5">
              {col.map(photo => (
                <CardPhoto key={photo.id} photo={photo} />
              ))}
            </div>
          ))}

          <div ref={ref} className="col-span-full h-1" />
          {isFetchingNextPage && (
            <p className="col-span-full my-4 h-full text-center text-xl font-bold">
              Carregando mais fotos...{" "}
              <LoaderCircle className="inline-block animate-spin" />
            </p>
          )}
        </section>
      )}
      {!results.length && isSuccess && (
        <p className="my-4 h-full text-center text-xl font-bold">
          Nenhuma foto encontrada
        </p>
      )}
    </>
  )
}
