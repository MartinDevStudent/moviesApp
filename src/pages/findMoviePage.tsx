import React, { ChangeEvent, useState } from "react"; // replace existing react import
import { MovieSearchOptions } from "../types/interfaces";
import ShowHeader from "../components/showHeader";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { languages, regions } from "../util";

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

const FindMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<string | undefined>("en-US");
  const [region, setRegion] = useState<string | undefined>("US");

  const defaultValues = {
    defaultValues: {
      keyword: "",
      includeAdult: true,
      language: undefined,
      releaseYear: undefined,
      region: undefined,
      year: undefined,
    },
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<MovieSearchOptions>(defaultValues);

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

  const handleRegionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegion(event.target.value);
  };

  const onSubmit: SubmitHandler<MovieSearchOptions> = (data) => {
    data.language = language;
    data.region = region;

    console.log(data);
    navigate("/movies/search-results", { state: data });
  };

  return (
    <>
      <ShowHeader title={"Find A Movie"} homepage={"/"} id={1} />

      <Box component="div" sx={styles.root}>
        <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box component="div" sx={styles.root}>
            <Controller
              name="keyword"
              control={control}
              rules={{ required: "Keyword is required" }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={onChange}
                  value={value}
                  id="keyword"
                  label="Keyword"
                  autoFocus
                />
              )}
            />
            {errors.keyword && (
              <Typography variant="h6" component="p">
                {errors.keyword.message}
              </Typography>
            )}
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "40ch" }}
                  id="language"
                  select
                  variant="outlined"
                  label="Language Select"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  {/* <MenuItem key={undefined} value={"undefined"}>
                    None
                  </MenuItem> */}
                  {languages.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="releaseYear"
              control={control}
              rules={{ min: 1900 }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  value={value}
                  onChange={onChange}
                  label="Release Year"
                  id="releaseYear"
                  type="number"
                />
              )}
            />
            {errors.releaseYear && (
              <Typography variant="h6" component="p">
                {errors.releaseYear.message}
              </Typography>
            )}
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "40ch" }}
                  id="region"
                  select
                  variant="outlined"
                  label="Region Select"
                  value={region}
                  onChange={handleRegionChange}
                >
                  {/* <MenuItem key={undefined} value={"undefined"}>
                    None
                  </MenuItem> */}
                  {regions.map(([code, regionName]) => (
                    <MenuItem key={code} value={code}>
                      {regionName}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  margin="normal"
                  value={value}
                  onChange={onChange}
                  label="Year"
                  id="year"
                  type="number"
                />
              )}
            />
            <Controller
              name="includeAdult"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  sx={{ width: "40ch" }}
                  control={<Checkbox {...field} />}
                  label="Include Adult"
                />
              )}
            />
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
                    keyword: "",
                    includeAdult: true,
                    language: undefined,
                    releaseYear: undefined,
                    region: undefined,
                    year: undefined,
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

export default FindMoviePage;
