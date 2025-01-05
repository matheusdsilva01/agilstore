import { useQuery } from "@tanstack/react-query"
import { api } from "@/api"
import { Photo, Response } from "@/types/entities"

interface useGetPhotosProps {
  search?: string
}

export function useGetPhotos({ search }: useGetPhotosProps) {
  const clientId = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

  return useQuery({
    queryKey: ["photos", search],
    queryFn: async () => {
      if (!search) {
        const response = await api.get<Photo[]>("/photos", {
          params: {
            per_page: 10,
            page: 1,
            client_id: clientId,
          },
        })
        return response.data
      }
      const response = await api.get<Response<Photo>>("/search/photos", {
        params: {
          query: search,
          per_page: 10,
          page: 1,
          client_id: clientId,
          lang: "pt",
        },
      })
      return response.data
    },
  })
}
