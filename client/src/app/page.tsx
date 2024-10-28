
import React from 'react';
import MovieSearch from './components/MovieSearch';

const HomePage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Buscador de Películas</h1>
      <MovieSearch />
    </main>
  );
};

export default HomePage;
