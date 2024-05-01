import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ListedMovie, ListedTvSeries } from "../../types/interfaces";
import { TvSeriesContext } from "../../contexts/tvSeriesContext";

const AddToFavouritesIcon: React.FC<ListedMovie | ListedTvSeries> = (show) => {
  const context =
    "title" in show ? useContext(MoviesContext) : useContext(TvSeriesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(show);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
