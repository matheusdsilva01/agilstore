import React from "react"
import Image from "next/image"

interface CardPhotoProps {
  photo: any
}

export const CardPhoto = ({ photo }: CardPhotoProps) => {
  return (
    <div className="overflow-hidden rounded-md transition-all hover:scale-110 hover:shadow-lg">
      <Image
        className="h-auto w-full"
        src={photo.urls.raw}
        alt={photo.alt_description}
        width={photo.width}
        height={photo.width}
      />
      <h3 className="bg-zinc-300 px-2 text-sm">
        {photo.alternative_slugs.pt
          .replace(photo.id, "")
          .split("-")
          .join(" ") || photo.slug}
      </h3>
    </div>
  )
}
