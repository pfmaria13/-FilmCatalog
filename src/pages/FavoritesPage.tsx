import { Grid, Typography, Box } from '@mui/material';

import { MovieCard, EmptyFavorites } from '@src/components';
import { useFavorites } from '@src/contexts';
import { mapFavoriteToMovie } from '@src/utils';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Избранное
      </Typography>

      <Grid container spacing={3}>
        {favorites.map((fav) => (
          <Grid key={fav.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MovieCard movie={mapFavoriteToMovie(fav)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
