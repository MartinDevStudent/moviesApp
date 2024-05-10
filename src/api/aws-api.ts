import { APIConfig } from "../../config";

export const getReviewsByMovieId = (id: number) => {
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
