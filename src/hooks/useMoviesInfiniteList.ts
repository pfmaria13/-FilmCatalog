import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchMoviePage, searchMovies } from '@src/api';
import type { ListFilters } from '@src/types';

const PAGE_SIZE = 50;

export const useMoviesInfiniteList = (
  filters: ListFilters,
  searchQuery: string,
) => {
  const queryParam = searchQuery.trim();

  const query = useInfiniteQuery({
    queryKey: ['movies', filters, queryParam],

    queryFn: async ({ pageParam = 1, signal }) => {
      return queryParam
        ? await searchMovies(
            { query: queryParam, page: pageParam, limit: PAGE_SIZE },
            { signal },
          )
        : await fetchMoviePage(
            {
              page: pageParam,
              limit: PAGE_SIZE,
              genres: filters.genres,
              yearMin: filters.yearMin,
              yearMax: filters.yearMax,
              ratingMin: filters.ratingMin,
              ratingMax: filters.ratingMax,
            },
            { signal },
          );
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage.docs || lastPage.docs.length === 0) {
        return undefined;
      }

      return lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined;
    },

    initialPageParam: 1,
  });

  const movies = query.data?.pages.flatMap((page) => page.docs) ?? [];

  return {
    movies,
    error: query.error,
    hasMore: query.hasNextPage,
    loading: query.isLoading,
    isInitialLoading: query.isLoading,
    isNextPageLoading: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
};
