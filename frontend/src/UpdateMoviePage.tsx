import React, { useContext } from 'react';
import {AppShell, Button, DangerButton, UpdateMovie} from './components';
import { MoviesDataContext } from './MoviesDataContext';
import { useNavigate, useParams } from 'react-router-dom';
import {deleteMovie, updateMovie, UpdateMovieRequest} from './api';

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

  async function onDelete() {
    const success = await deleteMovie(title);
    console.log(movies)
    debugger
    if (success) {
      const filtered = movies.filter(x => x.title !== title)
      setMovies([...filtered])

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
      <div className="pt-5 flex flex-row-reverse">
        <DangerButton onClick={onDelete}>Delete Movie</DangerButton>
      </div>
    </AppShell>
  );
}
