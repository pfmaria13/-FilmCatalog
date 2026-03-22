import { useCallback, useMemo, useState, type ReactNode } from 'react';

import { CompareContext } from './CompareContext';

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);

  const toggleCompare = useCallback((id: number) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length < 2) {
        return [...prev, id];
      }
      return [prev[1], id];
    });
  }, []);

  const isComparing = useCallback((id: number) => ids.includes(id), [ids]);

  const clearCompare = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({ ids, toggleCompare, isComparing, clearCompare }),
    [ids, toggleCompare, isComparing, clearCompare],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
