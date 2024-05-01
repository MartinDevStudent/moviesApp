import { FC } from "react";
import PageTemplate from "../components/templateShowListPage";
import { ListedMovie } from "../types/interfaces";
import PlaylistAddIcon from "../components/cardIcons/addToMustWatchIcon";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { useLocation, useParams } from "react-router-dom";
import { getActorsMovies } from "../api/tmdb-api";
import Movie from "../components/movieCard";
import { Grid } from "@mui/material";

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
    <PageTemplate title={`${name}'s Movies`}>
      {movies.map((m: ListedMovie) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Movie
            key={m.id}
            movie={m as ListedMovie}
            action={(movie: ListedMovie) => {
              return <PlaylistAddIcon {...movie} />;
            }}
          />
        </Grid>
      ))}
    </PageTemplate>
  );
};

export default ActorsMoviesPage;
