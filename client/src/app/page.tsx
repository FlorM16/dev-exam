
import React from 'react';
import MovieSearch from './components/MovieSearch';

const HomePage = () => {
  return (
    <main className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Buscador de Películas</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Encuentra información sobre tus películas favoritas y sus personajes.
      </p>
      <MovieSearch />
    </main>
  );
};

export default HomePage;
