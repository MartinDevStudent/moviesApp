import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieImage, TvSeriesT } from "../types/interfaces";
import PageTemplate from "../components/templateMoviePage";
import { useQuery } from "react-query";
import { getMovieImages, getTvSeries } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import TvSeriesDetails from "../components/tvSeriesDetails";

const TvSeriesDetailsPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: tvSeries,
    error,
    isLoading,
    isError,
  } = useQuery<TvSeriesT, Error>(["tvSeries", id], () => getTvSeries(id || ""));

  const {
    data: images,
    error: imageError,
    isLoading: isLoadingImage,
    isError: isImageError,
  } = useQuery<MovieImage[], Error>(["images", id], () => getMovieImages(id!));

  if (isLoading || isLoadingImage) {
    return <Spinner />;
  }

  if (isError || isImageError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {tvSeries ? (
        <>
          <PageTemplate tvSeries={tvSeries as TvSeriesT} images={images!}>
            <TvSeriesDetails {...(tvSeries as TvSeriesT)} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for tv series details</p>
      )}
    </>
  );
};

export default TvSeriesDetailsPage;
