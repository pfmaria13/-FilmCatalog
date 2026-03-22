import { Box, Typography, Stack, Chip, Button } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { type MovieDto } from '@src/types';
import { formatKpRating, formatMovieRelease } from '@src/utils';

type Props = {
  movie: MovieDto;
  isFav: boolean;
  onFavoriteClick: () => void;
};

export const MovieInfo = ({ movie, isFav, onFavoriteClick }: Props) => (
  <Box flex={1}>
    <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
      {movie.name || movie.alternativeName}
    </Typography>

    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
      {movie.genres?.map(
        (g) =>
          g.name && (
            <Chip
              key={g.name}
              label={g.name}
              size="small"
              variant="outlined"
              color="default"
            />
          ),
      )}
    </Stack>

    {(movie.description || movie.shortDescription) && (
      <Typography
        variant="body1"
        sx={{ mb: 4, lineHeight: 1.7, color: 'text.secondary' }}
      >
        {movie.description || movie.shortDescription}
      </Typography>
    )}

    <Stack spacing={1.5} sx={{ mb: 4 }}>
      <Typography variant="body1">
        <strong>Рейтинг:</strong> {formatKpRating(movie.rating?.kp)}
      </Typography>

      <Typography variant="body1">
        <strong>Премьера:</strong> {formatMovieRelease(movie)}
      </Typography>
    </Stack>

    <Button
      variant={isFav ? 'outlined' : 'contained'}
      size="large"
      startIcon={isFav ? <Favorite /> : <FavoriteBorder />}
      onClick={onFavoriteClick}
      sx={{ borderRadius: 2 }}
    >
      {isFav ? 'В избранном' : 'Добавить в избранное'}
    </Button>
  </Box>
);
