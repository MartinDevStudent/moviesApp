import React, { useContext } from "react";
import PageTemplate from "../components/templateShowListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import { ListedMovie, MovieT } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { Grid } from "@mui/material";
import Movie from "../components/movieCard";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie: MovieT, value: string) {
    // Is user selected genre in this movies's genre list?
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    })),
  });
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayMovies = allFavourites ? filterFunction(allFavourites) : [];
  const toDo = () => true;

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate title="Favourite Movies">
        {displayMovies.map((m: ListedMovie) => (
          <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Movie
              key={m.id}
              movie={m as ListedMovie}
              action={(movie: ListedMovie) => (
                <>
                  <RemoveFromFavourites {...movie} />
                  <WriteReview {...movie} />
                </>
              )}
            />
          </Grid>
        ))}
      </PageTemplate>
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
