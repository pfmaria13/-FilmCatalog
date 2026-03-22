import { apiClient } from './client';
import type { GenreOption, MovieDocsResponse, MovieDto } from '@src/types';
import { LIST_SELECT_FIELDS } from '@src/constants';

const appendRepeatedParams = (
  sp: URLSearchParams,
  key: string,
  values: readonly string[],
) => {
  for (const v of values) {
    sp.append(key, v);
  }
};

const buildListQuery = (params: {
  page: number;
  limit: number;
  genres: string[];
  yearMin: number;
  yearMax: number;
  ratingMin: number;
  ratingMax: number;
}) => {
  const sp = new URLSearchParams();
  sp.set('page', String(params.page));
  sp.set('limit', String(params.limit));
  for (const f of LIST_SELECT_FIELDS) {
    sp.append('selectFields', f);
  }
  appendRepeatedParams(sp, 'genres.name', params.genres);
  sp.append('year', `${params.yearMin}-${params.yearMax}`);
  sp.append('rating.kp', `${params.ratingMin}-${params.ratingMax}`);
  return sp.toString();
};

export const fetchMoviePage = async (
  args: {
    page: number;
    limit: number;
    genres: string[];
    yearMin: number;
    yearMax: number;
    ratingMin: number;
    ratingMax: number;
  },
  opts?: { signal?: AbortSignal },
) => {
  const qs = buildListQuery(args);
  const { data } = await apiClient.get<MovieDocsResponse>(`/v1.4/movie?${qs}`, {
    signal: opts?.signal,
  });
  return data;
};

export const fetchMovieById = async (id: number) => {
  const { data } = await apiClient.get<MovieDto>(`/v1.4/movie/${id}`);
  return data;
};

export const searchMovies = async (
  args: {
    query: string;
    page: number;
    limit: number;
  },
  opts?: { signal?: AbortSignal },
) => {
  const sp = new URLSearchParams();
  sp.set('query', args.query);
  sp.set('page', String(args.page));
  sp.set('limit', String(args.limit));

  const { data } = await apiClient.get<MovieDocsResponse>(
    `/v1.4/movie/search?${sp.toString()}`,
    { signal: opts?.signal },
  );

  return data;
};

export const fetchGenreNames = async () => {
  const { data } = await apiClient.get<GenreOption[]>(
    '/v1/movie/possible-values-by-field',
    { params: { field: 'genres.name' } },
  );

  return data
    .map((g) => g.name)
    .filter((n): n is string => Boolean(n))
    .sort((a, b) => a.localeCompare(b, 'ru'));
};
