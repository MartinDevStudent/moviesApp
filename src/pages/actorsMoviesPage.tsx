import { FC } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types/interfaces";
import PlaylistAddIcon from "../components/cardIcons/addToMustWatchIcon";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { useLocation, useParams } from "react-router-dom";
import { getActorsMovies } from "../api/tmdb-api";

const ActorsMoviesPage: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state;
  const { data, error, isLoading, isError } = useQuery<ListedMovie[], Error>(
    ["actor", id],
    () => getActorsMovies(id!)
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
      title={`${name}'s Movies`}
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon {...movie} />;
      }}
    />
  );
};

export default ActorsMoviesPage;
