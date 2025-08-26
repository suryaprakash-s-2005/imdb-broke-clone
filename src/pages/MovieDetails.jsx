import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/api";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return null;

  return (
    <div
      className="movie-details"
      style={{
        backgroundImage: `url(${
          movie.Poster !== "N/A" ? movie.Poster : ""
        })`,
      }}
    >
      <div className="overlay">
        <div className="details-poster">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/500x750?text=No+Poster"
            }
            alt={movie.Title}
          />
        </div>
        <div className="details-info">
          <h2>
            {movie.Title} <span>({movie.Year})</span>
          </h2>
          <div className="info-tags">
            <span className="tag genre">{movie.Genre}</span>
            <span className="tag rating">⭐ {movie.imdbRating}</span>
          </div>
          <p className="plot">{movie.Plot}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
