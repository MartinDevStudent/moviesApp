export interface BaseMovie {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
}

export interface BaseMovieList {
  movies: BaseMovie[];
}

export interface MovieT extends BaseMovie {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    name: string;
  }[];
  credits: {
    cast: CastMember[];
  };
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string;
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface ListedMovie extends BaseMovie {
  genre_ids: number[];
}

export type FilterOption = "title" | "genre" | "vote_average";

export interface MovieListPageTemplateProps {
  movies: ListedMovie[];
  title: string;
  action: (m: ListedMovie) => void;
}

export interface Review {
  id: string;
  content: string;
  author: string;
}

interface MovieReview {
  movieId: number;
  content: string;
  reviewerName: string;
  reviewDate: Date;
  rating: Rating;
}

interface CreateMovieReviewRequest {
  movieId: number;
  reviewerName: string;
  content: string;
  rating: Rating;
}

enum Rating {
  Excellent = 5,
  Good = 4,
  Average = 3,
  Poor = 2,
  Terrible = 1,
}

export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

interface DiscoverShows {
  page: number;
  total_pages: number;
  total_results: number;
}

interface DiscoverMovies extends DiscoverShows {
  results: BaseMovie[];
}

interface DiscoverTvSeries extends DiscoverShows {
  results: BaseTvSeries[];
}

export interface Review {
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

export interface BaseTvSeries {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TvSeriesListPageTemplateProps {
  movies: ListedMovie[];
  title: string;
  action: (m: ListedMovie) => void;
}

export interface ListedTvSeries extends BaseTvSeries {
  genre_ids: number[];
}

export interface TvSeriesT extends BaseTvSeries {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    name: string;
  }[];
  credits: {
    cast: CastMember[];
  };
}

interface FantasyMovieRequest {
  title: string;
  overview: string;
  releaseDate: string;
  duration: number;
  productionCompany: string;
  genre: number;
}

interface MovieSearchOptions {
  keyword: string;
  includeAdult: boolean;
  language?: string;
  releaseYear?: number;
  page?: number;
  region?: string;
  year?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}
