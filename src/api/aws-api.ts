import { APIConfig } from "../../config";
import {
  CreateMovieReviewRequest,
  FantasyMovieRequest,
  LoginRequest,
} from "../types/interfaces";

export const getAwsMovieReviews = (id: number) => {
  return fetch(APIConfig.API.endpoints[0].endpoint + `movies/${id}/reviews`)
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
  return fetch(
    APIConfig.API.endpoints[0].endpoint + `movies/${request.movieId}/reviews`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then((response) => response.json());
};

export const getToken = (request: LoginRequest) => {
  return fetch(APIConfig.API.endpoints[1].endpoint + `auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ username: "userA", password: "passwA!1" }),
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

export const getFantasyMovies = (username: string) => {
  return fetch(
    APIConfig.API.endpoints[0].endpoint + `fantasyMovies/${username}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch fantasy movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const postFantasyMovie = (
  request: FantasyMovieRequest,
  username: string
) => {
  return fetch(
    APIConfig.API.endpoints[0].endpoint + `fantasyMovies/${username}`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then((response) => response.json());
};
