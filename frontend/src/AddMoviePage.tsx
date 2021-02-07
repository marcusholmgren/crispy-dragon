import { useNavigate } from 'react-router-dom';
import { MovieRequest, addMovie } from './api';
import { AddMovie, AppShell, SimpleSectionHeading } from './components';
import React from 'react';

export function AddMoviePage() {
  const navigate = useNavigate();

  async function onSubmit(movie: MovieRequest) {
    const success = await addMovie(movie);

    if (success) {
      navigate('/');
    }

    return success;
  }

  return (
    <AppShell activeTab="add">
      <SimpleSectionHeading heading="Add new movie to your collection" />
      <AddMovie onSubmit={onSubmit} />
    </AppShell>
  );
}
