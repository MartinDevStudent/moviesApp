import React, { useState } from "react";
import { ListedTvSeries, MovieT, Review } from "../types/interfaces";

interface TvSeriesContextInterface {
  favourites: number[];
  addToFavourites: (tvSeries: ListedTvSeries) => void;
  removeFromFavourites: (movie: ListedTvSeries) => void;
  mustWatch: number[];
  addToMustWatch: (movie: ListedTvSeries) => void;
  addReview: (movie: MovieT, review: Review) => void; // NEW
}
const initialContextState: TvSeriesContextInterface = {
  favourites: [],
  addToFavourites: (tvSeries) => {
    tvSeries.id;
  },
  removeFromFavourites: (tvSeries) => {
    tvSeries.id;
  },
  addReview: (tvSeries, review) => {
    tvSeries.id, review;
  }, // NEW
  mustWatch: [],
  addToMustWatch: (tvSeries) => {
    tvSeries.id;
  },
};

export const TvSeriesContext =
  React.createContext<TvSeriesContextInterface>(initialContextState);

const TvSeriesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);

  const addToFavourites = (tvSeries: ListedTvSeries) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(tvSeries.id)) {
      updatedFavourites.push(tvSeries.id);
    }
    setFavourites(updatedFavourites);
  };

  const addToMustWatch = (tvSeries: ListedTvSeries) => {
    let updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(tvSeries.id)) {
      updatedMustWatch.push(tvSeries.id);
    }
    setMustWatch(updatedMustWatch);
  };

  // We will use this function in a later section
  const removeFromFavourites = (tvSeries: ListedTvSeries) => {
    setFavourites(favourites.filter((mId) => mId !== tvSeries.id));
  };

  const addReview = (tvSeries: MovieT, review: Review) => {
    // NEW
    setMyReviews({ ...myReviews, [tvSeries.id]: review });
  };

  return (
    <TvSeriesContext.Provider
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
    </TvSeriesContext.Provider>
  );
};

export default TvSeriesContextProvider;
