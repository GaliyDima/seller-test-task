import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface ISortBy {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const SortBy: React.FC<ISortBy> = ({ sortBy, setSortBy }) => {
  const handleSortChange = (event: any) => {
    const newSortBy = event.target.value as string;
    setSortBy(newSortBy);
    sessionStorage.setItem("sortBy", newSortBy);
  };

  return (
    <FormControl>
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select
        labelId="sort-label"
        id="sort-select"
        value={sortBy}
        onChange={handleSortChange}
      >
        <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
        <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
        <MenuItem value="vote_average.desc">Rating Descending</MenuItem>
        <MenuItem value="vote_average.asc">Rating Ascending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBy;
