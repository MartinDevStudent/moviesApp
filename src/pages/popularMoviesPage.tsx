import { FC } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types/interfaces";
import { getPopularMovies } from "../api/tmdb-api";
import PlaylistAddIcon from "../components/cardIcons/addToMustWatchIcon";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const PopularMoviesPage: FC = () => {
  const { data, error, isLoading, isError } = useQuery<ListedMovie[], Error>(
    "popular",
    getPopularMovies
  );

  const movies = data ? data : [];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon {...movie} />;
      }}
    />
  );
};

export default PopularMoviesPage;
