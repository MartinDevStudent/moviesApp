import { FC, useState } from "react";
import PageTemplate from "../components/templateShowListPage";
import { ListedMovie, MovieSearchOptions } from "../types/interfaces";
import PlaylistAddIcon from "../components/cardIcons/addToMustWatchIcon";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { useLocation } from "react-router-dom";
import { getMovieSearchResults } from "../api/tmdb-api";
import Movie from "../components/movieCard";
import { Grid } from "@mui/material";
import { ListPagination } from "../components/listPagination";

const SearchResultsPage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const { state: movieOptions } = useLocation();
  movieOptions.page = page;
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["searchResults", movieOptions],
    queryFn: () => getMovieSearchResults(movieOptions as MovieSearchOptions),
    placeholderData: keepPreviousData,
  });

  const movies: ListedMovie[] = data ? data.results : [];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <PageTemplate title={`Movie Search Results`}>
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
      <ListPagination pageCount={data?.total_pages ?? 1} setPage={setPage} />
    </>
  );
};

export default SearchResultsPage;
