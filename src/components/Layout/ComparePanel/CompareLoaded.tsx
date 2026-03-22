import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { useCompareMovies } from '@src/hooks';
import { COMPARE_FIELDS } from './compareFields';
import { CompareRow } from './CompareRow';

type LoadedProps = {
  ids: number[];
  clearCompare: () => void;
};

export const CompareLoaded = ({ ids, clearCompare }: LoadedProps) => {
  const { left, right, loading } = useCompareMovies(ids);

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: (t) => t.zIndex.drawer - 1,
        mt: 4,
        p: 2,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Сравнение фильмов
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Выбрано: {ids.length} / 2
          </Typography>

          <IconButton size="small" onClick={clearCompare}>
            <Close />
          </IconButton>
        </Box>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="20%">Поле</TableCell>

            <TableCell>Фильм 1</TableCell>

            <TableCell>Фильм 2</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                <CircularProgress size={32} />
              </TableCell>
            </TableRow>
          ) : (
            COMPARE_FIELDS.map((field) => (
              <CompareRow
                key={field.label}
                label={field.label}
                left={left}
                right={right}
                getValue={field.getValue}
              />
            ))
          )}
        </TableBody>
      </Table>

      {ids.length === 1 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          Выберите второй фильм кнопкой «Сравнить» на карточке.
        </Typography>
      )}
    </Paper>
  );
};
