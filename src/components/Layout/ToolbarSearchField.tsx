import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { TextField, InputAdornment, IconButton, alpha } from '@mui/material';
import { Search } from '@mui/icons-material';
import { performSearch } from '@src/utils';

export function ToolbarSearchField() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => performSearch(query, navigate, pathname);

  return (
    <TextField
      size="small"
      placeholder="Введите название фильма"
      value={query}
      autoComplete="off"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      slotProps={{
        input: {
          sx: {
            borderRadius: 2,
            transition: 'all 0.3s ease',
            bgcolor: isFocused ? alpha('#fff', 0.25) : alpha('#fff', 0.1),
            backdropFilter: 'blur(4px)',
            border: `1px solid ${alpha('#fff', isFocused ? 0.4 : 0.1)}`,
            px: 1,
            color: '#fff',
            '&:hover': {
              bgcolor: alpha('#fff', 0.2),
              borderColor: alpha('#fff', 0.3),
            },
            '& fieldset': { border: 'none' },
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleSubmit}
                sx={{
                  color: isFocused ? 'secondary.main' : alpha('#fff', 0.7),
                  transition: 'color 0.3s',
                }}
              >
                <Search fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        flexGrow: 1,
        maxWidth: isFocused ? 480 : 280,
        mx: 2,
        transition: 'max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
  );
}
