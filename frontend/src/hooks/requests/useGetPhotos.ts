import { useInfiniteQuery } from "@tanstack/react-query"
import { AxiosHeaders, AxiosResponse } from "axios"
import { api } from "@/api"
import { Photo, Response } from "@/types/entities"

interface useGetPhotosProps {
  search: string
  pageParam: number
}

async function getPhotos({
  pageParam,
  search,
}: useGetPhotosProps): Promise<AxiosResponse<Photo[] | Response<Photo>, any>> {
  const clientId = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

  if (!search) {
    const response = await api.get<Photo[]>("/photos", {
      params: {
        per_page: 10,
        page: pageParam,
        client_id: clientId,
      },
    })
    return response
  }
  const response = await api.get<Response<Photo>>("/search/photos", {
    params: {
      query: search,
      per_page: 10,
      page: pageParam,
      client_id: clientId,
      lang: "pt",
    },
  })
  return response
}

export function useGetPhotos({ search }: Omit<useGetPhotosProps, "pageParam">) {
  return useInfiniteQuery<
    AxiosResponse<Response<Photo> | Photo[], any>,
    Error,
    Photo[],
    (string | undefined)[],
    number
  >({
    queryKey: ["photos", search],
    getNextPageParam: lastPage => {
      const headers = lastPage.headers as AxiosHeaders
      const link = headers.get("Link") as string
      if (link) {
        const nextPage = link
          .split(",")
          .find((link: string) => link.includes('rel="next"'))
          ?.match(/page=(\d+)/)?.[1]
        if (nextPage) {
          return Number(nextPage)
        }
      }
      return undefined
    },
    select: data => {
      const res = data.pages.flatMap(page =>
        page.data instanceof Array ? page.data : page.data.results,
      )
      return res
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      await getPhotos({ pageParam: pageParam, search }),
  })
}
