import React from "react";
import ShowHeader from "../showHeader";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MovieImage, MovieT, TvSeriesT } from "../../types/interfaces";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: 450,
    height: "100vh",
  },
};

interface TemplateShowPageProps {
  show: MovieT | TvSeriesT;
  images: MovieImage[];
  children: React.ReactElement;
}

const TemplateShowPage: React.FC<TemplateShowPageProps> = (props) => {
  const { show, images, children } = props;
  const title = "name" in show ? show.name : show.title;
  const homepage = "name" in show ? "/tv-series" : "/";

  return (
    <>
      <ShowHeader title={title} homepage={homepage} id={props.show.id} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            <ImageList cols={1}>
              {images.map((image: MovieImage) => (
                <ImageListItem
                  key={image.file_path}
                  sx={styles.gridListTile}
                  cols={1}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={"Image alternative"}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateShowPage;
