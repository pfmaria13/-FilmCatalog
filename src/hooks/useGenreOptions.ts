import { useQuery } from '@tanstack/react-query';
import { fetchGenreNames } from '@src/api';

export function useGenreOptions() {
  const query = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenreNames,
    staleTime: 1000 * 60 * 60,
  });

  return {
    genreOptions: query.data ?? [],
    genresLoading: query.isLoading,
    error: query.error,
  };
}
