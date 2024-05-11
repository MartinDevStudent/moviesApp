//import { APIConfig } from "../../config";
import {
  CreateMovieReviewRequest,
  FantasyMovieRequest,
  LoginRequest,
} from "../types/interfaces";

//const baseUrl = APIConfig.API.endpoints[0].endpoint;
const baseUrl = "https://6amiayzia7.execute-api.eu-west-1.amazonaws.com/dev/";
const authBaseUrl =
  "https://bou6hlnvba.execute-api.eu-west-1.amazonaws.com/prod/";

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

export const getToken = (request: LoginRequest) => {
  return fetch(`${authBaseUrl}auth/signin`, {
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
  return fetch(baseUrl + `fantasyMovies/${username}`)
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
  return fetch(baseUrl + `fantasyMovies/${username}`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};
