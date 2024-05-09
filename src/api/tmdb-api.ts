export const getMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&append_to_response=credits`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getUpcomingMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=${page}`
  )
    .then((res) => res.json())
    .then((json) => json);
};

export const getPopularMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=${page}`
  )
    .then((res) => res.json())
    .then((json) => json);
};

export const getActorsMovies = (id: string | number, page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=${page}&with_cast=${id}`
  )
    .then((res) => res.json())
    .then((json) => json);
};

export const getTvSeriess = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvSeries = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&append_to_response=credits`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get tv series data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvSeriesImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

interface MovieSearchOptions {
  keyword: string;
  includeAdult?: boolean;
  language?: string;
  releaseYear?: number;
  page?: number;
  region?: string;
  year?: number;
}

export const getMovieSearchResults = (options: MovieSearchOptions) => {
  const optionsQueryString = buildOptionsQueryString(options);

  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&query=${options.keyword}&page=${options.page}${optionsQueryString}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

function buildOptionsQueryString(options: MovieSearchOptions): string {
  let queryString = "";

  if (options.includeAdult !== undefined) {
    queryString += `&include_adult=${options.includeAdult}`;
  }
  if (options.language !== undefined) {
    queryString += `&language=${options.language}`;
  }
  if (options.releaseYear !== undefined) {
    queryString += `&primary_release_year=${options.releaseYear}`;
  }
  if (options.region !== undefined) {
    queryString += `&region=${options.region}`;
  }
  if (options.year !== undefined) {
    queryString += `&year=${options.year}`;
  }

  return queryString;
}
