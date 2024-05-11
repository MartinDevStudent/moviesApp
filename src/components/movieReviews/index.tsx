import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

import { MovieReview, MovieT, Review } from "../../types/interfaces"; // Import the MovieT type from the appropriate location
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { getAwsMovieReviews } from "../../api/aws-api";

const styles = {
  table: {
    minWidth: 550,
  },
};

interface AwsReviewsResponse {
  data: MovieReview[];
}

const MovieReviews: React.FC<MovieT> = (props) => {
  const {
    data: reviewsData,
    error,
    isLoading,
    isError,
  } = useQuery<Review[], Error>({
    queryKey: ["movieReviews", props.id],
    queryFn: () => getMovieReviews(props.id || ""),
  });

  const {
    data: awsReviews,
    error: awsError,
    isLoading: isAWSLoading,
    isError: isAWSError,
  } = useQuery<AwsReviewsResponse, Error>({
    queryKey: ["movieReviews", "aws", props.id],
    queryFn: () => getAwsMovieReviews(props.id),
  });

  const movie = props;

  if (isLoading || isAWSLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const reviews = awsReviews
    ? reviewsData?.concat(convertAwsReviews(awsReviews.data))
    : reviewsData;

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews!.map((r: Review) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell>
              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieReviews;

function convertAwsReviews(awsReviews: MovieReview[]): Review[] {
  return awsReviews.map(
    (x) =>
      ({
        id: x.movieId.toString(),
        content: x.content,
        author: x.reviewerName,
      } as Review)
  );
}
