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
    <div className="mt-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>
      <p className="mt-2 text-gray-700"><strong>Director:</strong> {movie.director}</p>
      <p className="mt-2 text-gray-700"><strong>Descripción:</strong> {movie.opening_crawl}</p>
      <h3 className="font-semibold mt-4 text-gray-800">Personajes:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {characters.map((character, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h4 className="text-lg font-semibold text-gray-800">{character.name}</h4>
            <p className="text-gray-600"><strong>Año de nacimiento:</strong> {character.birth_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
