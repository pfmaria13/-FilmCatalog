import { CardMedia, Box, Typography } from '@mui/material';

type Props = {
  src?: string;
  alt: string;
};

export const MoviePoster = ({ src, alt }: Props) => {
  if (!src) {
    return (
      <Box
        sx={{
          height: 280,
          bgcolor: 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Нет постера
        </Typography>
      </Box>
    );
  }

  return (
    <CardMedia
      component="img"
      height={280}
      image={src}
      alt={alt}
      sx={{ objectFit: 'cover' }}
    />
  );
};
