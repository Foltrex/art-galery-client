import { prefetchInfiniteQuery, useFetch, useLoadMore } from "@/hooks/react-query"
import { ART_SERVICE_PATH } from "@/http/axios"
import { Art } from "@/models/Art"

export const ART_PAGE_SIZE = 9;

export const useLoadMoreArts = (params: object) => {
    return useLoadMore<Art>(
        `${ART_SERVICE_PATH}/arts`, 
        { 
            size: ART_PAGE_SIZE, 
            ...params 
        }
    )
}

export const prefetchInfiniteArts = () => {
    return prefetchInfiniteQuery<Art>(`${ART_SERVICE_PATH}/arts`, {
        size: ART_PAGE_SIZE
      })
}

export const useGetArtById = (id: string) => {
    return useFetch<Art>(`${ART_SERVICE_PATH}/arts/${id}`)
}
