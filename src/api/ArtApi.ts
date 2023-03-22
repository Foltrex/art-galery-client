import { QueryKeyT, useFetch, useLoadMore } from "@/hooks/react-query"
import { Art } from "@/models/Art"

export const useLoadMoreArts = () => {
    return useLoadMore<Art>(
        'https://rickandmortyapi.com/api/character', 
        { page: 1 }
    )
}

export const useGetArtById = (id: string) => {
    return useFetch<Art
}
