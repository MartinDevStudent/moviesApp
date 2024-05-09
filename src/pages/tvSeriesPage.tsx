import PageTemplate from "../components/templateShowListPage";
import { DiscoverTvSeries, ListedTvSeries } from "../types/interfaces";
import { getTvSeriess } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import MovieFilterUI, {
  genreFilter,
  titleFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import useFiltering from "../hooks/useFiltering";
import { Grid } from "@mui/material";
import TvSeriesCard from "../components/tvSeriesCard";

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

const TvSeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverTvSeries, Error>(
    {
      queryKey: ["discoverTvSeries"],
      queryFn: getTvSeriess,
    }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
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
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvSeries = data ? data.results : [];
  const displayedTvSeries = tvSeries.map((x) => ({
    ...x,
    release_date: x.first_air_date,
  }));
  //const displayedTvSeries = filterFunction(tvSeries);

  return (
    <>
      <PageTemplate title="Discover TV Series">
        {displayedTvSeries.map((x: ListedTvSeries) => (
          <Grid key={x.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <TvSeriesCard
              key={x.id}
              tvSeries={x}
              action={(tvSeries: ListedTvSeries) => {
                return <AddToFavouritesIcon {...tvSeries} />;
              }}
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
export default TvSeriesPage;
