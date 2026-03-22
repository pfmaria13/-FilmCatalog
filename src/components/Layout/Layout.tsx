import { type ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Link,
  Stack,
  Button,
} from '@mui/material';
import { Movie, Favorite, AutoAwesomeMosaic } from '@mui/icons-material';

import { ComparePanel } from './ComparePanel';
import { ToolbarSearchField } from './ToolbarSearchField';

type Props = { children: ReactNode };

export function Layout({ children }: Props) {
  const { pathname, search } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
      >
        <Toolbar>
          <Movie sx={{ mr: 1, color: 'secondary.main' }} />

          <Typography variant="h6" noWrap sx={{ mr: 2, fontWeight: 800 }}>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              Кино
              <Box component="span" sx={{ color: 'secondary.main' }}>
                Поиск
              </Box>
            </Link>
          </Typography>

          <ToolbarSearchField key={`${pathname}-${search}`} />

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<AutoAwesomeMosaic />}
              color="inherit"
              sx={{
                borderRadius: 2,
                px: 2,
                textTransform: 'none',
                fontWeight: isActive('/') ? 700 : 400,
                bgcolor: isActive('/')
                  ? 'rgba(255,255,255,0.15)'
                  : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
              }}
            >
              Каталог
            </Button>

            <Button
              component={RouterLink}
              to="/favorites"
              startIcon={<Favorite />}
              color="inherit"
              sx={{
                borderRadius: 2,
                px: 2,
                textTransform: 'none',
                fontWeight: isActive('/favorites') ? 700 : 400,
                bgcolor: isActive('/favorites')
                  ? 'rgba(255,255,255,0.15)'
                  : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
              }}
            >
              Избранное
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ py: 4, flex: 1 }}>
        {children}
      </Container>

      <ComparePanel />
    </Box>
  );
}
