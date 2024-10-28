"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, Character } from '../types';

interface MovieDetailProps {
    movie: Movie; 
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const [characters, setCharacters] = useState<Character[]>([]); 

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characterPromises = movie.characters.map((url: string) => axios.get(url));
        const characterResponses = await Promise.all(characterPromises);
        const characterData = characterResponses.map(response => response.data);
        setCharacters(characterData);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [movie]);

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">{movie.title}</h2>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Descripción:</strong> {movie.opening_crawl}</p>
      <h3 className="font-semibold">Personajes:</h3>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            {character.name} ({character.birth_year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetail;
