import { FC, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from "../components/cardIcons/addToMustWatchIcon";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage: FC = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);
  const { data, error, isLoading, isError } = useQuery<ListedMovie[], Error>(
    "upcoming",
    getUpcomingMovies
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
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon {...movie} />;
      }}
    />
  );
};
export default UpcomingMoviesPage;
