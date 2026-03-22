import { createContext } from 'react';
import type { CompareContextValue } from '@src/types';

export const CompareContext = createContext<CompareContextValue | null>(null);
