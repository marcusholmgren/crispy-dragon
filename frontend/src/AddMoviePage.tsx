import { useNavigate } from 'react-router-dom';
import { MovieRequest, addMovie } from './api';
import { AddMovie, AppShell, SimpleSectionHeading } from './components';
import React, { useContext } from 'react';
import { MoviesDataContext } from './MoviesDataContext';

export function AddMoviePage() {
  const { movies, setMovies } = useContext(MoviesDataContext);
  const navigate = useNavigate();

  async function onSubmit(movie: MovieRequest) {
    const newMovie = await addMovie(movie);

    if (newMovie) {
      console.log('New movie: ', JSON.stringify(newMovie, null, 2));
      setMovies([...movies, newMovie]);
      navigate('/');
      return true;
    }

    return false;
  }

  return (
    <AppShell activeTab="add">
      <SimpleSectionHeading heading="Add new movie to your collection" />
      <AddMovie onSubmit={onSubmit} />
    </AppShell>
  );
}
