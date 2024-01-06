import { useState, useEffect } from "react";
import axios from "axios";

interface IGenres {
  id: number;
  name: string;
}

const useFetchGenres = () => {
  const [genresList, setGenresList] = useState<IGenres[]>([]);
  const [error, setError] = useState<unknown>(null);
  const apiKey = "99a04468da65be388e8ab2cb8526a866";
  const apiUrl = "https://api.themoviedb.org/3/genre/movie/list";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            api_key: apiKey,
          },
        });
        setGenresList(response.data.genres);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [apiKey, apiUrl]);

  return { genresList, error };
};

export default useFetchGenres;
