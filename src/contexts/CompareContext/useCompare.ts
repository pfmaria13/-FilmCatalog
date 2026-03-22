import { useContext } from 'react';
import { CompareContext } from './CompareContext';

export function useCompare() {
  const ctx = useContext(CompareContext);

  if (!ctx) {
    throw new Error('CompareContext error');
  }

  return ctx;
}
