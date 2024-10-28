"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetail from './MovieDetail';
import { Movie } from '../types'; 

const MovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        fetchMovies();
      } else {
        setMovies([]);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:3001/api/v1/movies?search=${searchTerm}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSelect = (movieId: number) => {
    const movie = movies.find((m) => m.episode_id === movieId);
    setSelectedMovie(movie || null); 
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar películas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2"
      />
      {loading && <p>Cargando...</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.episode_id} onClick={() => handleMovieSelect(movie.episode_id)} className="cursor-pointer">
            {movie.title} - {movie.director}
          </li>
        ))}
      </ul>
      {selectedMovie && <MovieDetail movie={selectedMovie} />}
    </div>
  );
};

export default MovieSearch;
