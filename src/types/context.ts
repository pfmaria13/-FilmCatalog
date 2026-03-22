export type CompareContextValue = {
  ids: number[];
  toggleCompare: (id: number) => void;
  isComparing: (id: number) => boolean;
  clearCompare: () => void;
};
