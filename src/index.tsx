import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import ActorsMoviesPage from "./pages/actorsMoviesPage";
import TvSeriesPage from "./pages/tvSeriesPage";
import TvSeriesContextProvider from "./contexts/tvSeriesContext";
import TvSeriesDetailsPage from "./pages/tvSeriesDetailsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <TvSeriesContextProvider>
            <Routes>
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route
                path="/movies/favourites"
                element={<FavouriteMoviesPage />}
              />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/actors/:id" element={<ActorsMoviesPage />} />
              <Route path="/tv-series" element={<TvSeriesPage />} />
              <Route path="/tv-series/:id" element={<TvSeriesDetailsPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </TvSeriesContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
