import { useState, type ReactNode } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Popover,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

type FilterDropdownProps = {
  label: string;
  valueDisplay: string;
  children: ReactNode;
};

export const FilterDropdown = ({
  label,
  valueDisplay,
  children,
}: FilterDropdownProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <FormControl
      size="small"
      variant="outlined"
      sx={{ minWidth: 180, flex: '0 0 auto' }}
    >
      <InputLabel shrink>{label}</InputLabel>
      <OutlinedInput
        readOnly
        notched
        label={label}
        value={valueDisplay}
        onClick={(e) => setAnchor(e.currentTarget)}
        endAdornment={
          <InputAdornment position="end">
            <ArrowDropDown sx={{ color: 'action.active' }} />
          </InputAdornment>
        }
        sx={{ cursor: 'pointer', '& fieldset': { cursor: 'pointer' } }}
      />
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { sx: { mt: 0.5, px: 2, py: 2, minWidth: 300 } } }}
      >
        {children}
      </Popover>
    </FormControl>
  );
};
