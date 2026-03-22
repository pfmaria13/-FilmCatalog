import {
  DEFAULT_RATING_MAX,
  DEFAULT_RATING_MIN,
  DEFAULT_YEAR_MAX,
  DEFAULT_YEAR_MIN,
  YEAR_MAX,
  YEAR_MIN,
} from '@src/constants';
import type { ListFilters } from '@src/types';

const parseNum = (
  s: string | null,
  fallback: number,
  min: number,
  max: number,
) => {
  if (s === null || s === '') return fallback;
  const n = Number(s);
  if (Number.isNaN(n)) return fallback;

  return Math.min(max, Math.max(min, n));
};

export const parseListFilters = (searchParams: URLSearchParams) => {
  const genresRaw = searchParams.get('genres');
  const genres = genresRaw
    ? genresRaw
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean)
    : [];

  let yearMin = parseNum(
    searchParams.get('yearMin'),
    DEFAULT_YEAR_MIN,
    YEAR_MIN,
    YEAR_MAX,
  );

  let yearMax = parseNum(
    searchParams.get('yearMax'),
    DEFAULT_YEAR_MAX,
    YEAR_MIN,
    YEAR_MAX,
  );

  if (yearMin > yearMax) {
    [yearMin, yearMax] = [yearMax, yearMin];
  }

  let ratingMin = parseNum(
    searchParams.get('ratingMin'),
    DEFAULT_RATING_MIN,
    0,
    10,
  );

  let ratingMax = parseNum(
    searchParams.get('ratingMax'),
    DEFAULT_RATING_MAX,
    0,
    10,
  );

  if (ratingMin > ratingMax) {
    [ratingMin, ratingMax] = [ratingMax, ratingMin];
  }

  return {
    genres,
    yearMin,
    yearMax,
    ratingMin,
    ratingMax,
  };
};

export const filtersToSearchParams = (
  f: ListFilters,
  prev: URLSearchParams,
) => {
  const next = new URLSearchParams(prev);

  if (f.genres.length) {
    next.set('genres', f.genres.join(','));
  } else {
    next.delete('genres');
  }

  next.set('yearMin', String(f.yearMin));
  next.set('yearMax', String(f.yearMax));
  next.set('ratingMin', String(f.ratingMin));
  next.set('ratingMax', String(f.ratingMax));

  return next;
};
