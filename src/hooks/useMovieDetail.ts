import { useQuery } from '@tanstack/react-query';
import { fetchMovieById } from '@src/api';

export function useMovieDetail(id: number | undefined) {
  const query = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieById(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });

  return {
    movie: query.data ?? null,
    loading: query.isLoading,
    error: query.error ?? null,
  };
}
