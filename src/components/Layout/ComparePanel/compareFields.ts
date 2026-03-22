import { type MovieDto } from '@src/types';
import { formatKpRating } from '@src/utils';

export const COMPARE_FIELDS = [
  {
    label: 'Название',
    getValue: (m: MovieDto | null) =>
      m?.name ?? m?.alternativeName ?? m?.enName ?? '-',
  },
  {
    label: 'Год',
    getValue: (m: MovieDto | null) => (m?.year != null ? String(m?.year) : '-'),
  },
  {
    label: 'Рейтинг КП',
    getValue: (m: MovieDto | null) => formatKpRating(m?.rating?.kp),
  },
  {
    label: 'Жанры',
    getValue: (m: MovieDto | null) =>
      m?.genres
        ?.map((g) => g.name)
        .filter(Boolean)
        .join(', ') || '-',
  },
  {
    label: 'Длительность',
    getValue: (m: MovieDto | null) =>
      m?.movieLength != null ? `${m.movieLength} мин` : '-',
  },
];
