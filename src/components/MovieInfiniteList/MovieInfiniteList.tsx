import { useEffect, useRef } from 'react';
import { Box, CircularProgress, Grid, Alert } from '@mui/material';

import type { ListFilters } from '@src/types';
import { useMoviesInfiniteList } from '@src/hooks';
import { MovieCard } from './MovieCard';

type Props = {
  filters: ListFilters;
  searchQuery: string;
};

export function MovieInfiniteList({ filters, searchQuery }: Props) {
  const {
    movies,
    error,
    hasMore,
    isInitialLoading,
    isNextPageLoading,
    fetchNextPage,
  } = useMoviesInfiniteList(filters, searchQuery);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore || movies.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, fetchNextPage, movies.length]);

  if (isInitialLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={10}
        minHeight={300}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || movies.length === 0) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        Фильмы не найдены
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {hasMore && <Box ref={sentinelRef} sx={{ height: 50, mt: 2 }} />}

      {isNextPageLoading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress size={40} />
        </Box>
      )}
    </Box>
  );
}
