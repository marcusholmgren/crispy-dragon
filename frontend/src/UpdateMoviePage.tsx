import React, { useContext } from 'react';
import {AppShell, Button, DangerButton, MovieAttachment, UpdateMovie} from './components';
import { MoviesDataContext } from './MoviesDataContext';
import { useNavigate, useParams } from 'react-router-dom';
import {deleteMovie, getMovies, getUploadUrl, updateMovie, UpdateMovieRequest, uploadMovieAttachment} from './api';

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
    if (success) {
      const filtered = movies.filter(x => x.title !== title)
      setMovies([...filtered])
      navigate('/');
    }
    return success;
  }


  async function uploadAttachment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.currentTarget) {
      const x = new FormData(event.currentTarget)
      const url = await getUploadUrl(title)
      const file = x.get('file') as File;
      const success = await uploadMovieAttachment(file, url)
      if (success) {
        navigate('/')
      }
    }
  }

  const movie = movies.filter((m) => m.title === title)[0]

  return (
    <AppShell>
      <UpdateMovie
        movie={movie}
        onSubmit={onSubmit}
      />
      <div className="pt-5">
        <MovieAttachment movie={movie} onSubmit={uploadAttachment} />
      </div>
      <div className="pt-5 flex flex-row-reverse">
        <DangerButton onClick={onDelete}>Delete Movie</DangerButton>
      </div>
    </AppShell>
  );
}


