import React, { ChangeEvent, useState } from "react"; // replace existing react import
import { GenreData } from "../types/interfaces";
import { useQuery } from "react-query";
import { getGenres } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ShowHeader from "../components/showHeader";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

interface FantasyMovie {
  title: string;
  overview: string;
  releaseDate: string;
  duration: number;
  productionCompany: string;
  genre: number;
}

const FantasyMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState(28);
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );

  const genres = data ? data.genres : [];

  const defaultValues = {
    defaultValues: {
      title: "",
      overview: "",
      releaseDate: new Date().toISOString().substring(0, 10),
      duration: 0,
      productionCompany: "",
    },
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FantasyMovie>(defaultValues);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGenre(Number(event.target.value));
  };

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favourites");
  };

  const onSubmit: SubmitHandler<FantasyMovie> = (data) => {
    setOpen(true);
    console.log({ ...data, genre });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      <ShowHeader title={"Create a Fantasy Movie"} homepage={"/"} id={1} />

      <Box component="div" sx={styles.root}>
        <Snackbar
          sx={styles.snack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleSnackClose}
        >
          <Alert severity="success" variant="filled" onClose={handleSnackClose}>
            <Typography variant="h4">
              Thank you for creating a fantasy movie
            </Typography>
          </Alert>
        </Snackbar>
        <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box component="div" sx={styles.root}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={onChange}
                  value={value}
                  id="author"
                  label="Title"
                  autoFocus
                />
              )}
            />
            {errors.title && (
              <Typography variant="h6" component="p">
                {errors.title.message}
              </Typography>
            )}
            <Controller
              name="releaseDate"
              control={control}
              rules={{ required: "Release date is required" }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  value={value}
                  onChange={onChange}
                  label="Release date"
                  id="releaseDate"
                  type="date"
                />
              )}
            />
            {errors.releaseDate && (
              <Typography variant="h6" component="p">
                {errors.releaseDate.message}
              </Typography>
            )}
            <Controller
              name="duration"
              control={control}
              rules={{ required: "Duration is required", minLength: 1 }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  value={value}
                  onChange={onChange}
                  label="Duration"
                  id="duration"
                  type="number"
                />
              )}
            />
            {errors.duration && (
              <Typography variant="h6" component="p">
                {errors.duration.message}
              </Typography>
            )}
            <Controller
              name="productionCompany"
              control={control}
              rules={{ required: "Production company is required" }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  value={value}
                  onChange={onChange}
                  label="Production company"
                  id="productionCompany"
                />
              )}
            />
            {errors.productionCompany && (
              <Typography variant="h6" component="p">
                {errors.productionCompany.message}
              </Typography>
            )}
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "40ch" }}
                  id="genre"
                  select
                  variant="outlined"
                  label="Genre Select"
                  value={genre}
                  onChange={handleRatingChange}
                  helperText="Don't forget your genre"
                >
                  {genres.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="overview"
              control={control}
              rules={{
                required: "Overview cannot be empty",
                minLength: { value: 10, message: "Overview is too short" },
              }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Overview"
                  id="overview"
                  multiline
                  minRows={10}
                />
              )}
            />
            {errors.overview && (
              <Typography variant="h6" component="p">
                {errors.overview.message}
              </Typography>
            )}
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={styles.submit}
              >
                Submit
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                sx={styles.submit}
                onClick={() => {
                  reset({
                    title: "",
                    overview: "",
                    releaseDate: new Date().toString(),
                    duration: 0,
                    productionCompany: "",
                    genre: Number(genres[0].id),
                  });
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default FantasyMoviePage;
