import React, { FC } from "react";
import { CastMember } from "../../types/interfaces";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  card: { maxWidth: 345, marginTop: "2em" },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface CastCarouselProps {
  cast: CastMember[];
}

const CastCarousel: FC<CastCarouselProps> = (props) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {props.cast.map((actor) => (
          <Link to={`/actors/${actor.id}`} state={actor.name}>
            <Card sx={styles.card}>
              <CardMedia
                sx={styles.media}
                image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              />
              <CardHeader
                title={
                  <Typography variant="h5" component="p">
                    {actor.name}{" "}
                  </Typography>
                }
              />
            </Card>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default CastCarousel;
