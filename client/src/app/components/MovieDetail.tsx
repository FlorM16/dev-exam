"use client"
import React from 'react';
import { Movie } from '../types';

interface MovieDetailProps {
    movie: Movie; 
  }

  const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
    return (
      <div className="mt-4">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Descripción:</strong> {movie.opening_crawl}</p>
        <h3 className="font-semibold">Personajes:</h3>
        <ul>
          {movie.characters.map((character, index) => (
            <li key={index}>
              {character.name} ({character.birth_year})
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default MovieDetail;
