import { CreateMovieReviewRequest } from "../types/interfaces";

//const baseUrl = APIConfig.API.endpoints[0].endpoint;
const baseUrl = "https://vbm10ys7fd.execute-api.eu-west-1.amazonaws.com/dev/";

export const getAwsMovieReviews = (id: number) => {
  return fetch(baseUrl + `movies/${id}/reviews`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch reviews. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const postMovieReview = (request: CreateMovieReviewRequest) => {
  return fetch(baseUrl + `movies/${request.movieId}/reviews`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};
