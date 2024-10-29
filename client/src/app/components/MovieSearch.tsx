"use client";
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
        // Resetea el detalle de la película si la búsqueda está vacía
        setSelectedMovie(null); 
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
    <div className="p-4 bg-gray-100 flex flex-col items-center">
      <input
        type="text"
        placeholder="Buscar películas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 text-gray-800 placeholder-gray-500 w-full max-w-md"
      />
      {loading && <p className="text-gray-800">Cargando...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.episode_id}
            onClick={() => handleMovieSelect(movie.episode_id)}
            className="cursor-pointer p-4 border rounded-lg shadow-md bg-white hover:bg-gray-200 transition duration-200 max-w-md" 
          >
            <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
            <p className="text-sm text-gray-600">Director: {movie.director}</p>
          </div>
        ))}
      </div>
      {selectedMovie && searchTerm && <MovieDetail movie={selectedMovie} />}
    </div>
  );
};

export default MovieSearch;
