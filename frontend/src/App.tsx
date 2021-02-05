import React, { useState, useEffect, useDebugValue } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
import logo from './logo.svg';
import type { Movie } from './models';
import { getProfile, putMovie, getMovies, updateMovie } from './api';
import {
  AddMovie,
  BasicCard,
  Button,
  Container,
  Footer,
  SimpleSectionHeading,
  Testimonial,
  UpdateMovie,
} from './components';

interface AppProps {}

function App({}: AppProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | undefined>();

  //useEffect(() => {}, [movie])

  // function onMovieSelected(i: number) {
  //     setMovie(movies[i])
  // }

  useDebugValue(movie);
  //console.log("Index value", movie?.title )
  const updateEl = movie ? (
    <UpdateMovie movie={movie} onSubmit={updateMovie} />
  ) : null;

  return (
    <Container>
      <Testimonial
        title="Crispy Dragon"
        quote="You may delay, but time will not, and lost time is never found again."
        source="Benjamin Franklin"
      />
      <header className="bg-red-500">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <BasicCard>
          <Button onClick={() => getMovies(setMovies)}>Get Movies</Button>
          <button
            onClick={() => setMovie(undefined)}
            className="p-1 bg-yellow-600 text-capitalize"
          >
            Close edit movie
          </button>
        </BasicCard>
      </header>
      <SimpleSectionHeading heading="Add your stuff" />
      <AddMovie onSubmit={putMovie} />
      <SimpleSectionHeading heading="Movies" />
      <HorizontalLinkCard movies={movies} onMovieSelected={setMovie} />
      {updateEl}
      <Footer />
    </Container>
  );
}

export default withAuthenticator(App, true);

function HorizontalLinkCard(props: {
  movies: Movie[];
  onMovieSelected: (index: Movie) => void;
}) {
  const el = props.movies.map((movie) => (
    <div
      className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      key={movie.title}
      onClick={() => props.onMovieSelected(movie)}
    >
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="flex-1 min-w-0">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true"></span>
          <p className="text-sm font-medium text-gray-900">
            {movie.title} ({movie.info.year})
          </p>
          <p className="text-sm text-gray-500 truncate">{movie.info.plot}</p>
          <p className="text-sm text-gray-500 truncate">{movie.info.rating}</p>
        </a>
      </div>
    </div>
  ));

  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{el}</div>;
}
