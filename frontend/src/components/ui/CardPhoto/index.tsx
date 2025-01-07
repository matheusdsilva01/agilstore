import React from "react"
import Image from "next/image"
import { Photo } from "@/types/entities"

interface CardPhotoProps {
  photo: Photo
}

export const CardPhoto = ({ photo }: CardPhotoProps) => {
  return (
    <div className="overflow-hidden rounded-md transition-all hover:scale-110 hover:shadow-lg">
      <Image
        className="h-auto min-h-[120px] w-full"
        src={photo.urls.regular}
        alt={photo.alt_description || photo.description || photo.slug}
        width={574}
        height={574}
      />
      <h3 className="bg-zinc-300 px-2 py-1 text-xs md:text-sm">
        {photo.alternative_slugs.pt
          .replace(photo.id, "")
          .split("-")
          .join(" ") || photo.slug}
      </h3>
    </div>
  )
}
