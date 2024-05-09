import React, { useState } from "react";
import PageTemplate from "../components/templateShowListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  voteFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Movie from "../components/movieCard";
import { Grid } from "@mui/material";
import { ListPagination } from "../components/listPagination";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};
const voteFiltering = {
  name: "vote_average",
  value: "0",
  condition: voteFilter,
};

const HomePage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>({
    queryKey: ["discover", page],
    queryFn: () => getMovies(page),
    placeholderData: keepPreviousData,
  });
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, voteFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1], filterValues[2]]
        : type === "genre"
        ? [filterValues[0], changedFilter, filterValues[2]]
        : [filterValues[0], filterValues[1], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate title="Discover Movies">
        {displayedMovies.map((m: ListedMovie) => (
          <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Movie
              key={m.id}
              movie={m as ListedMovie}
              action={(movie: ListedMovie) => {
                return <AddToFavouritesIcon {...movie} />;
              }}
            />
          </Grid>
        ))}
      </PageTemplate>
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        votesFilter={filterValues[2].value}
      />
      <ListPagination pageCount={data?.total_pages ?? 1} setPage={setPage} />
    </>
  );
};
export default HomePage;
