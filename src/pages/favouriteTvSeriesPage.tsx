import React, { useContext } from "react";
import PageTemplate from "../components/templateShowListPage";
import { useQueries } from "@tanstack/react-query";
import { getTvSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { ListedTvSeries } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { Grid } from "@mui/material";
import { TvSeriesContext } from "../contexts/tvSeriesContext";
import TvSeriesCard from "../components/tvSeriesCard";

const FavouriteTvSeriesPage: React.FC = () => {
  const { favourites: tvSeriesId } = useContext(TvSeriesContext);

  // Create an array of queries and run them in parallel.
  const favouriteTvSeriesQueries = useQueries({
    queries: tvSeriesId.map((id) => ({
      queryKey: ["tvSeries", id],
      queryFn: () => getTvSeries(id.toString()),
    })),
  });
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvSeriesQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTvSeriesQueries.map((q) => q.data);

  return (
    <>
      <PageTemplate title="Favourite Tv Series">
        {allFavourites.map((t: ListedTvSeries) => (
          <Grid key={t.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <TvSeriesCard
              key={t.id}
              tvSeries={t as ListedTvSeries}
              action={(tvSeries: ListedTvSeries) => (
                <>
                  <RemoveFromFavourites tvSeries={tvSeries} isTvSeries />
                  <WriteReview {...tvSeries} />
                </>
              )}
            />
          </Grid>
        ))}
      </PageTemplate>
    </>
  );
};

export default FavouriteTvSeriesPage;
