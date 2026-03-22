import { createContext } from 'react';
import type { FavoriteMovie } from '@src/types';

type FavoritesContextValue = {
  favorites: FavoriteMovie[];
  addFavorite: (m: FavoriteMovie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);
