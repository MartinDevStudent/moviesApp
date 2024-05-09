import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieImage, MovieT } from "../types/interfaces";
import PageTemplate from "../components/templateShowPage";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieImages } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieT, Error>({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id || ""),
  });

  const {
    data: images,
    error: imageError,
    isLoading: isLoadingImage,
    isError: isImageError,
  } = useQuery<MovieImage[], Error>({
    queryKey: ["images", id],
    queryFn: () => getMovieImages(id!),
  });

  if (isLoading || isLoadingImage) {
    return <Spinner />;
  }

  if (isError || isImageError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate show={movie as MovieT} images={images!}>
            <MovieDetails {...(movie as MovieT)} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
