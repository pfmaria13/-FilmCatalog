export type ItemName = { name?: string | null };

export type Rating = {
  kp?: number | null;
  imdb?: number | null;
};

export type ShortImage = {
  url?: string | null;
  previewUrl?: string | null;
};

export type Premiere = {
  world?: string | null;
  russia?: string | null;
  cinema?: string | null;
};

export type MovieDto = {
  id: number;
  name?: string | null;
  alternativeName?: string | null;
  enName?: string | null;
  year?: number | null;
  description?: string | null;
  shortDescription?: string | null;
  rating?: Rating | null;
  poster?: ShortImage | null;
  genres?: ItemName[] | null;
  movieLength?: number | null;
  premiere?: Premiere | null;
};

export type MovieDocsResponse = {
  docs: MovieDto[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export type FavoriteMovie = {
  id: number;
  name: string;
  year?: number | null;
  posterUrl?: string | null;
  ratingKp?: number | null;
};
