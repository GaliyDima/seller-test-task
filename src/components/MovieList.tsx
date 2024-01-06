import { useEffect, useState } from "react";
import useFetchMovie from "../hooks/useFetchMovie";
import MovieCard from "./MovieCard";
import useFetchGenres from "../hooks/useFetchGenres";
import { TextField } from "@mui/material";
import SelectGenres from "./SelectGenres";
import SortBy from "./SortBy";
import SelectRating from "./SelectRating";

const MovieList = () => {
  const storedMinRating = sessionStorage.getItem("minRating");
  const initialMinRating = storedMinRating ? JSON.parse(storedMinRating) : 0;

  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(initialMinRating);
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    JSON.parse(sessionStorage.getItem("selectedGenres") || "[]")
  );
  const [sortBy, setSortBy] = useState<string>(
    sessionStorage.getItem("sortBy") || "popularity.desc"
  );

  const { movieList, error } = useFetchMovie(minRating, selectedGenres, sortBy);
  const { genresList, error: genresError } = useFetchGenres();

  const getGenreName = (genreId: number) => {
    const foundGenre = genresList.find((genre) => genre.id === genreId);
    return foundGenre ? foundGenre.name : "Unknown";
  };

  const filteredMovies = movieList
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((movie) => movie.vote_average >= minRating);

  const sortedMovies = filteredMovies.sort(
    (a, b) => b.popularity - a.popularity
  );

  useEffect(() => {
    sessionStorage.setItem("minRating", JSON.stringify(minRating || 0));
    sessionStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
  }, [minRating, selectedGenres]);

  if (error || genresError) {
    return <div>Something went wrong, please try again</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", gap: 10, marginTop: 30 }}>
        <SelectGenres
          selectedGenres={selectedGenres}
          genresList={genresList}
          setSelectedGenres={setSelectedGenres}
        />

        <SortBy sortBy={sortBy} setSortBy={setSortBy} />

        <TextField
          id="standard-basic"
          label="Search by movie title..."
          variant="standard"
          value={searchTerm}
          sx={{ width: 200 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectRating minRating={minRating} setMinRating={setMinRating} />
      </div>

      <h1>List of films</h1>

      {sortedMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster={movie.poster_path}
          rating={movie.vote_average}
          genres={movie.genre_ids.map((genreId) => getGenreName(genreId))}
          releaseYear={new Date(movie.release_date).getFullYear()}
          overview={movie.overview}
        />
      ))}
    </div>
  );
};

export default MovieList;
