"use client"
import { useEffect, useState } from "react"
import { Photo } from "@/types/entities"
import { CardPhoto } from "../CardPhoto"

interface GalleryPhotosProps {
  photos: Photo[]
}

export const GalleryPhotos = ({ photos }: GalleryPhotosProps) => {
  const [columns, setColumns] = useState<keyof typeof gridColumns>(3)

  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  }

  const positionPhotos = photos.reduce(
    (acc, curr, index) => {
      const colIndex = index % columns
      acc[colIndex] = acc[colIndex] ? [...acc[colIndex], curr] : [curr]
      return acc
    },
    [] as (typeof photos)[],
  )

  useEffect(() => {
    function updateColumns() {
      if (window.innerWidth < 768) {
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

  return (
    <section
      data-columns={columns}
      className={`m-auto grid h-auto w-full max-w-7xl p-4 ${gridColumns[columns]} items-start gap-x-16`}
    >
      {positionPhotos.map((col, colIndex) => (
        <div key={colIndex} className="grid grid-cols-1 gap-y-5">
          {col.map((photo, i) => (
            <CardPhoto key={colIndex.toString() + i} photo={photo} />
          ))}
        </div>
      ))}
    </section>
  )
}
