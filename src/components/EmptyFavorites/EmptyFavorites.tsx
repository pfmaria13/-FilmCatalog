import { Typography, Box } from '@mui/material';

export const EmptyFavorites = () => (
  <Box sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h6" color="text.secondary" gutterBottom>
      Список избранного пуст
    </Typography>
    <Typography variant="body2" color="text.disabled">
      Добавляйте фильмы из каталога или со страницы описания, чтобы они
      появились здесь.
    </Typography>
  </Box>
);
