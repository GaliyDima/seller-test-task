import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface IGenres {
  id: number;
  name: string;
}

interface ISelectGenres {
  selectedGenres: number[];
  genresList: IGenres[];
  setSelectedGenres: (event: number[]) => void;
}

const SelectGenres: React.FC<ISelectGenres> = ({
  selectedGenres,
  genresList,
  setSelectedGenres,
}) => {
  const handleGenreChange = (event: any) => {
    setSelectedGenres(event.target.value as number[]);
  };
  return (
    <FormControl sx={{ width: 200, maxWidth: 200 }}>
      <InputLabel id="genres-label">Genres</InputLabel>
      <Select
        labelId="genres-label"
        id="genres-select"
        multiple
        multiline
        value={selectedGenres}
        onChange={handleGenreChange}
        renderValue={(selected) =>
          (selected as number[])
            .map((genreId) => {
              const genre = genresList.find((genre) => genre.id === genreId);
              return genre ? genre.name : "";
            })
            .join(", ")
        }
      >
        {genresList.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectGenres;
