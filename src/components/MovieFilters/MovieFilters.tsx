import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Typography,
} from '@mui/material';

import { FilterDropdown } from './FilterDropdown';

import { YEAR_MAX, YEAR_MIN } from '@src/constants';
import type { ListFilters } from '@src/types';

type Props = {
  genresOptions: string[];
  filters: ListFilters;
  onChange: (next: ListFilters) => void;
  genresLoading?: boolean;
};

export function MovieFilters({
  genresOptions,
  filters,
  onChange,
  genresLoading,
}: Props) {
  const handleRangeChange =
    (keyMin: keyof ListFilters, keyMax: keyof ListFilters) =>
    (_: Event, v: number | number[]) => {
      const [min, max] = v as number[];
      onChange({ ...filters, [keyMin]: min, [keyMax]: max });
    };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, overflowX: 'auto', py: 1 }}>
      <FormControl size="small" sx={{ minWidth: 200 }} disabled={genresLoading}>
        <InputLabel>Жанры</InputLabel>
        <Select
          multiple
          value={filters.genres}
          onChange={(e) =>
            onChange({ ...filters, genres: e.target.value as string[] })
          }
          input={<OutlinedInput label="Жанры" />}
          renderValue={(selected) =>
            selected.length === 0 ? 'Все' : selected.join(', ')
          }
        >
          {genresOptions.map((g) => (
            <MenuItem key={g} value={g}>
              <Checkbox checked={filters.genres.includes(g)} size="small" />
              <ListItemText primary={g} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FilterDropdown
        label="Год"
        valueDisplay={`${filters.yearMin} - ${filters.yearMax}`}
      >
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Диапазон года
        </Typography>
        <Slider
          value={[filters.yearMin, filters.yearMax]}
          min={YEAR_MIN}
          max={YEAR_MAX}
          valueLabelDisplay="auto"
          onChange={handleRangeChange('yearMin', 'yearMax')}
        />
      </FilterDropdown>

      <FilterDropdown
        label="Рейтинг КП"
        valueDisplay={`${filters.ratingMin.toFixed(1)} - ${filters.ratingMax.toFixed(1)}`}
      >
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Диапазон рейтинга
        </Typography>
        <Slider
          value={[filters.ratingMin, filters.ratingMax]}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
          onChange={handleRangeChange('ratingMin', 'ratingMax')}
        />
      </FilterDropdown>
    </Box>
  );
}
