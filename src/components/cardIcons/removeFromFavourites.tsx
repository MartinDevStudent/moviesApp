import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedMovie, ListedTvSeries } from "../../types/interfaces";
import { TvSeriesContext } from "../../contexts/tvSeriesContext";

interface RemoveFromFavouritesIconProps {
  isTvSeries?: boolean;
  movie?: ListedMovie;
  tvSeries?: ListedTvSeries;
}

const RemoveFromFavouritesIcon: React.FC<RemoveFromFavouritesIconProps> = (
  props
) => {
  const context = useContext(MoviesContext);
  const tvContext = useContext(TvSeriesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.isTvSeries) {
      tvContext.removeFromFavourites(props.tvSeries!);
    } else {
      context.removeFromFavourites(props.movie!);
    }
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesIcon;
