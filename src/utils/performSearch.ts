import { type NavigateFunction } from 'react-router-dom';

export const performSearch = (
  q: string,
  navigate: NavigateFunction,
  currentPath: string,
) => {
  const trimmed = q.trim();
  if (!trimmed) return;

  const searchString = `?q=${encodeURIComponent(trimmed)}`;

  if (currentPath !== '/') {
    navigate(`/${searchString}`);
  } else {
    navigate(searchString, { replace: true });
  }
};
