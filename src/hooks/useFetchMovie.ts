import { useState, useEffect } from "react";
import axios from "axios";

interface IMovieList {
  id: number;
  language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

const useFetchMovie = (
  minRating: number,
  genreIds: number[],
  sortBy: string
) => {
  const [movieList, setMovieList] = useState<IMovieList[]>([]);
  const [error, setError] = useState<unknown>(null);
  const apiKey = "99a04468da65be388e8ab2cb8526a866";
  const apiUrl = "https://api.themoviedb.org/3/discover/movie";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            api_key: apiKey,
            "vote_average.gte": minRating,
            with_genres: genreIds.join(","),
            sort_by: sortBy,
          },
        });

        setMovieList(response.data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [apiKey, apiUrl, minRating, genreIds, sortBy]);

  useEffect(() => {
    sessionStorage.setItem("selectedGenres", JSON.stringify(genreIds));
  }, [genreIds]);

  return { movieList, error };
};

export default useFetchMovie;
