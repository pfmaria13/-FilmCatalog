import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompareArrows, Favorite, FavoriteBorder } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Box,
} from '@mui/material';

import { useCompare, useFavorites } from '@src/contexts';
import { getMovieTitle, getMoviePoster, formatKpRating } from '@src/utils';
import type { MovieDto } from '@src/types';

import { ConfirmFavoriteDialog } from './ConfirmFavoriteDialog';
import { MoviePoster } from './MoviePoster';

type Props = { movie: MovieDto };

export function MovieCard({ movie }: Props) {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { toggleCompare, isComparing } = useCompare();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isFav = isFavorite(movie.id);
  const isComp = isComparing(movie.id);
  const title = getMovieTitle(movie);
  const poster = getMoviePoster(movie);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      setIsConfirmOpen(true);
    }
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompare(movie.id);
  };

  const handleConfirm = () => {
    addFavorite({
      id: movie.id,
      name: title,
      year: movie.year,
      posterUrl: poster,
      ratingKp: movie.rating?.kp,
    });
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderColor: isComp ? 'primary.main' : 'divider',
          borderWidth: isComp ? 2 : 1,
          transition: 'all 0.2s ease-in-out',
          '&:hover': { boxShadow: 3 },
        }}
      >
        <CardActionArea
          onClick={() => navigate(`/movie/${movie.id}`)}
          sx={{ flexGrow: 1 }}
        >
          <MoviePoster src={poster} alt={title} />

          <CardContent>
            <Typography variant="subtitle1" component="h2" noWrap gutterBottom>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                {movie.year ?? '-'}
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {formatKpRating(movie.rating?.kp)}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>

        <Box
          sx={{
            px: 1,
            pb: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 0.5,
          }}
        >
          <Tooltip title={isFav ? 'Убрать из избранного' : 'В избранное'}>
            <IconButton
              size="small"
              color={isFav ? 'error' : 'default'}
              onClick={handleFavoriteToggle}
            >
              {isFav ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isComp ? 'Убрать из сравнения' : 'Сравнить'}>
            <IconButton
              size="small"
              color={isComp ? 'primary' : 'default'}
              onClick={handleCompareToggle}
            >
              <CompareArrows />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>

      <ConfirmFavoriteDialog
        open={isConfirmOpen}
        title={title}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
