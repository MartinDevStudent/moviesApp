import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGenres } from "../../api/tmdb-api";
import { FantasyMovie, GenreData } from "../../types/interfaces";
import { deleteFantasyMovie, getFantasyMovies } from "../../api/aws-api";
import Spinner from "../spinner";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const styles = {
  title: {
    marginTop: "1em",
    marginBottom: "0.5em",
  },
};

const FantasyMovies: React.FC = () => {
  const { username } = useContext(UserContext);
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (title: string) => {
      return deleteFantasyMovie(username, title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fantasyMovies", username] });
    },
  });

  const {
    data: movieData,
    error: movieError,
    isLoading: isLoadingMovie,
    isError: isMovieError,
  } = useQuery<FantasyMovie, Error>({
    queryKey: ["fantasyMovies", username],
    queryFn: () => getFantasyMovies(username),
    enabled: username.length > 0,
  });

  const genres = data ? data.genres : [];
  const fantasyMovies = movieData ? (movieData.data as FantasyMovie[]) : [];

  const handleDelete = (title: string) => {
    mutation.mutate(title);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!movieData || isError || isMovieError) {
    return <></>;
  }

  return (
    <>
      <Typography variant="h4" sx={styles.title}>
        Fantasy Movies
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="fantasy movie table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Overview</TableCell>
              <TableCell align="right">Release Date</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Production Company </TableCell>
              <TableCell align="right">Genre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fantasyMovies.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.overview}</TableCell>
                <TableCell align="right">{row.releaseDate}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right">{row.productionCompany}</TableCell>
                <TableCell align="right">
                  {genres.find((x) => x.id == row.genre)?.name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(row.title)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FantasyMovies;
