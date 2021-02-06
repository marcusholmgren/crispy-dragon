import React, { useEffect, useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
import { Route, Routes } from 'react-router-dom';
import { AddMoviePage } from './AddMoviePage';
import { HomePage } from './HomePage';
import { UpdateMoviePage } from './UpdateMoviePage';
import { MoviesDataContext } from './MoviesDataContext';
import { getMovies } from './api';
import type { Movie } from './models';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies(setMovies).catch((e) => console.error(e));
  }, []);

  return (
    <MoviesDataContext.Provider value={{ movies, setMovies }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="add" element={<AddMoviePage />} />
        <Route path="update/:title" element={<UpdateMoviePage />} />
      </Routes>
    </MoviesDataContext.Provider>
  );
}

export default withAuthenticator(App, true);
