import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface IMovieCard {
  title: string;
  poster: string;
  rating: number;
  genres: string[];
  releaseYear: number;
  overview: string;
}

const MovieCard: React.FC<IMovieCard> = ({
  title,
  poster,
  rating,
  genres,
  releaseYear,
  overview,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "1000px",
        mb: 15,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2">Rating: {rating}</Typography>
          <Typography variant="body2">Genres: {genres.join(", ")}</Typography>
          <Typography variant="body2">Release Year: {releaseYear}</Typography>
          <Typography variant="body2" sx={{ mt: 10 }}>
            {overview}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "50%" }}
        image={`https://image.tmdb.org/t/p/w500/${poster}`}
        alt={title}
      />
    </Card>
  );
};

export default MovieCard;
