import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateShowPage";
import MovieReview from "../components/movieReview";

const MovieReviewPage: React.FC = () => {
  const {
    state: { movie, review },
  } = useLocation();
  return (
    <PageTemplate show={movie} images={[]}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
