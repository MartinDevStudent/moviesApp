import React from "react"; // replace existing react import
import { GenreData } from "../types/interfaces";
import { useQuery } from "react-query";
import { getGenres } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ShowHeader from "../components/showHeader";
import {
  Box,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface FormInput {
  title: string;
  overview: string;
  releaseDate: string;
  duration: number;
  productionCompany: string;
  genre: number;
}

const FantasyMoviePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );
  const genres = data ? data.genres : [];
  const { handleSubmit, control, reset } = useForm<FormInput>({
    defaultValues: {
      title: "",
      overview: "",
      releaseDate: Date.now(),
      duration: undefined,
      productionCompany: "",
      genre: 0,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      <ShowHeader title={"Create a Fantasy Movie"} homepage={"/"} id={1} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "2em",
          }}
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} label="Title" />}
          />
          <Controller
            name="overview"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} label="Overview" />}
          />
          <Controller
            name="releaseDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="Release Date" type="date" />
            )}
          />
          <Controller
            name="duration"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} type="number" label="Duration" />
            )}
          />
          <Controller
            name="productionCompany"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="Production Company" />
            )}
          />
          <Controller
            name="genre"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select {...field} labelId="genre-label">
                  {genres.map((genre) => {
                    return (
                      <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </>
            )}
          />
          <Input type="submit" />
        </Box>
      </form>
    </>
  );
};

export default FantasyMoviePage;
