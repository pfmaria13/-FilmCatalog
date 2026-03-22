import type { FavoriteMovie, MovieDto } from '@src/types';

export function getMovieTitle(m: MovieDto): string {
  return m.name ?? m.alternativeName ?? m.enName ?? 'Без названия';
}

export function getMoviePoster(m: MovieDto): string | undefined {
  return m.poster?.url ?? m.poster?.previewUrl ?? undefined;
}

export function formatKpRating(rating?: number | null): string {
  if (rating === undefined || rating === 0 || rating === null) return '-';

  return rating.toFixed(1);
}

export const formatMovieRelease = (m: MovieDto): string => {
  const raw =
    m.premiere?.world ?? m.premiere?.russia ?? m.premiere?.cinema ?? null;
  if (!raw) return '-';

  const date = new Date(raw);
  if (isNaN(date.getTime())) return String(raw);

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const mapFavoriteToMovie = (f: FavoriteMovie): MovieDto => ({
  id: f.id,
  name: f.name,
  year: f.year ?? null,
  poster: f.posterUrl ? { url: f.posterUrl, previewUrl: f.posterUrl } : null,
  rating: f.ratingKp != null ? { kp: f.ratingKp } : null,
  genres: [],
  alternativeName: null,
  enName: null,
});
