import React, { useContext } from 'react';
import { AppShell, UpdateMovie } from './components';
import { MoviesDataContext } from './MoviesDataContext';
import { useNavigate, useParams } from 'react-router-dom';
import { updateMovie, UpdateMovieRequest } from './api';

export function UpdateMoviePage() {
  const { movies, setMovies } = useContext(MoviesDataContext);
  const { title } = useParams();
  const navigate = useNavigate();

  async function onSubmit(title: string, movie: UpdateMovieRequest) {
    const success = await updateMovie(title, movie);
    if (success) {
      navigate('/');
    }
    return success;
  }

  return (
    <AppShell>
      <UpdateMovie
        movie={movies.filter((m) => m.title === title)[0]}
        onSubmit={onSubmit}
      />
    </AppShell>
  );
}
