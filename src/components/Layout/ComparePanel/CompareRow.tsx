import { TableRow, TableCell } from '@mui/material';
import { type MovieDto } from '@src/types';

type Props = {
  label: string;
  left: MovieDto | null;
  right: MovieDto | null;
  getValue: (m: MovieDto | null) => string;
};

export const CompareRow = ({ label, left, right, getValue }: Props) => (
  <TableRow hover>
    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>
      {label}
    </TableCell>

    <TableCell>{getValue(left)}</TableCell>

    <TableCell>{getValue(right)}</TableCell>
  </TableRow>
);
