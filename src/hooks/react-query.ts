import axios from "axios";
import { QueryClient, QueryFunction, QueryFunctionContext, QueryKey, useInfiniteQuery, useQuery, UseQueryOptions } from "react-query";

export type QueryKeyT = [string, object | undefined];

export interface IPageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
}

export interface IPage<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    pageable: IPageable;
}

const fetch = <T>({
    queryKey,
    pageParam
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
    const [url, params] = queryKey;
    return axios
        .get<T>(url, {
            params: {
                ...params,
                page: pageParam
            }
        })
        .then(response => response.data)
}

export const useFetch = <T>(
    url: string, 
    params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
    return useQuery<T, Error, T, QueryKeyT>(
        [url, params],
        context => fetch(context),
        config
    );
};

export const useLoadMore = <T>(
    url: string,
    params?: object
) => {
    return useInfiniteQuery<IPage<T>, Error, IPage<T>, QueryKeyT>(
        [url, params],
        ({pageParam = 1, ...context}) => fetch({...context, pageParam}),
        {
            getNextPageParam: (_, allPages) => {
                const nextPage = allPages.length + 1;
                return nextPage;
            },
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    );
}

export const prefetchQuery = <T>(
    url: string,
    params?: object
) => {
    const queryClient = new QueryClient();
    return () => queryClient.prefetchQuery<T, Error, T, QueryKeyT>(
        [url, params],
        context => fetch(context)
    );
}

export const prefetchInfiniteQuery = <T>(
    url: string,
    params?: object
) => {
    const queryClient = new QueryClient();
    return () => queryClient.prefetchInfiniteQuery<T, Error, T, QueryKeyT>(
        [url, params],
        context => fetch(context)
    );
}