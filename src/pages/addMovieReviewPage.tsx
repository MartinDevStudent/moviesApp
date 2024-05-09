import React from "react";
import PageTemplate from "../components/templateShowPage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { MovieT } from "../types/interfaces";

const WriteReviewPage: React.FC = () => {
  const location = useLocation();
  const { movieId } = location.state;
  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieT, Error>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      {movie ? (
        <PageTemplate show={movie} images={[]}>
          <ReviewForm {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie review details</p>
      )}
    </>
  );
};

export default WriteReviewPage;
