import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { FavoriteMovie } from '@src/types';
import { STORAGE_KEY } from '@src/constants';

import { FavoritesContext } from './FavoritesContext';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is FavoriteMovie => typeof x === 'object' && x !== null,
    );
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() =>
    loadFromStorage(),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((m: FavoriteMovie) => {
    setFavorites((prev) => {
      if (prev.some((x) => x.id === m.id)) return prev;
      return [...prev, m];
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((x) => x.id === id),
    [favorites],
  );

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites, addFavorite, removeFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
