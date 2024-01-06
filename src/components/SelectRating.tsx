import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface ISelectRating {
  minRating: number;
  setMinRating: (value: number) => void;
}

const SelectRating: React.FC<ISelectRating> = ({ minRating, setMinRating }) => {
  return (
    <TextField
      id="standard-basic"
      label="Minimum rating"
      type="number"
      variant="standard"
      sx={{ width: 200, mb: 10 }}
      inputProps={{ min: "0", max: "10" }}
      value={minRating}
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 10) {
          setMinRating(value);
        }
      }}
    />
  );
};

export default SelectRating;
