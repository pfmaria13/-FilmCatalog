import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';

import { MovieFilters, MovieInfiniteList } from '@src/components';
import { filtersToSearchParams, parseListFilters } from '@src/utils';
import { useGenreOptions } from '@src/hooks';

export function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.toString();

  const filters = useMemo(
    () => parseListFilters(new URLSearchParams(searchKey)),
    [searchKey],
  );

  const searchQuery = searchParams.get('q')?.trim() ?? '';
  const listKey = JSON.stringify({ filters, q: searchQuery });

  const { genreOptions, genresLoading } = useGenreOptions();

  return (
    <>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Каталог фильмов
      </Typography>

      <MovieFilters
        genresOptions={genreOptions}
        filters={filters}
        genresLoading={genresLoading}
        onChange={(next) =>
          setSearchParams(filtersToSearchParams(next, searchParams), {
            replace: true,
          })
        }
      />

      <MovieInfiniteList
        key={listKey}
        filters={filters}
        searchQuery={searchQuery}
      />
    </>
  );
}
