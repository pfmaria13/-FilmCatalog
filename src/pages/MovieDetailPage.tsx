import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Container,
} from '@mui/material';

import { useFavorites } from '@src/contexts';
import { ConfirmFavoriteDialog, MovieInfo, MoviePoster } from '@src/components';
import { useMovieDetail } from '@src/hooks';
import { getMovieTitle, getMoviePoster } from '@src/utils';

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetail(id ? Number(id) : undefined);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [favOpen, setFavOpen] = useState(false);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error instanceof Error ? error.message : 'Фильм не найден'}
        </Typography>

        <Button component={Link} to="/" variant="contained">
          Вернуться в каталог
        </Button>
      </Container>
    );
  }

  const isFav = isFavorite(movie.id);
  const title = getMovieTitle(movie);

  const handleConfirm = () => {
    addFavorite({
      id: movie.id,
      name: title,
      year: movie.year,
      posterUrl: getMoviePoster(movie),
      ratingKp: movie.rating?.kp,
    });
    setFavOpen(false);
  };

  return (
    <Box component="article">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
        <Box sx={{ width: { xs: '100%', md: 320 }, flexShrink: 0 }}>
          <MoviePoster src={getMoviePoster(movie)} alt={title} />
        </Box>

        <MovieInfo
          movie={movie}
          isFav={isFav}
          onFavoriteClick={() =>
            isFav ? removeFavorite(movie.id) : setFavOpen(true)
          }
        />
      </Stack>

      <ConfirmFavoriteDialog
        open={favOpen}
        title={title}
        onClose={() => setFavOpen(false)}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};
