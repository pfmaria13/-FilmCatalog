import { useQueries } from '@tanstack/react-query';
import { fetchMovieById } from '@src/api';

export function useCompareMovies(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['movie', id],
      queryFn: () => fetchMovieById(id),
      enabled: Boolean(id),
      staleTime: 1000 * 60 * 10, // 10 минут
    })),
  });

  const left = results[0]?.data ?? null;
  const right = results[1]?.data ?? null;

  const loading = results.some((q) => q.isLoading);

  const error = results.find((q) => q.error)?.error ?? null;

  return {
    left,
    right,
    loading,
    error,
  };
}
