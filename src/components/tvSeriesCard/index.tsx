import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedTvSeries } from "../../types/interfaces";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface TvSeriesCardProps {
  tvSeries: ListedTvSeries;
  action: (x: ListedTvSeries) => React.ReactNode;
}

const TvSeriesCard: React.FC<TvSeriesCardProps> = (props) => {
  const tvSeries = { ...props.tvSeries, favourite: false, mustWatch: false };
  const { favourites, mustWatch } = useContext(MoviesContext);

  if (favourites.find((id) => id === tvSeries.id)) tvSeries.favourite = true;
  if (mustWatch.find((id) => id === tvSeries.id)) tvSeries.mustWatch = true;

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          tvSeries.favourite || tvSeries.mustWatch ? (
            <Avatar sx={styles.avatar}>{props.action(tvSeries)}</Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {tvSeries.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          tvSeries.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvSeries.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tvSeries.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tvSeries.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {props.action(tvSeries)}
        <Link to={`/tv-series/${tvSeries.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TvSeriesCard;
