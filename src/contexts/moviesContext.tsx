import React, { useState } from "react";
import { ListedMovie, MovieT, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  addToFavourites: (movie: ListedMovie) => void;
  removeFromFavourites: (movie: ListedMovie) => void;
  mustWatch: number[];
  addToMustWatch: (movie: ListedMovie) => void;
  addReview: (movie: MovieT, review: Review) => void; // NEW
}
const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: (movie) => {
    movie.id;
  },
  removeFromFavourites: (movie) => {
    movie.id;
  },
  addReview: (movie, review) => {
    movie.id, review;
  }, // NEW
  mustWatch: [],
  addToMustWatch: (movie) => {
    movie.id;
  },
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);

  const addToFavourites = (movie: ListedMovie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  const addToMustWatch = (movie: ListedMovie) => {
    let updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      updatedMustWatch.push(movie.id);
    }
    setMustWatch(updatedMustWatch);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie: ListedMovie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie: MovieT, review: Review) => {
    // NEW
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        mustWatch,
        addToMustWatch,
        addReview, // NEW
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
