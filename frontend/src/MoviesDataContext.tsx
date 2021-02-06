import React, { createContext } from 'react';
import type { Movie } from './models';

type ContextType = {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
};

// @ts-ignore
export const MoviesDataContext = createContext<ContextType>();
