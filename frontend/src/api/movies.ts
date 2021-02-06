import type { Movie } from '../models';
import { getUserToken } from './getUserToken';

export interface GetMoviesResponse {
  items: Movie[];
}

export interface PutMovieResponse {
  item: Movie;
}

export interface MovieRequest {
  title: string;
  plot: string;
  year: number;
  rating: number;
}

export interface UpdateMovieRequest {
  year: number;
  actors: string[];
  plot: string;
}

export async function updateMovie(title: string, movie: UpdateMovieRequest) {
  const token = await getUserToken();
  const response = await fetch(
    `https://cjn5ioxpab.execute-api.us-east-1.amazonaws.com/movies/${title}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
      method: 'PATCH',
      mode: 'cors',
      credentials: 'omit',
    },
  );

  if (response.ok) {
    const data = await response.json();
    console.log(
      `Status: ${response.status}, data: ${JSON.stringify(data, null, 2)}`,
    );
  } else {
    const body = await response.text();
    console.log(
      `Failed with status: ${response.status}, body: ${JSON.stringify(
        body,
        null,
        2,
      )}`,
    );
  }
  return response.ok;
}

export async function putMovie(movie: MovieRequest) {
  const token = await getUserToken();
  const response = await fetch(
    'https://cjn5ioxpab.execute-api.us-east-1.amazonaws.com/movies',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
      method: 'PUT',
      mode: 'cors',
      credentials: 'omit',
    },
  );

  if (response.ok) {
    const data = await response.json();
    console.log(
      `Status: ${response.status}, data: ${JSON.stringify(data, null, 2)}`,
    );
  } else {
    const body = await response.text();
    console.log(
      `Failed with status: ${response.status}, body: ${JSON.stringify(
        body,
        null,
        2,
      )}`,
    );
  }
  return response.ok;
}

export async function getMovies(
  setMovies: (value: ((prevState: Movie[]) => Movie[]) | Movie[]) => void,
) {
  const token = await getUserToken();
  const response = await fetch(
    'https://cjn5ioxpab.execute-api.us-east-1.amazonaws.com/movies',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors',
      credentials: 'omit',
    },
  );

  if (response.ok) {
    const data: GetMoviesResponse = await response.json();
    setMovies(data.items);
    console.log(
      `Status: ${response.status}, data: ${JSON.stringify(data, null, 2)}`,
    );
  } else {
    const body = await response.text();
    console.log(
      `Failed with status: ${response.status}, body: ${JSON.stringify(
        body,
        null,
        2,
      )}`,
    );
  }
  return response.ok;
}