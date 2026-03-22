import { useCompare } from '@src/contexts';
import { CompareLoaded } from './CompareLoaded';

export const ComparePanel = () => {
  const { ids, clearCompare } = useCompare();

  if (ids.length === 0) return null;

  return (
    <CompareLoaded key={ids.join('-')} ids={ids} clearCompare={clearCompare} />
  );
};
