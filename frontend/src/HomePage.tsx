import React, { useContext } from 'react';
import { MoviesDataContext } from './MoviesDataContext';
import type { Movie } from './models';
import {
  AppShell,
  BasicCard,
  Button,
  SimpleSectionHeading,
  Testimonial,
} from './components';
import { getMovies } from './api';
import logo from './logo.svg';
import { NavLink } from 'react-router-dom';

export function HomePage() {
  const { movies, setMovies } = useContext(MoviesDataContext);

  return (
    <AppShell activeTab="home">
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
          <Button onClick={() => getMovies(setMovies)}>
            Refresh Movies List
          </Button>
        </BasicCard>
      </header>
      <SimpleSectionHeading heading="Movies" />
      <HorizontalLinkCard moviesData={movies} />
    </AppShell>
  );
}

function HorizontalLinkCard(props: { moviesData: Movie[] | undefined }) {
  const el = props.moviesData
    ? props.moviesData.map((movie) => (
        <NavLink to={`update/${movie.title}`} key={movie.title}>
          <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={movie.info.movie ? movie.info.movie : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                alt=""
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true"></span>
                <p className="text-sm font-medium text-gray-900">
                  {movie.title} ({movie.info.year})
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {movie.info.plot}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {movie.info.rating}
                </p>
              </div>
            </div>
          </div>
        </NavLink>
      ))
    : null;

  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{el}</div>;
}
